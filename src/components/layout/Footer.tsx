import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaXTwitter, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="border-t border-white/5" style={{ background: '#070708', color: 'rgba(255,255,255,0.6)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
                style={{ background: 'linear-gradient(135deg, #ff6b35, #ff8e53)', boxShadow: '0 8px 24px -8px rgba(255,107,53,0.5)' }}
              >
                1
              </div>
              <div>
                <span className="text-lg font-black text-white">One<span className="text-orange-400">Malad</span></span>
                <span className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/40">Local Directory · Community</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Discover Malad&apos;s best local businesses — food, cafes, salons, gyms, and services.
              Born from community work, built for your neighbourhood.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaXTwitter, href: 'https://x.com/onemalad' },
                { icon: FaInstagram, href: 'https://instagram.com/onemalad' },
                { icon: FaFacebookF, href: 'https://facebook.com/onemalad' },
                { icon: FaYoutube, href: 'https://youtube.com/@onemalad' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Directory */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Directory</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Discover', href: '/directory' },
                { label: 'List Your Business', href: '/list-business' },
                { label: 'Sign Up', href: '/directory/signup' },
                { label: 'Sign In', href: '/directory/login' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Community</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Work', href: '/our-work' },
                { label: 'Wards', href: '/wards' },
                { label: 'Events', href: '/events' },
                { label: 'Helplines', href: '/helplines' },
                { label: 'Blood Donors', href: '/blood-donors' },
                { label: 'Volunteer', href: '/volunteer' },
                { label: 'Gallery', href: '/gallery' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <FiMapPin className="text-base mt-0.5 flex-shrink-0 text-orange-400" />
                Malad West, Mumbai — 400064, Maharashtra
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <FiMail className="text-base flex-shrink-0 text-orange-400" />
                <a href="mailto:onemaladconnect@gmail.com" className="hover:text-white">onemaladconnect@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <FiPhone className="text-base flex-shrink-0 text-orange-400" />
                <a href="tel:+919820455678" className="hover:text-white">+91 98204 55678</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-6 text-center text-xs text-white/40">
          <p>© {new Date().getFullYear()} OneMalad · Built in Mumbai. Made with ❤️ for Malad.</p>
        </div>
      </div>
    </footer>
  );
}
