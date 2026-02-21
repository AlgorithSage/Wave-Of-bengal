'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

export default function HeroSection() {
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Smooth cinematic effects
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
    const textY = useTransform(scrollYProgress, [0, 0.5], [80, 0])
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8])

    return (
        <section ref={containerRef} className="relative h-[200vh] w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Background Video */}
                <motion.video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ scale, opacity }}
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/ocean.mp4" type="video/mp4" />
                </motion.video>

                {/* Premium gradient overlay */}
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 z-10"
                />

                {/* Hero Content */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="relative z-20 text-center px-6 max-w-5xl"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-tight">
                        Fresh From Ocean to <br />
                        <span className="text-sky-400 italic">
                            Your Doorstep
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Premium, wild-caught and sustainably sourced seafood.
                        Delivered exactly how you want it, exactly when you need it.
                    </p>

                    <Link
                        href="/products"
                        className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-4 px-10 rounded-xl uppercase tracking-wider transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                        Explore Fresh Catch
                    </Link>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <div className="w-[2px] h-12 bg-white/60" />
                </motion.div>

            </div>
        </section>
    )
}