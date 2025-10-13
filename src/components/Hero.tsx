import { useParallax } from '../hooks/useScrollAnimation';
import { Sparkles, Wind, Heart } from 'lucide-react';

export default function Hero() {
  const offsetY = useParallax();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-50 via-amber-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-teal-900"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      />

      <div
        className="absolute top-20 left-10 w-64 h-64 bg-teal-300/20 dark:bg-teal-600/10 rounded-full blur-3xl"
        style={{ transform: `translate(${offsetY * 0.1}px, ${offsetY * 0.15}px)` }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/20 dark:bg-orange-600/10 rounded-full blur-3xl"
        style={{ transform: `translate(${-offsetY * 0.1}px, ${-offsetY * 0.2}px)` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid md:grid-cols-2 gap-12 items-center">
        <div
          className="space-y-8 animate-fade-in"
          style={{ transform: `translateY(${offsetY * 0.1}px)` }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Holistic Healing & Wellness
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
            Dr. Umesha Dilhara
            <span className="block text-3xl md:text-4xl mt-4 bg-gradient-to-r from-teal-600 to-amber-600 dark:from-teal-400 dark:to-amber-400 bg-clip-text text-transparent">
              The Healer
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Holistic <span className="font-semibold text-teal-600 dark:text-teal-400">Ayurveda</span>,
            restorative <span className="font-semibold text-amber-600 dark:text-amber-400">Yoga</span>,
            transformative <span className="font-semibold text-orange-600 dark:text-orange-400">Sound Healing</span>,
            and mindful <span className="font-semibold text-teal-700 dark:text-teal-300">Buddhist Meditation</span>.
          </p>

          <p className="text-lg text-slate-600 dark:text-slate-400">
            Book a session and begin your healing journey.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center space-x-2"
            >
              <span>Book Appointment</span>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Meet The Healer
            </button>
          </div>

          <div className="flex items-center space-x-8 pt-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-rose-500" />
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">500+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Happy Clients</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="w-6 h-6 text-teal-500" />
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">15+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative"
          style={{ transform: `translateY(${-offsetY * 0.15}px)` }}
        >
          <div className="relative w-full aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-amber-400 dark:from-teal-600 dark:to-amber-600 rounded-3xl rotate-6 opacity-20 blur-2xl animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-tl from-orange-400 to-teal-400 dark:from-orange-600 dark:to-teal-600 rounded-3xl -rotate-6 opacity-20 blur-2xl animate-pulse-slow animation-delay-1000" />

            <div className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-500 dark:bg-teal-600 rounded-full flex items-center justify-center shadow-xl animate-float">
                <Sparkles className="w-12 h-12 text-white" />
              </div>

              <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-teal-100 to-amber-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-6xl">
                🧘‍♂️
              </div>

              <div className="mt-6 text-center">
                <div className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-2">
                  Certified Practitioner
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <div>🌿 Traditional Ayurveda</div>
                  <div>🧘 Yoga Alliance Certified</div>
                  <div>🔔 Sound Healing Therapist</div>
                  <div>☸️ Buddhist Meditation Guide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
}
