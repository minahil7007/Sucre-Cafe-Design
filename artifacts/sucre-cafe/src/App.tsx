import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/theme-provider';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Menu from '@/pages/Menu';
import Gallery from '@/pages/Gallery';
import Events from '@/pages/Events';
import Offers from '@/pages/Offers';
import Locations from '@/pages/Locations';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/menu" component={Menu} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/events" component={Events} />
      <Route path="/offers" component={Offers} />
      <Route path="/locations" component={Locations} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
