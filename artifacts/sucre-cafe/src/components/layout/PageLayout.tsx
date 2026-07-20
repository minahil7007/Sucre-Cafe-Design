import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Preloader } from '../ui/Preloader';
import { BackToTop } from '../ui/BackToTop';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

interface PageLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export function PageLayout({ children, hideFooter = false }: PageLayoutProps) {
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen">
      <Preloader />
      <Navbar />
      <main className="flex-1 w-full flex flex-col noise-bg">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <BackToTop />
    </div>
  );
}
