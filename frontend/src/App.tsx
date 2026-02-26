import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Portfolio } from '@/components/Portfolio';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background dark">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
