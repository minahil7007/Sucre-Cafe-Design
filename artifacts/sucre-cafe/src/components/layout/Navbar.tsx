import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useIsMounted } from '@/hooks/use-is-mounted';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Menu', path: '/menu' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Events', path: '/events' },
  { name: 'Offers', path: '/offers' },
  { name: 'Locations', path: '/locations' },
  { name: 'Contact', path: '/contact' }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  const isHome = location === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navBg = isHome 
    ? (isScrolled ? 'bg-[#0D0A1A]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-primary/20' : 'bg-transparent')
    : 'bg-[#0D0A1A]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-primary/20';

  const textColor = isHome && !isScrolled && !mobileMenuOpen
    ? 'text-white'
    : 'text-foreground';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className={`font-serif text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase text-primary drop-shadow-[0_0_10px_rgba(245,166,35,0.5)]`}>
            SUCR<span className="text-accent">É</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path}
                    className={`text-sm uppercase tracking-wider font-semibold transition-colors hover:text-accent hover:drop-shadow-[0_0_8px_rgba(232,67,106,0.6)] ${location === link.path ? 'text-accent' : textColor}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-full hover:bg-accent/20 transition-colors ${textColor}`}
              aria-label="Toggle theme"
            >
              {isMounted && (theme === 'dark' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />)}
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-full hover:bg-accent/20 transition-colors ${textColor}`}
              aria-label="Toggle theme"
            >
              {isMounted && (theme === 'dark' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />)}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 ${textColor} hover:text-accent`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-[#0D0A1A] border-b border-primary/20 shadow-2xl py-6 px-4 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path}
                    className={`block text-xl font-serif font-bold uppercase tracking-[0.2em] ${location === link.path ? 'text-accent drop-shadow-[0_0_8px_rgba(232,67,106,0.6)]' : 'text-foreground'} hover:text-primary transition-colors`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
