import { useTheme } from './hooks/useTheme';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Tips from './components/Tips';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Tips />
      <Booking />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
