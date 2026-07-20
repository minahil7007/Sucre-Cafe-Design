import { Link } from 'wouter';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-3xl font-bold tracking-widest uppercase block mb-6">
              SUCR<span className="text-primary">É</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Your local haven for crafted coffee, handmade desserts, and unforgettable moments. Experience the perfect blend of Parisian elegance and Middle Eastern warmth.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="WhatsApp">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider">About Us</Link></li>
              <li><Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider">Our Menu</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider">Events</Link></li>
              <li><Link href="/offers" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider">Offers</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Al Olaya District,<br/>Riyadh, Saudi Arabia</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@sucrecafe.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">Subscribe to receive exclusive offers and event invites.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors w-full rounded-sm"
              />
              <button 
                type="submit"
                className="bg-primary text-primary-foreground font-medium uppercase tracking-widest text-sm py-2 px-4 hover:bg-primary/90 transition-colors w-full rounded-sm"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} SUCRÉ Café. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
