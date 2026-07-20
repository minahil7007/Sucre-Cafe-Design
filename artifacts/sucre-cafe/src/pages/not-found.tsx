import { Link } from 'wouter';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <PageLayout>
      <SEO title="404 - Not Found" />
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-8xl md:text-9xl text-primary mb-4">404</h1>
          <h2 className="font-serif text-2xl md:text-3xl mb-6">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 font-light leading-relaxed">
            The page you are looking for has vanished into the espresso crema.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-primary text-primary-foreground font-serif uppercase tracking-widest px-8 py-4 hover:bg-primary/90 transition-all hover:-translate-y-1"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </PageLayout>
  );
}
