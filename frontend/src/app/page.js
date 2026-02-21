'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import TrustBadges from '@/components/home/TrustBadges';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Testimonials from '@/components/home/Testimonials';
import SustainabilityBanner from '@/components/home/SustainabilityBanner';
import LandingPage from '@/components/home/LandingPage';
import Link from 'next/link';

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-100"
          >
            <LandingPage onEnter={() => setEntered(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex flex-col min-h-screen"
      >
        <HeroSection />
        <TrustBadges />
        <FeaturedProducts />

        {/* Our Story Teaser Section */}
        <section className="py-24 bg-sky-light relative z-20 overflow-hidden border-y border-oceanic-blue/10">
          <div className="absolute inset-0 bg-linear-to-br from-oceanic-blue/5 via-transparent to-transparent opacity-50"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-ocean-deep mb-8 italic">
              "A legacy born from the deep sea"
            </h2>
            <p className="text-xl md:text-2xl text-ocean-muted font-medium leading-relaxed mb-10 max-w-3xl mx-auto">
              For three generations, our family has braved the waters of the Bay of Bengal.
              What started as a single wooden trawler has evolved into a promise—to bring you
              only the finest, cleanest, and most sustainable catch the ocean has to offer.
            </p>
            <Link
              href="/our-story"
              className="inline-block border-2 border-oceanic-blue text-oceanic-blue hover:bg-oceanic-blue hover:text-sky-light font-bold py-3 px-8 rounded-md tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Read Our Journey
            </Link>
          </div>
        </section>

        <Testimonials />
        <SustainabilityBanner />
      </motion.div>
    </>
  );
}
