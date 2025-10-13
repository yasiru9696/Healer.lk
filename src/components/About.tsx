import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award, BookOpen, Heart, Leaf } from 'lucide-react';

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 px-4 py-2 rounded-full mb-4">
              <Heart className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span className="text-sm font-medium text-teal-700 dark:text-teal-300">About The Healer</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Meet Dr. Umesha Dilhara
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              A dedicated practitioner bringing ancient healing wisdom to modern life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Dr. Umesha Dilhara has dedicated over 15 years to the study and practice of
                  traditional healing arts. His journey began with classical Ayurvedic medicine,
                  where he studied under renowned masters in Sri Lanka and India.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Recognizing that true healing encompasses body, mind, and spirit, he expanded
                  his practice to include yoga therapy, vibrational sound healing, and Buddhist
                  meditation techniques. This holistic approach has helped hundreds of clients
                  find balance, relief, and transformation.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Dr. Umesha believes that each person has an innate capacity for healing. His
                  role is to guide, support, and create the conditions for that natural healing
                  wisdom to emerge.
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Book a Consultation
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-teal-50 to-amber-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl shadow-lg border border-teal-100 dark:border-slate-600 hover:shadow-xl transition-all hover:-translate-y-1">
                <Award className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Certifications & Training
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Bachelor of Ayurvedic Medicine & Surgery (BAMS)</li>
                  <li>• Yoga Alliance Certified Instructor (RYT-500)</li>
                  <li>• Sound Healing Practitioner Certification</li>
                  <li>• Buddhist Meditation Teacher Training</li>
                  <li>• Traditional Pulse Diagnosis Mastery</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl shadow-lg border border-amber-100 dark:border-slate-600 hover:shadow-xl transition-all hover:-translate-y-1">
                <Leaf className="w-12 h-12 text-amber-600 dark:text-amber-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Philosophy & Approach
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  "Healing is not just the absence of disease, but the presence of vitality,
                  balance, and joy. My approach integrates time-tested wisdom with personalized
                  care, meeting each person where they are on their healing journey."
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl shadow-lg border border-orange-100 dark:border-slate-600 hover:shadow-xl transition-all hover:-translate-y-1">
                <BookOpen className="w-12 h-12 text-orange-600 dark:text-orange-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Specializations
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div>• Chronic Pain</div>
                  <div>• Digestive Health</div>
                  <div>• Stress & Anxiety</div>
                  <div>• Sleep Disorders</div>
                  <div>• Women's Health</div>
                  <div>• Mental Clarity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
