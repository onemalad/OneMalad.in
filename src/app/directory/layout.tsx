import type { Metadata } from 'next';
import './directory.css';

export const metadata: Metadata = {
  title: 'Directory — Local businesses of Malad',
  description: 'Discover the best local businesses in Malad — food, cafes, salons, gyms and more. Scroll, save, message on WhatsApp.',
};

export default function DirectoryLayout({ children }: { children: React.ReactNode }) {
  return <div className="directory-root">{children}</div>;
}
