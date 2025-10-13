import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { supabase, type Testimonial } from '../lib/supabase';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setTestimonials(data);
      }
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(nextTestimonial, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  if (loading) {
    return null;
  }

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-teal-50 via-amber-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-teal-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100 dark:border-slate-700">
              <Quote className="w-16 h-16 text-teal-200 dark:text-teal-900/50 mb-6" />

              <div className="mb-8">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < current.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed text-center font-medium mb-8">
                  "{current.testimonial}"
                </blockquote>

                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {current.client_name}
                  </div>
                  {current.client_title && (
                    <div className="text-sm text-teal-600 dark:text-teal-400 mt-1">
                      {current.client_title}
                    </div>
                  )}
                </div>
              </div>

              {testimonials.length > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  </button>

                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? 'bg-teal-600 dark:bg-teal-400 w-8'
                            : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="p-3 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  </button>
                </div>
              )}
            </div>

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
