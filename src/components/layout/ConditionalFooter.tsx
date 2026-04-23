'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === '/directory' || pathname === '/' || pathname === '/list-business') return null;
  return <Footer />;
}

