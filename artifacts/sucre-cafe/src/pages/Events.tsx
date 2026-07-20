import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { initialEvents } from '@/data/initialData';
import { EventCountdown } from '@/components/ui/EventCountdown';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function Events() {
  const [events] = useLocalStorage('sucre_events', initialEvents);
  
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Separate into upcoming and past (for this demo, we assume all initial events are upcoming or we just show the next one prominently)
  const now = new Date();
  const upcomingEvents = sortedEvents.filter(e => new Date(e.date) > now);
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : sortedEvents[0];
  const otherEvents = sortedEvents.filter(e => e.id !== nextEvent?.id);

  return (
    <PageLayout>
      <SEO title="Events" description="Join us for exclusive tastings, gatherings, and special occasions at SUCRÉ." />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6">
              Gatherings
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light">
              Curated experiences for the coffee connoisseur and dessert aficionado.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Next Event */}
      {nextEvent && (
        <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-background/5 p-8 md:p-12 border border-primary/20 backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                
                <div className="flex-1 space-y-6">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 uppercase tracking-widest text-xs">
                    Next Upcoming
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl">{nextEvent.title}</h2>
                  <p className="text-secondary-foreground/80 leading-relaxed text-lg font-light">
                    {nextEvent.description}
                  </p>
                  
                  <div className="space-y-3 pt-4 border-t border-primary/20">
                    <div className="flex items-center gap-3 text-secondary-foreground/80">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>{format(new Date(nextEvent.date), 'EEEE, MMMM do, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-secondary-foreground/80">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{format(new Date(nextEvent.date), 'h:mm a')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-secondary-foreground/80">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>SUCRÉ Riyadh</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center space-y-8 bg-background/10 p-8 w-full">
                  <h3 className="font-serif text-xl text-center">Starts In</h3>
                  <EventCountdown targetDate={nextEvent.date} />
                  <button className="bg-primary text-primary-foreground font-serif uppercase tracking-widest px-8 py-3 w-full hover:bg-primary/90 transition-colors">
                    Reserve Spot
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Other Events List */}
      {otherEvents.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-3xl mb-12 text-center"
            >
              More Upcoming Events
            </motion.h2>

            <div className="space-y-6">
              {otherEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-card border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="md:w-1/4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border pb-4 md:pb-0 md:pr-6">
                    <span className="text-primary uppercase tracking-widest text-sm font-semibold mb-1">
                      {format(new Date(event.date), 'MMM')}
                    </span>
                    <span className="font-serif text-4xl">{format(new Date(event.date), 'dd')}</span>
                    <span className="text-muted-foreground text-sm mt-1">{format(new Date(event.date), 'h:mm a')}</span>
                  </div>
                  
                  <div className="md:w-2/4 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-serif text-2xl group-hover:text-primary transition-colors">{event.title}</h3>
                      {event.badge && (
                        <span className="text-[10px] uppercase tracking-widest border border-border px-2 py-1 rounded-sm text-muted-foreground">
                          {event.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                  
                  <div className="md:w-1/4 flex items-center justify-end">
                    <button className="text-primary font-serif uppercase tracking-widest text-sm hover:underline underline-offset-4">
                      Details & RSVP
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

    </PageLayout>
  );
}
