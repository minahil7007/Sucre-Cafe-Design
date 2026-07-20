import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { initialMenuItems } from '@/data/initialData';
import { Search } from 'lucide-react';

export default function Menu() {
  const [menuItems] = useLocalStorage('sucre_menu', initialMenuItems);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageLayout>
      <SEO title="Our Menu" description="Explore our curated selection of fine coffees, matcha, and decadent desserts." />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 font-bold tracking-wide text-gradient-amber-rose drop-shadow-[0_0_15px_rgba(245,166,35,0.3)]">
              The Menu
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium mb-12">
              A meticulously curated selection of exceptional beverages and pastries.
            </motion.p>
            
            {/* Filters & Search */}
            <motion.div variants={fadeUp} className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-sm text-sm uppercase tracking-[0.15em] font-bold transition-all ${
                      activeCategory === cat 
                        ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(245,166,35,0.5)]' 
                        : 'bg-card text-foreground border border-primary/30 hover:border-accent hover:text-accent hover:shadow-[0_0_10px_rgba(232,67,106,0.3)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <input 
                  type="text" 
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-primary/30 rounded-sm focus:outline-none focus:border-accent focus:shadow-[0_0_10px_rgba(232,67,106,0.3)] text-sm transition-all text-foreground"
                />
              </div>

            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-card rounded-md overflow-hidden border border-primary/20 hover:border-gradient-amber-rose transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(245,166,35,0.2)] cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 bg-[#0D0A1A]/40 group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-luminosity opacity-90 group-hover:opacity-100 group-hover:mix-blend-normal"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 z-20 bg-[#0D0A1A]/90 backdrop-blur-md px-4 py-2 rounded-sm border border-primary/30 shadow-[0_0_10px_rgba(245,166,35,0.3)]">
                        <span className="font-serif font-bold text-primary tracking-wider">{item.price} SAR</span>
                      </div>
                    </div>
                    <div className="p-6 relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <span className="text-xs text-accent font-bold uppercase tracking-[0.2em] mb-2 block drop-shadow-[0_0_5px_rgba(232,67,106,0.4)]">{item.category}</span>
                      <h3 className="font-serif text-3xl mb-3 text-foreground font-bold tracking-wide">{item.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20"
                >
                  <p className="text-muted-foreground text-xl font-serif">No items found matching your criteria.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                    className="mt-4 text-primary uppercase tracking-widest text-sm hover:underline"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

    </PageLayout>
  );
}
