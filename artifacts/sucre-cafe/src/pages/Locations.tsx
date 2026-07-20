import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export default function Locations() {
  return (
    <PageLayout>
      <SEO title="Locations" description="Find SUCRÉ café locations, opening hours, and directions." />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6">
              Our Locations
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light">
              Visit us and step into a sanctuary for the senses.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-0 items-stretch border border-border bg-card shadow-sm">
            
            {/* Info Panel */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-between"
            >
              <div>
                <span className="text-primary uppercase tracking-widest text-xs font-semibold mb-4 block">Flagship Store</span>
                <h2 className="font-serif text-4xl mb-8">SUCRÉ Olaya</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif text-lg mb-1">Address</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        King Fahd Road, Al Olaya District<br />
                        Riyadh 12214<br />
                        Saudi Arabia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif text-lg mb-1">Opening Hours</h3>
                      <ul className="text-muted-foreground space-y-2">
                        <li className="flex justify-between gap-8 border-b border-border/50 pb-1">
                          <span>Mon - Thu</span>
                          <span>8:00 AM – 1:00 AM</span>
                        </li>
                        <li className="flex justify-between gap-8 border-b border-border/50 pb-1">
                          <span>Fri - Sun</span>
                          <span>9:00 AM – 2:30 AM</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif text-lg mb-1">Contact</h3>
                      <p className="text-muted-foreground">+966 50 123 4567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-serif uppercase tracking-widest px-8 py-4 w-full hover:bg-primary/90 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
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
              <div className="absolute inset-0 bg-secondary flex items-center justify-center flex-col text-secondary-foreground p-8 text-center border-l border-border">
                <div className="w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center mb-6">
                  <MapPin className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-serif text-2xl mb-2">Interactive Map Area</h3>
                <p className="text-secondary-foreground/60 font-light max-w-sm">
                  In a production environment, this area would contain a customized Google Maps embed with dark mode styling matching the SUCRÉ aesthetic.
                </p>
                <div className="mt-8 p-4 bg-background/5 border border-primary/20 backdrop-blur-sm">
                  <p className="font-mono text-xs text-primary">Coordinates: 24.7136° N, 46.6753° E</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </PageLayout>
  );
}
