import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import Magnetic from '../ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const services = ["Web Design", "Development", "SEO", "Branding"];

const Contact = () => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const [selectedService, setSelectedService] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".contact-reveal", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            // Reset form after delay
            setTimeout(() => {
                setIsSuccess(false);
                if (formRef.current) formRef.current.reset();
                setSelectedService(null);
            }, 3000);
        }, 2000);
    };

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 bg-[#FAFAF9] text-neutral-900 overflow-hidden relative z-20" id="contact-section">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Left Side: Copy */}
                <div className="flex flex-col justify-between h-full space-y-12">
                    <div className="space-y-8">
                        <span className="contact-reveal inline-block px-3 py-1 rounded-full border border-neutral-300 text-xs font-mono uppercase tracking-widest text-neutral-500">
                            Get in Touch
                        </span>
                        <h2 className="contact-reveal text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                            LET'S WORK <br /> <span className="text-neutral-300">TOGETHER.</span>
                        </h2>
                        <p className="contact-reveal text-xl md:text-2xl max-w-md text-neutral-600 font-light">
                            Have a project in mind? We'd love to hear about it. Tell us your story.
                        </p>
                    </div>

                    <div className="contact-reveal hidden lg:block space-y-4">
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email</p>
                            <a href="mailto:jayavel1520@gmail.com" className="text-xl font-medium underline decoration-1 underline-offset-4 hover:decoration-2 transition-all">jayavel1520@gmail.com</a>
                        </div>
                        <div className="space-y-1 pt-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Socials</p>
                            <div className="flex gap-4 text-neutral-600">
                                <a href="#" className="hover:text-black transition-colors">Instagram</a>
                                <a href="#" className="hover:text-black transition-colors">Twitter</a>
                                <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="contact-reveal w-full bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-neutral-100">
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-neutral-500 uppercase tracking-wide">Name</label>
                                <Input placeholder="John Doe" className="bg-neutral-50 border-neutral-200 h-14 rounded-xl px-4 focus-visible:ring-1 focus-visible:ring-neutral-900 transition-all text-lg text-white" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-neutral-500 uppercase tracking-wide">Email</label>
                                <Input type="email" placeholder="john@example.com" className="bg-neutral-50 border-neutral-200 h-14 rounded-xl px-4 focus-visible:ring-1 focus-visible:ring-neutral-900 transition-all text-lg text-white" required />
                            </div>
                        </div>

                        {/* Services */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium ml-1 text-neutral-500 uppercase tracking-wide">I'm interested in...</label>
                            <div className="flex flex-wrap gap-3">
                                {services.map((service, index) => (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() => setSelectedService(service)}
                                        className={`px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300 ${selectedService === service
                                            ? "bg-neutral-900 text-white border-neutral-900"
                                            : "bg-transparent border-neutral-200 hover:border-neutral-900 text-neutral-600"
                                            }`}
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium my-2 text-neutral-500 uppercase tracking-wide ">Message</label>
                            <Textarea placeholder="Tell us about your project..." className="bg-neutral-50 border-neutral-200 text-white rounded-xl px-4 py-4 focus-visible:ring-1 focus-visible:ring-neutral-900 min-h-[160px] resize-none text-lg placeholder:text-neutral-400" required />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Magnetic>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || isSuccess}
                                    className="w-full h-16 rounded-full text-lg bg-teal-600 font-bold  text-white  transition-all group overflow-hidden relative shadow-lg hover:shadow-xl"
                                >
                                    <span className={`flex items-center gap-3 relative z-10 transition-transform duration-500 ${isSubmitting || isSuccess ? 'translate-y-[-200%]' : 'translate-y-0'}`}>
                                        Send Message <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>

                                    {/* Loading State */}
                                    <span className={`absolute flex items-center gap-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ${isSubmitting ? 'translate-y-0' : 'translate-y-[200%]'}`}>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </span>

                                    {/* Success State */}
                                    <span className={`absolute flex items-center gap-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ${isSuccess ? 'translate-y-0' : 'translate-y-[200%]'}`}>
                                        Message Sent <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    </span>
                                </Button>
                            </Magnetic>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
