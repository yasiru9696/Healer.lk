import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { supabase, type Service } from '../lib/supabase';
import { Clock, DollarSign, Leaf, Wind, Music, Sparkles } from 'lucide-react';

const serviceIcons = {
  ayurveda: Leaf,
  yoga: Wind,
  'sound-healing': Music,
  meditation: Sparkles,
};

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    }
    fetchServices();
  }, []);

  const handleBookService = (serviceId: string) => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const serviceSelect = document.getElementById('service-select') as HTMLSelectElement;
        if (serviceSelect) {
          serviceSelect.value = serviceId;
          serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, 500);
    }
  };

  if (loading) {
    return (
      <section id="services" className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse text-slate-400">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                Healing Services
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Your Path to Wellness
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Personalized healing sessions designed for your unique journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] || Sparkles;
              return (
                <div
                  key={service.id}
                  className={`group bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 dark:border-slate-700 hover:-translate-y-2 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 bg-gradient-to-br from-teal-50 to-amber-50 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-amber-400/20 dark:from-teal-600/20 dark:to-amber-600/20 group-hover:scale-110 transition-transform duration-500" />
                    <Icon className="w-24 h-24 text-teal-600 dark:text-teal-400 relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {service.short_description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration_minutes} minutes</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm font-semibold text-teal-600 dark:text-teal-400">
                        <DollarSign className="w-4 h-4" />
                        <span>LKR {service.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookService(service.id)}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold transition-all hover:shadow-lg group-hover:scale-105"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Not sure which service is right for you?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl">
                Schedule a free 15-minute consultation to discuss your needs and find the perfect
                healing approach for your journey.
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Request Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
