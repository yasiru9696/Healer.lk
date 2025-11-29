import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { supabase, type Testimonial } from '../lib/supabase';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// Fallback mock data for when Supabase is unavailable
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    client_name: 'Priya Jayawardena',
    client_title: 'Yoga Enthusiast',
    testimonial: 'Dr. Umesha\'s holistic approach transformed my life. The combination of Ayurveda and yoga therapy helped me overcome chronic pain that I had been dealing with for years.',
    rating: 5,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    client_name: 'Rohan Fernando',
    client_title: 'Business Professional',
    testimonial: 'The sound healing sessions are incredibly powerful. I feel more centered and focused after each session. Highly recommend to anyone dealing with stress.',
    rating: 5,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    client_name: 'Sanduni Perera',
    client_title: 'Teacher',
    testimonial: 'Dr. Umesha\'s meditation guidance has been life-changing. I\'ve learned to manage anxiety and find peace in my daily life. Truly grateful for this healing journey.',
    rating: 5,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setTestimonials(data);
      }
      // If error or no data, keep using mockTestimonials
    }
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => {
      const next = prev + 2;
      return next >= testimonials.length ? 0 : next;
    });
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => {
      const prevIdx = prev - 2;
      return prevIdx < 0 ? Math.max(0, testimonials.length - 2) : prevIdx;
    });
  };

  useEffect(() => {
    if (testimonials.length > 2) {
      const interval = setInterval(nextTestimonial, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  // Get current two testimonials to display
  const currentTestimonials = testimonials.slice(currentIndex, currentIndex + 2);
  // If we only have one testimonial at the end, add the first one to fill the pair
  if (currentTestimonials.length === 1 && testimonials.length > 1) {
    currentTestimonials.push(testimonials[0]);
  }

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-rose-50/30 via-lavender-50/30 to-peach-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-teal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Star className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Client Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Healing Stories
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Real experiences from real people
            </p>
          </div>

          <div className="relative">
            {/* Grid of two testimonials */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {currentTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border border-slate-100 dark:border-slate-700 transition-all duration-500 hover:shadow-3xl hover:-translate-y-1"
                >
                  <Quote className="w-12 h-12 text-teal-200 dark:text-teal-900/50 mb-4" />

                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                            }`}
                        />
                      ))}
                    </div>

                    <blockquote className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-center font-medium mb-6 min-h-[120px]">
                      "{testimonial.testimonial}"
                    </blockquote>

                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {testimonial.client_name}
                      </div>
                      {testimonial.client_title && (
                        <div className="text-sm text-teal-600 dark:text-teal-400 mt-1">
                          {testimonial.client_title}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation controls */}
            {testimonials.length > 2 && (
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-lg"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index * 2)}
                      className={`w-2 h-2 rounded-full transition-all ${Math.floor(currentIndex / 2) === index
                        ? 'bg-teal-600 dark:bg-teal-400 w-8'
                        : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      aria-label={`Go to testimonial pair ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-lg"
                  aria-label="Next testimonials"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>
              </div>
            )}

            <div className="absolute -top-8 -left-8 w-32 h-32 bg-teal-300/30 dark:bg-teal-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-300/30 dark:bg-amber-600/20 rounded-full blur-3xl" />
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Join hundreds of satisfied clients on their healing journey
            </p>
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
