import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { initialOffers } from '@/data/initialData';
import { format, parseISO } from 'date-fns';
import { Sparkles, Clock } from 'lucide-react';

export default function Offers() {
  const [offers] = useLocalStorage('sucre_offers', initialOffers);

  return (
    <PageLayout>
      <SEO title="Offers" description="Exclusive promotions and limited-time offers at SUCRÉ." />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 font-bold tracking-wide text-gradient-amber-rose drop-shadow-[0_0_15px_rgba(245,166,35,0.3)]">
              Exclusive Offers
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Special privileges for our cherished guests.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => {
              const expiryDate = parseISO(offer.expiry);
              const isExpiringSoon = new Date(offer.expiry).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;

              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group overflow-hidden bg-card border border-primary/20 p-8 hover-elevate transition-all duration-300 rounded-sm hover:border-gradient-amber-rose hover:shadow-[0_0_20px_rgba(245,166,35,0.2)]"
                >
                  {/* Shimmer effect */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-primary/20 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_infinite]" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 flex justify-between items-start">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[#1A0F2E] shadow-[0_0_15px_rgba(245,166,35,0.5)]">
                        <Sparkles className="w-7 h-7" />
                      </div>
                      {isExpiringSoon && (
                        <span className="text-[10px] uppercase tracking-[0.2em] bg-accent/20 text-accent px-3 py-1 rounded-sm border border-accent/40 animate-pulse font-bold shadow-[0_0_8px_rgba(232,67,106,0.4)]">
                          Expiring Soon
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-serif text-3xl mb-4 text-foreground font-bold tracking-wide">{offer.title}</h3>
                    <p className="text-muted-foreground mb-8 flex-1 leading-relaxed font-medium">
                      {offer.description}
                    </p>
                    
                    <div className="pt-6 border-t border-primary/20 mt-auto">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-primary/80 block mb-2 font-bold">Use Code</span>
                          <span className="font-mono bg-[#0D0A1A] px-4 py-2 border border-primary/30 text-primary tracking-widest rounded-sm select-all font-bold shadow-[0_0_10px_rgba(245,166,35,0.2)]">
                            {offer.code}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
                        <Clock className="w-3 h-3" />
                        <span>Valid until {format(expiryDate, 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {offers.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-serif text-xl">
              No active offers at the moment. Check back soon.
            </div>
          )}
        </div>
      </section>

    </PageLayout>
  );
}
