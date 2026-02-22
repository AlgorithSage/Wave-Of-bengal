'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef, useEffect } from 'react'

export default function HeroSection() {
    const containerRef = useRef(null)
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const durationRef = useRef(0)
    const seekingRef = useRef(false)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Text fades out together with video — both start at scroll 0
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.75])

    // Draw current video frame to canvas
    const drawFrame = () => {
        const video = videoRef.current
        const canvas = canvasRef.current
        if (!video || !canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    }

    // Setup video and canvas
    useEffect(() => {
        const video = videoRef.current
        const canvas = canvasRef.current
        if (!video || !canvas) return

        // Match canvas to viewport
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            drawFrame()
        }

        const handleLoaded = () => {
            durationRef.current = video.duration
            video.currentTime = video.duration
            updateCanvasSize()
        }

        const handleSeeked = () => {
            drawFrame()
            seekingRef.current = false
        }

        if (video.readyState >= 2) {
            handleLoaded()
        } else {
            video.addEventListener('loadeddata', handleLoaded)
        }

        video.addEventListener('seeked', handleSeeked)
        window.addEventListener('resize', updateCanvasSize)

        return () => {
            video.removeEventListener('loadeddata', handleLoaded)
            video.removeEventListener('seeked', handleSeeked)
            window.removeEventListener('resize', updateCanvasSize)
        }
    }, [])

    // Scroll-driven video seeking — synced with text fade (0% → 50% scroll)
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (value) => {
            const video = videoRef.current
            const duration = durationRef.current
            if (!video || !duration) return

            // Video scrubs across FULL scroll range — responds immediately
            const targetTime = duration * (1 - value)

            if (video.fastSeek) {
                video.fastSeek(targetTime)
            } else {
                video.currentTime = targetTime
            }
        })

        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <section ref={containerRef} className="relative h-[300vh] w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Hidden video element for seeking */}
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    className="hidden"
                >
                    <source src="/videos/hero_scrub.mp4" type="video/mp4" />
                </video>

                {/* Canvas renders video frames — much faster than video element */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    style={{ transform: 'translateZ(0)' }}
                />

                {/* Dark Overlay — intensifies on scroll */}
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/60 z-10"
                />

                {/* Hero text — visible at start, fades out on scroll */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="relative z-20 text-center px-6 max-w-5xl"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-normal text-white mb-6 leading-tight drop-shadow-lg">
                        Fresh From Ocean to <br />
                        <span className="text-sky-400">Your Doorstep</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium drop-shadow-md">
                        Premium, wild-caught and sustainably sourced seafood.
                        Delivered exactly how you want it, exactly when you need it.
                    </p>
                    <Link
                        href="/products"
                        className="inline-block glass-card py-4 px-12 rounded-[50px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 font-bold text-white hover:text-white/90 hover:shadow-[0_8px_30px_rgba(14,165,233,0.3)]"
                    >
                        Explore Fresh Catch
                    </Link>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
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