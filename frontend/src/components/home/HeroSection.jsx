'use client'

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Background from './background';

export default function HeroSection() {
    const { scrollY } = useScroll();
    const containerRef = useRef(null);
    const videoRef = useRef(null);

    // Track scroll specifically for the Hero section
    // The container is 250vh high. Let's start the transition a bit after we start scrolling.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Scrub video based on scroll progress
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
            // Scrub from 0 to full duration
            videoRef.current.currentTime = latest * videoRef.current.duration;
        }
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Animations based on container scroll progress
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.9], [0, 0, 1]); // Fades in smoothly towards the end
    const textY = useTransform(scrollYProgress, [0.2, 0.5, 0.9], [150, 50, 0]); // Slides up smoothly
    const overlayOpacity = useTransform(scrollYProgress, [0.1, 0.9], [0, 0.85]); // Dim the video to reveal text
    const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]); // Fade out "scroll" indicator early

    return (
        <section ref={containerRef} className="relative h-[250vh] w-full bg-ocean-deep">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Background Image/Video Container */}
                <div className="absolute inset-0 w-full h-full z-0">
                    {/* Dynamic overlay to ensure text is readable when it appears */}
                    <motion.div
                        style={{ opacity: overlayOpacity }}
                        className="absolute inset-0 bg-sky-light z-10"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-sky-light z-10 pointer-events-none opacity-50"></div>

                    <Background />
                </div>

                {/* Hero Content */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="relative z-20 text-center px-4 max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-ocean-deep tracking-tight mb-6">
                        Fresh From Ocean to <br className="hidden md:block" />
                        <span className="text-oceanic-blue italic">Your Doorstep</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-ocean-deep/90 mb-10 max-w-2xl mx-auto font-medium">
                        Premium, wild-caught and sustainably sourced seafood. Delivered exactly how you want it, exactly when you need it.
                    </p>

                    <div>
                        <Link
                            href="/products"
                            className="inline-block bg-ocean-deep hover:bg-oceanic-blue text-sky-light font-bold py-4 px-10 rounded-md uppercase tracking-widest transition-all hover:shadow-[0_8px_20px_rgba(14,165,233,0.3)] hover:-translate-y-1"
                        >
                            Explore Fresh Catch
                        </Link>
                    </div>
                </motion.div>

                {/* Scroll indicator down arrow */}
                <motion.div
                    style={{ opacity: indicatorOpacity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
                >
                    <span className="text-xs uppercase tracking-widest text-sky-light mb-2 font-bold drop-shadow-md">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-[2px] h-12 bg-linear-to-b from-sky-light to-transparent drop-shadow-md"
                    />
                </motion.div>
            </div>
        </section>
    );
}
