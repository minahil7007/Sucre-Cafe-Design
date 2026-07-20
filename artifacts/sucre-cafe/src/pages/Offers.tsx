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
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6">
              Exclusive Offers
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light">
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
                  className="relative group overflow-hidden bg-card border border-border p-8 hover-elevate transition-all duration-300"
                >
                  {/* Shimmer effect */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-5 group-hover:animate-[shimmer_1.5s_infinite]" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 flex justify-between items-start">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      {isExpiringSoon && (
                        <span className="text-[10px] uppercase tracking-widest bg-destructive/10 text-destructive px-2 py-1 rounded-sm border border-destructive/20 animate-pulse">
                          Expiring Soon
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-serif text-2xl mb-4 text-foreground">{offer.title}</h3>
                    <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">
                      {offer.description}
                    </p>
                    
                    <div className="pt-6 border-t border-border mt-auto">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Use Code</span>
                          <span className="font-mono bg-background px-3 py-1 border border-border text-foreground tracking-wider rounded-sm select-all">
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
