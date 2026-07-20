import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Link } from 'wouter';
import heroBg from '@assets/hero_bg.jpg';
import aboutUsBg from '@assets/about_us.jpg';

export default function Home() {
  return (
    <PageLayout>
      <SEO title="Home" />
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            backgroundPosition: '50% 50%' 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#1A0F2E]/70 to-[#0D0A1A]/95 backdrop-blur-[2px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center mt-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeUp}
              className="text-primary tracking-[0.3em] uppercase text-sm md:text-base font-bold mb-6 drop-shadow-[0_0_8px_rgba(245,166,35,0.6)]"
            >
              Experience SUCRÉ
            </motion.h2>
            
            <motion.h1 
              variants={fadeUp}
              className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-wider text-gradient-amber-rose drop-shadow-[0_0_15px_rgba(245,166,35,0.3)]"
            >
              Your Local Coffee & <br className="hidden md:block"/> Dessert Haven
            </motion.h1>
            
            <motion.div variants={fadeUp} className="mb-12">
              <p className="text-foreground/90 text-lg md:text-xl font-light italic">
                <span className="typewriter inline-block overflow-hidden whitespace-nowrap border-r-2 border-accent w-0 animate-[typing_4s_steps(40,end)_forwards,blink_1s_step-end_infinite] drop-shadow-[0_0_5px_rgba(232,67,106,0.5)]">
                  Crafted coffee, handmade desserts, unforgettable moments.
                </span>
              </p>
            </motion.div>

            <motion.div 
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link 
                href="/menu" 
                className="bg-primary text-primary-foreground font-serif font-bold uppercase tracking-[0.2em] px-8 py-4 w-full sm:w-auto hover:bg-accent hover:text-accent-foreground transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(245,166,35,0.4)]"
              >
                View Menu
              </Link>
              <Link 
                href="/locations" 
                className="bg-transparent border border-primary text-primary font-serif font-bold uppercase tracking-[0.2em] px-8 py-4 w-full sm:w-auto hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all hover:-translate-y-1"
              >
                Visit Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-primary/70 text-xs uppercase tracking-[0.2em] font-bold font-serif">Scroll</span>
          <div className="w-px h-16 bg-primary/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary to-accent shadow-[0_0_10px_rgba(245,166,35,0.8)]"
              animate={{ top: ['-50%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="font-serif text-5xl md:text-6xl mb-6 text-foreground font-bold tracking-wide">Where Elegance Meets Warmth.</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mb-8 shadow-[0_0_8px_rgba(232,67,106,0.5)]" />
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Step into a world where every detail whispers refinement. SUCRÉ is more than a café; it's a private salon designed for those who treat coffee as a ritual. 
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                From our golden lighting to our carefully curated menu, we blend Parisian elegance with Middle Eastern warmth to create an unforgettable sensory experience.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-primary font-serif font-bold uppercase tracking-[0.2em] hover:text-accent hover:drop-shadow-[0_0_8px_rgba(232,67,106,0.6)] transition-all group">
                Discover Our Story 
                <span className="group-hover:translate-x-2 transition-transform text-accent">→</span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] md:aspect-square"
            >
              <div className="absolute inset-0 bg-primary/10 translate-x-4 translate-y-4" />
              <img 
                src={aboutUsBg} 
                alt="SUCRÉ Experience" 
                className="w-full h-full object-cover relative z-10 shadow-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* BANNER SECTION */}
      <section className="py-32 relative bg-card text-card-foreground text-center overflow-hidden border-t border-primary/20">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-accent/20 to-transparent mix-blend-screen" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="container mx-auto px-4 relative z-10"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl max-w-5xl mx-auto leading-tight font-bold tracking-wide text-gradient-amber-rose drop-shadow-[0_0_10px_rgba(245,166,35,0.2)]">
            "A sanctuary for the senses, where time slows down and flavors come alive."
          </h2>
          <div className="mt-16">
            <Link href="/gallery" className="bg-transparent border-2 border-primary text-primary hover:bg-accent hover:border-accent hover:text-accent-foreground hover:shadow-[0_0_20px_rgba(232,67,106,0.5)] font-serif font-bold uppercase tracking-[0.2em] px-10 py-5 transition-all inline-block">
              View Gallery
            </Link>
          </div>
        </motion.div>
      </section>

    </PageLayout>
  );
}
