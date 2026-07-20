import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { fadeUp, staggerContainer } from '@/lib/animations';
import aboutUsBg from '@assets/about_us.jpg';

const timeline = [
  { year: "2018", title: "The Concept", desc: "Born from a passion for specialty coffee and fine pastries, the idea of SUCRÉ was conceptualized in Paris." },
  { year: "2020", title: "First Location", desc: "We opened our doors in Riyadh, bringing our unique fusion of Parisian elegance and Middle Eastern warmth to life." },
  { year: "2022", title: "Expansion", desc: "Expanded our menu to include our now-famous signature desserts, crafted by master pâtissiers." },
  { year: "2024", title: "The Sanctuary", desc: "A complete redesign to establish our space as the ultimate luxury café sanctuary in the city." }
];

export default function About() {
  return (
    <PageLayout>
      <SEO title="About Us" description="Discover the story behind SUCRÉ, where Parisian elegance meets Middle Eastern warmth." />
      
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6">
              Our Story
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light">
              Crafting unforgettable moments through the perfect harmony of coffee, dessert, and ambiance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={aboutUsBg} alt="SUCRÉ Interior" className="w-full aspect-[3/4] object-cover shadow-2xl" />
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="mb-12">
                <h2 className="font-serif text-3xl md:text-4xl mb-4 text-primary">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To elevate the everyday café visit into a luxurious ritual. We source the finest beans, employ master bakers, and curate an environment that invites you to linger, connect, and savor.
                </p>
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <h2 className="font-serif text-3xl md:text-4xl mb-4 text-primary">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To be the premier destination for affluent coffee lovers, recognized globally for blending uncompromising quality with extraordinary aesthetic experiences.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl">The Journey</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-6" />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col md:flex-row gap-6 md:gap-12 mb-12 last:mb-0"
              >
                <div className="md:w-1/4 md:text-right">
                  <span className="text-4xl font-serif text-primary">{item.year}</span>
                </div>
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  {index !== timeline.length - 1 && <div className="w-px h-full bg-primary/30 mt-2" />}
                </div>
                <div className="md:w-3/4 pb-8 md:pb-0">
                  <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
                  <p className="text-secondary-foreground/70 leading-relaxed text-lg font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
