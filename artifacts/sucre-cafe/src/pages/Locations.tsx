import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export default function Locations() {
  return (
    <PageLayout>
      <SEO title="Locations" description="Find SUCRÉ café locations, opening hours, and directions." />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 font-bold tracking-wide text-gradient-amber-rose drop-shadow-[0_0_15px_rgba(245,166,35,0.3)]">
              Our Locations
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Visit us and step into a sanctuary for the senses.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-0 items-stretch border border-primary/20 bg-card shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            
            {/* Info Panel */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-between relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold mb-4 block drop-shadow-[0_0_5px_rgba(232,67,106,0.5)]">Flagship Store</span>
                <h2 className="font-serif text-5xl mb-8 font-bold text-foreground">SUCRÉ Olaya</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary shrink-0 mt-1 drop-shadow-[0_0_5px_rgba(245,166,35,0.5)]" />
                    <div>
                      <h3 className="font-serif text-2xl mb-2 font-bold tracking-wide">Address</h3>
                      <p className="text-muted-foreground leading-relaxed font-medium">
                        King Fahd Road, Al Olaya District<br />
                        Riyadh 12214<br />
                        Saudi Arabia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary shrink-0 mt-1 drop-shadow-[0_0_5px_rgba(245,166,35,0.5)]" />
                    <div>
                      <h3 className="font-serif text-2xl mb-2 font-bold tracking-wide">Opening Hours</h3>
                      <ul className="text-muted-foreground space-y-3 font-medium">
                        <li className="flex justify-between gap-8 border-b border-primary/20 pb-2">
                          <span>Mon - Thu</span>
                          <span className="text-primary font-bold">8:00 AM – 1:00 AM</span>
                        </li>
                        <li className="flex justify-between gap-8 border-b border-primary/20 pb-2">
                          <span>Fri - Sun</span>
                          <span className="text-primary font-bold">9:00 AM – 2:30 AM</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary shrink-0 mt-1 drop-shadow-[0_0_5px_rgba(245,166,35,0.5)]" />
                    <div>
                      <h3 className="font-serif text-2xl mb-2 font-bold tracking-wide">Contact</h3>
                      <p className="text-primary font-bold text-lg drop-shadow-[0_0_5px_rgba(245,166,35,0.5)]">+966 50 123 4567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 relative z-10">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-primary text-primary-foreground font-serif font-bold uppercase tracking-[0.2em] px-8 py-5 w-full hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_20px_rgba(232,67,106,0.5)] transition-all"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </a>
              </div>
            </motion.div>

            {/* Map Panel */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 min-h-[400px] lg:min-h-full bg-muted relative"
            >
              {/* Fallback elegant placeholder map since we don't have a real API key */}
              <div className="absolute inset-0 bg-[#0D0A1A] flex items-center justify-center flex-col text-foreground p-8 text-center border-l border-primary/20">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
                <div className="w-24 h-24 rounded-full border-2 border-primary/40 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(245,166,35,0.2)] relative z-10">
                  <MapPin className="w-10 h-10 text-primary drop-shadow-[0_0_8px_rgba(245,166,35,0.6)]" />
                </div>
                <h3 className="font-serif text-3xl mb-4 font-bold tracking-wide relative z-10">Interactive Map Area</h3>
                <p className="text-muted-foreground font-medium max-w-md relative z-10">
                  In a production environment, this area would contain a customized Google Maps embed with dark mode styling matching the midnight atelier aesthetic.
                </p>
                <div className="mt-10 p-5 bg-card/60 border border-primary/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] relative z-10">
                  <p className="font-mono text-sm text-primary font-bold tracking-widest">Coordinates: 24.7136° N, 46.6753° E</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </PageLayout>
  );
}
