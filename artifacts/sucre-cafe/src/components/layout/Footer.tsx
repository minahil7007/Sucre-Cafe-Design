import { Link } from 'wouter';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-[#0D0A1A] text-foreground border-t border-primary/20 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-4xl font-bold tracking-[0.2em] uppercase block mb-6 text-primary drop-shadow-[0_0_8px_rgba(245,166,35,0.4)]">
              SUCR<span className="text-accent">É</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">
              Your local haven for crafted coffee, handmade desserts, and unforgettable moments. Experience the perfect blend of Parisian elegance and Middle Eastern warmth.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-card rounded-full hover:bg-accent hover:text-white hover:shadow-[0_0_15px_rgba(232,67,106,0.5)] transition-all text-primary" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-card rounded-full hover:bg-accent hover:text-white hover:shadow-[0_0_15px_rgba(232,67,106,0.5)] transition-all text-primary" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-card rounded-full hover:bg-accent hover:text-white hover:shadow-[0_0_15px_rgba(232,67,106,0.5)] transition-all text-primary" aria-label="WhatsApp">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-2xl font-bold mb-6 text-foreground tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-accent transition-colors text-sm uppercase tracking-widest font-semibold">About Us</Link></li>
              <li><Link href="/menu" className="text-muted-foreground hover:text-accent transition-colors text-sm uppercase tracking-widest font-semibold">Our Menu</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-accent transition-colors text-sm uppercase tracking-widest font-semibold">Events</Link></li>
              <li><Link href="/offers" className="text-muted-foreground hover:text-accent transition-colors text-sm uppercase tracking-widest font-semibold">Offers</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-accent transition-colors text-sm uppercase tracking-widest font-semibold">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-2xl font-bold mb-6 text-foreground tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm font-medium">
                <MapPin className="w-5 h-5 text-primary shrink-0 drop-shadow-[0_0_5px_rgba(245,166,35,0.5)]" />
                <span>Al Olaya District,<br/>Riyadh, Saudi Arabia</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm font-medium">
                <Phone className="w-5 h-5 text-primary shrink-0 drop-shadow-[0_0_5px_rgba(245,166,35,0.5)]" />
                <span>+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm font-medium">
                <Mail className="w-5 h-5 text-primary shrink-0 drop-shadow-[0_0_5px_rgba(245,166,35,0.5)]" />
                <span>hello@sucrecafe.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-2xl font-bold mb-6 text-foreground tracking-wider">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4 font-medium">Subscribe to receive exclusive offers and event invites.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-card border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors w-full rounded-sm text-foreground"
              />
              <button 
                type="submit"
                className="bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] text-sm py-3 px-4 hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(232,67,106,0.5)] transition-all w-full rounded-sm"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          <p>&copy; {new Date().getFullYear()} SUCRÉ Café. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
