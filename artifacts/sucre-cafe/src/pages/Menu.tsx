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
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6">
              The Menu
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light mb-12">
              A meticulously curated selection of exceptional beverages and pastries.
            </motion.p>
            
            {/* Filters & Search */}
            <motion.div variants={fadeUp} className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider font-medium transition-all ${
                      activeCategory === cat 
                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' 
                        : 'bg-background text-foreground border border-border hover:border-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-full focus:outline-none focus:border-primary text-sm transition-colors"
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
                    className="group bg-card rounded-lg overflow-hidden border border-border hover-elevate transition-all duration-300 hover:border-primary/50 cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 z-20 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                        <span className="font-serif font-semibold text-primary">{item.price} SAR</span>
                      </div>
                    </div>
                    <div className="p-6 relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                      <span className="text-xs text-primary uppercase tracking-widest mb-2 block">{item.category}</span>
                      <h3 className="font-serif text-2xl mb-3 text-foreground">{item.name}</h3>
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
