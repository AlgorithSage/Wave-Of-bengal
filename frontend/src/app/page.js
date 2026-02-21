'use client'

import { useRouter } from 'next/navigation';
import LandingPage from '@/components/home/LandingPage';

export default function Splash() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/home');
  };

  return <LandingPage onEnter={handleEnter} />;
}
