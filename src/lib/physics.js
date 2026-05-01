export class PhysicsEngine {
    constructor(options = {}) {
        this.entities = new Map();
        this.friction = options.friction || 0.88;
        this.repulsionStrength = options.repulsionStrength || 80000;
        this.attractionStrength = options.attractionStrength || 8.0;
        this.isRunning = false;
        this.rafId = null;
        this.mousePos = { x: -9999, y: -9999 };
        this.isMouseDown = false;
        this.mouseRadius = options.mouseRadius || 180;
        this.mouseRepulsion = options.mouseRepulsion || 150000;
        this.hoveredEntityId = null;
    }

    addEntity(id, config) {
        this.entities.set(id, {
            id,
            x: config.x || 0,
            y: config.y || 0,
            vx: 0,
            vy: 0,
            originX: config.x || 0,
            originY: config.y || 0,
            mass: config.mass || 1,
            radius: config.radius || 60,
            onUpdate: config.onUpdate || (() => {})
        });
    }

    removeEntity(id) {
        this.entities.delete(id);
    }

    updateMouse(x, y) {
        this.mousePos.x = x;
        this.mousePos.y = y;
    }

    setMouseDown(isDown) {
        this.isMouseDown = isDown;
    }

    setHoveredEntity(id) {
        this.hoveredEntityId = id;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        let lastTime = performance.now();
        
        const loop = (time) => {
            if (!this.isRunning) return;
            // Cap delta time to prevent physics explosions on lag spikes
            const dt = Math.min((time - lastTime) / 1000, 0.05); 
            lastTime = time;
            this.tick(dt);
            this.rafId = requestAnimationFrame(loop);
        };
        this.rafId = requestAnimationFrame(loop);
    }

    stop() {
        this.isRunning = false;
        if (this.rafId) cancelAnimationFrame(this.rafId);
    }

    blastFromCenter(strength) {
        const entities = Array.from(this.entities.values());
        if (!entities.length) return;
        
        let cx = 0, cy = 0;
        entities.forEach(e => { cx += e.x; cy += e.y; });
        cx /= entities.length;
        cy /= entities.length;

        entities.forEach(e => {
            const dx = e.x - cx;
            const dy = e.y - cy;
            // Add a little randomness to avoid perfect symmetry
            const dist = Math.sqrt(dx*dx + dy*dy) || 1;
            e.vx += ((dx / dist) + (Math.random() - 0.5)) * strength;
            e.vy += ((dy / dist) + (Math.random() - 0.5)) * strength;
        });
    }

    applyGlobalForce(fx, fy) {
        for (let e of this.entities.values()) {
            e.vx += fx;
            e.vy += fy;
        }
    }

    tick(dt) {
        const entities = Array.from(this.entities.values());

        for (let i = 0; i < entities.length; i++) {
            const e = entities[i];
            let fx = 0;
            let fy = 0;

            // 1. Attraction toward origin (spring back to grid layout)
            const dxOrigin = e.originX - e.x;
            const dyOrigin = e.originY - e.y;
            fx += dxOrigin * this.attractionStrength * e.mass;
            fy += dyOrigin * this.attractionStrength * e.mass;

            // 2. Repulsion from other entities (collision avoidance / clustering)
            for (let j = 0; j < entities.length; j++) {
                if (i === j) continue;
                const other = entities[j];
                const dx = e.x - other.x;
                const dy = e.y - other.y;
                const distSq = dx * dx + dy * dy;
                
                // Expand collision radius dynamically if the entity is being hovered
                const eRadius = e.id === this.hoveredEntityId ? e.radius * 1.8 : e.radius;
                const oRadius = other.id === this.hoveredEntityId ? other.radius * 1.8 : other.radius;
                const minDist = eRadius + oRadius;
                
                if (distSq > 0 && distSq < minDist * minDist) {
                    const dist = Math.sqrt(distSq);
                    const overlap = minDist - dist;
                    // Stronger repulsion the closer they get
                    const force = (this.repulsionStrength * overlap) / (distSq * e.mass);
                    fx += dx * force;
                    fy += dy * force;
                }
            }

            // 3. Interactive Cursor Force
            if (this.mousePos.x !== -9999) {
                const mx = e.x - this.mousePos.x;
                const my = e.y - this.mousePos.y;
                const mDistSq = mx * mx + my * my;
                
                if (mDistSq < this.mouseRadius * this.mouseRadius) {
                    const mDist = Math.sqrt(mDistSq);
                    
                    // If mouse is down, pull them in (magnetic). If up, push away (fluid scatter).
                    const force = this.isMouseDown 
                        ? (-this.mouseRepulsion * 0.8) / (mDist * e.mass) 
                        : (this.mouseRepulsion) / (mDistSq * e.mass); 
                    
                    if (mDist > 0) {
                        fx += (mx / mDist) * force;
                        fy += (my / mDist) * force;
                    }
                }
            }

            // Newton's Second Law: a = F / m
            const ax = fx / e.mass;
            const ay = fy / e.mass;

            // Integrate (Euler)
            e.vx += ax * dt;
            e.vy += ay * dt;
            
            // Apply friction/damping
            e.vx *= this.friction;
            e.vy *= this.friction;
            
            // Update position
            e.x += e.vx * dt;
            e.y += e.vy * dt;

            // Sync with React UI via callback
            e.onUpdate(e.x, e.y);
        }
    }
}
