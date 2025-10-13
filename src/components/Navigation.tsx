import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';

interface NavigationProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navigation({ theme, toggleTheme }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 group"
          >
            <Sparkles className="w-8 h-8 text-teal-600 dark:text-teal-400 group-hover:rotate-12 transition-transform duration-300" />
            <div className="text-left">
              <div className="text-xl font-bold text-slate-900 dark:text-white">
                Dr. Umesha Dilhara
              </div>
              <div className="text-xs text-teal-600 dark:text-teal-400">The Healer</div>
            </div>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'services', 'testimonials', 'tips', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 capitalize font-medium transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 dark:bg-teal-400 transition-all group-hover:w-full"></span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection('booking')}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
            >
              Book Appointment
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 dark:text-slate-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        } bg-white dark:bg-slate-900 shadow-lg`}
      >
        <div className="px-4 py-4 space-y-3">
          {['home', 'about', 'services', 'testimonials', 'tips', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="block w-full text-left px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-800 rounded-lg capitalize transition-colors"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('booking')}
            className="block w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </nav>
  );
}
