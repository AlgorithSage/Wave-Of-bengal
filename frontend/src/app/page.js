import HeroSection from '@/components/home/HeroSection';
import TrustBadges from '@/components/home/TrustBadges';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Testimonials from '@/components/home/Testimonials';
import SustainabilityBanner from '@/components/home/SustainabilityBanner';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustBadges />
      <FeaturedProducts />

      {/* Our Story Teaser Section */}
      <section className="py-24 bg-ocean-dark relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-wob-gold/5 via-transparent to-transparent opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-gold mb-8 italic">
            "A legacy born from the deep sea"
          </h2>
          <p className="text-lg md:text-xl text-text-light/80 font-light leading-relaxed mb-10 max-w-3xl mx-auto">
            For three generations, our family has braved the waters of the Bay of Bengal.
            What started as a single wooden trawler has evolved into a promise—to bring you
            only the finest, cleanest, and most sustainable catch the ocean has to offer.
          </p>
          <Link
            href="/our-story"
            className="inline-block border border-gold text-gold hover:bg-gold hover:text-ocean-dark font-medium py-3 px-8 rounded tracking-widest uppercase transition-all duration-300"
          >
            Read Our Journey
          </Link>
        </div>
      </section>

      <Testimonials />
      <SustainabilityBanner />
    </div>
  );
}
