import { useParallax } from '../hooks/useScrollAnimation';
import { Sparkles, Wind, Heart, Leaf, Flower2 } from 'lucide-react';

export default function Hero() {
  const offsetY = useParallax();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Soft pastel Ayurvedic gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-pink-50/50 to-teal-50/50 dark:from-slate-900 dark:via-purple-900/10 dark:to-teal-900/50"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      />

      {/* Sacred geometry - soft floating orbs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200/20 to-peach-200/20 dark:from-amber-600/15 dark:to-orange-600/15 rounded-full blur-3xl"
        style={{ transform: `translate(${offsetY * 0.1}px, ${offsetY * 0.15}px)` }}
      />
      <div
        className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-br from-teal-200/20 to-mint-200/20 dark:from-teal-600/10 dark:to-green-600/10 rounded-full blur-3xl"
        style={{ transform: `translate(${-offsetY * 0.12}px, ${offsetY * 0.18}px)` }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/15 to-pink-200/15 dark:from-purple-600/8 dark:to-pink-600/8 rounded-full blur-3xl"
        style={{ transform: `translate(${-offsetY * 0.1}px, ${-offsetY * 0.2}px)` }}
      />

      {/* Lotus petals decoration */}
      <div className="absolute top-32 right-1/4 opacity-8 dark:opacity-3">
        <Flower2 className="w-32 h-32 text-amber-600 animate-pulse-slow" />
      </div>
      <div className="absolute bottom-32 left-1/4 opacity-10 dark:opacity-5">
        <Flower2 className="w-24 h-24 text-teal-600 animate-pulse-slow animation-delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid md:grid-cols-2 gap-12 items-center">
        <div
          className="space-y-8 animate-fade-in"
          style={{ transform: `translateY(${offsetY * 0.1}px)` }}
        >
          {/* Sacred badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-50 to-peach-50 dark:from-amber-900/30 dark:to-orange-900/30 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md border border-amber-100 dark:border-amber-700/30">
            <Leaf className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-semibold text-amber-800 dark:text-amber-300 tracking-wide">
              🕉️ Holistic Healing & Ayurvedic Wellness
            </span>
          </div>

          {/* Main heading with spiritual emphasis */}
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
            Dr. Umesha Dilhara
            <span className="block text-3xl md:text-5xl mt-4 bg-gradient-to-r from-amber-500 via-rose-400 to-teal-500 dark:from-amber-400 dark:via-rose-400 dark:to-teal-400 bg-clip-text text-transparent font-serif italic">
              The Healer
            </span>
          </h1>

          {/* Sanskrit-inspired subtitle */}
          <div className="space-y-3">
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-200 leading-relaxed font-light">
              <span className="font-semibold text-amber-600 dark:text-amber-400">Ancient Wisdom</span> meets{' '}
              <span className="font-semibold text-teal-600 dark:text-teal-400">Modern Healing</span>
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Traditional <span className="font-semibold text-amber-500 dark:text-amber-400">Ayurveda</span>,
              restorative <span className="font-semibold text-teal-500 dark:text-teal-400">Yoga</span>,
              sacred <span className="font-semibold text-rose-500 dark:text-rose-400">Sound Healing with Bhajans</span>,
              and mindful <span className="font-semibold text-purple-500 dark:text-purple-400">Buddhist Meditation</span>.
            </p>
          </div>

          {/* Healing mantra */}
          <div className="bg-gradient-to-r from-amber-50/70 to-teal-50/70 dark:from-slate-800/40 dark:to-teal-900/20 border-l-4 border-amber-400 dark:border-amber-500 px-6 py-4 rounded-r-xl">
            <p className="text-slate-600 dark:text-slate-300 italic font-serif text-lg">
              "Healing is a journey from within. Balance your <span className="font-semibold text-amber-600 dark:text-amber-400">doshas</span>,
              nourish your <span className="font-semibold text-teal-600 dark:text-teal-400">spirit</span>,
              awaken your <span className="font-semibold text-rose-600 dark:text-rose-400">vitality</span>."
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center space-x-2"
            >
              <span>Begin Your Healing Journey</span>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white dark:bg-slate-800 hover:bg-amber-50/50 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-amber-200 dark:border-amber-700 shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              Meet The Healer
            </button>
          </div>

          {/* Stats with Ayurvedic icons */}
          <div className="flex items-center space-x-8 pt-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">200+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Healed Souls</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">3+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Years of Wisdom</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced visual card with Om symbol */}
        <div
          className="relative"
          style={{ transform: `translateY(${-offsetY * 0.15}px)` }}
        >
          <div className="relative w-full aspect-square">
            {/* Sacred geometry background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-400 dark:from-amber-600 dark:to-orange-600 rounded-3xl rotate-6 opacity-20 blur-2xl animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-tl from-teal-400 to-green-400 dark:from-teal-600 dark:to-green-600 rounded-3xl -rotate-6 opacity-20 blur-2xl animate-pulse-slow animation-delay-1000" />

            <div className="relative bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/30">
              {/* Floating meditation logo */}
              <div className="absolute -top-6 -right-6 w-32 h-32 flex items-center justify-center animate-float">
                <img
                  src="/meditation-logo.jpg"
                  alt="Ayurvedic Meditation Logo"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>

              <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-amber-100 via-orange-100 to-teal-100 dark:from-slate-700 dark:via-purple-900/30 dark:to-slate-600 flex items-center justify-center shadow-inner overflow-hidden">
                <img
                  src="/doctor-photo.jpg"
                  alt="Dr. Umesha Dilhara - The Healer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-6 text-center">
                <div className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3 tracking-wide">
                  ✨ Certified Ayurvedic Practitioner ✨
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2 bg-gradient-to-r from-amber-50 to-teal-50 dark:from-slate-800/50 dark:to-teal-900/20 p-4 rounded-xl">
                  <div className="flex items-center justify-center space-x-2">
                    <Leaf className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Traditional Ayurveda & Panchakarma</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Wind className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>Yoga Alliance Certified Therapist</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span>Sound Healing & Bhajan Master</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Flower2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Buddhist Meditation Guide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-500 dark:border-amber-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-amber-500 dark:bg-amber-600 rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
}
