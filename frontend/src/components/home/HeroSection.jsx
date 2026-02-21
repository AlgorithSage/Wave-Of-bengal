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

    // Text visible at start, fades out on scroll
    const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
    const textY = useTransform(scrollYProgress, [0, 0.4], [0, -60])
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.7])

    return (
        <section ref={containerRef} className="relative h-[200vh] w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Background Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    style={{ transform: 'translateZ(0)' }}
                >
                    <source src="/videos/underwater-ocean.mp4" type="video/mp4" />
                </video>

                {/* Overlay */}
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/60 z-10"
                />

                {/* Hero text — visible at start, fades out on scroll */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="relative z-20 text-center px-6 max-w-5xl"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                        Fresh From Ocean to <br />
                        <span className="text-sky-400 italic">Your Doorstep</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium drop-shadow-md">
                        Premium, wild-caught and sustainably sourced seafood.
                        Delivered exactly how you want it, exactly when you need it.
                    </p>
                    <Link
                        href="/products"
                        className="inline-block bg-white/10 backdrop-blur-md border border-white/25 hover:bg-white/20 hover:border-white/40 text-white font-bold py-4 px-12 rounded-full uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(14,165,233,0.25)]"
                    >
                        Explore Fresh Catch
                    </Link>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
                >
                    <span className="text-xs uppercase tracking-widest text-white/70 mb-2 font-bold drop-shadow-md">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-[2px] h-12 bg-linear-to-b from-white/60 to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    )
}