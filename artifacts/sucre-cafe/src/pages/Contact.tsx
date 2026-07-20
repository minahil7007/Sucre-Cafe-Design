import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactSchema>;

const faqs = [
  {
    q: "Do you take reservations?",
    a: "We operate on a walk-in basis for general seating. For parties of 6 or more, or for special events, please contact us directly via phone or this contact form at least 48 hours in advance."
  },
  {
    q: "Are your pastries made in-house?",
    a: "Yes, all our desserts and pastries are crafted daily in our kitchen by our team of expert pâtissiers using the finest imported and local ingredients."
  },
  {
    q: "Do you offer vegan or gluten-free options?",
    a: "We offer several vegan and gluten-free dessert options, and all our espresso drinks can be made with premium oat, almond, or soy milk."
  },
  {
    q: "Is parking available?",
    a: "Yes, we offer complimentary valet parking for all SUCRÉ guests. Self-parking is also available in the designated spots behind the café."
  },
  {
    q: "Can I book the café for a private event?",
    a: "Yes, SUCRÉ can be booked for private gatherings, photoshoots, and corporate events. Please use the contact form to request our private events brochure."
  }
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store in localStorage for admin panel to read
      const existingMsgsStr = localStorage.getItem('sucre_messages');
      const existingMsgs = existingMsgsStr ? JSON.parse(existingMsgsStr) : [];
      
      const newMsg = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...data,
        read: false
      };
      
      localStorage.setItem('sucre_messages', JSON.stringify([newMsg, ...existingMsgs]));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We will respond shortly.",
      });

      // Reset success state after a few seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <PageLayout>
      <SEO title="Contact" description="Get in touch with SUCRÉ café for inquiries, reservations, and feedback." />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6">
              Contact Us
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light">
              We look forward to hearing from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            
            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl mb-8">Send a Message</h2>
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/10 border border-primary/20 p-8 text-center flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl mb-2 text-foreground">Thank You</h3>
                  <p className="text-muted-foreground">Your message has been received. Our team will contact you shortly.</p>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-primary transition-colors text-foreground"
                              placeholder="John Doe"
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</FormLabel>
                            <FormControl>
                              <input 
                                {...field} 
                                type="email"
                                className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-primary transition-colors text-foreground"
                                placeholder="john@example.com"
                              />
                            </FormControl>
                            <FormMessage className="text-destructive text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <input 
                                {...field} 
                                type="tel"
                                className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-primary transition-colors text-foreground"
                                placeholder="+966 5X XXX XXXX"
                              />
                            </FormControl>
                            <FormMessage className="text-destructive text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Message</FormLabel>
                          <FormControl>
                            <textarea 
                              {...field} 
                              rows={5}
                              className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-primary transition-colors text-foreground resize-none"
                              placeholder="How can we help you?"
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs mt-1" />
                        </FormItem>
                      )}
                    />

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-primary text-primary-foreground font-serif uppercase tracking-widest px-8 py-4 w-full hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </Form>
              )}
            </motion.div>

            {/* FAQ Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-serif text-3xl mb-8">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full border-t border-border">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-border py-2">
                    <AccordionTrigger className="font-serif text-lg text-left hover:no-underline hover:text-primary transition-colors py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

          </div>
        </div>
      </section>

    </PageLayout>
  );
}
