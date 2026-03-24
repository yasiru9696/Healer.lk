import { Sparkles, Heart, Facebook, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-teal-400" />
              <div>
                <div className="text-xl font-bold text-white">Dr. Umesha Dilhara</div>
                <div className="text-sm text-teal-400">The Healer</div>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
              Holistic healing through traditional Ayurveda, restorative yoga, transformative
              sound healing, and mindful Buddhist meditation. Begin your journey to wellness
              today.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@healer.lk"
                className="w-10 h-10 bg-slate-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['home', 'about', 'services', 'testimonials', 'tips', 'contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() =>
                      document.getElementById(link)?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="hover:text-teal-400 transition-colors capitalize"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() =>
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="hover:text-teal-400 transition-colors"
                >
                  Ayurveda Treatment
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="hover:text-teal-400 transition-colors"
                >
                  Yoga Practice
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="hover:text-teal-400 transition-colors"
                >
                  Sound Healing
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="hover:text-teal-400 transition-colors"
                >
                  Buddhist Meditation
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <span>© {currentYear} Dr. Umesha Dilhara - The Healer. All rights reserved.</span>
            </div>

            <div className="flex items-center space-x-1 text-sm text-slate-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>for healing</span>
            </div>

            <div className="flex space-x-6 text-sm">
              <button className="hover:text-teal-400 transition-colors">Privacy Policy</button>
              <button className="hover:text-teal-400 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
