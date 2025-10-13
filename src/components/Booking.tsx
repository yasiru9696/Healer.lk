import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { supabase, type Service, type Booking } from '../lib/supabase';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

export default function Booking() {
  const { ref, isVisible } = useScrollAnimation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<Booking>({
    service_id: '',
    client_name: '',
    client_email: '',
    client_phone: '',
    appointment_date: '',
    appointment_time: '',
    notes: '',
  });

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (data) {
        setServices(data);
      }
    }
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const { error: insertError } = await supabase
      .from('bookings')
      .insert([formData]);

    if (insertError) {
      setError('Failed to book appointment. Please try again or contact us directly.');
    } else {
      setSuccess(true);
      setFormData({
        service_id: '',
        client_name: '',
        client_email: '',
        client_phone: '',
        appointment_date: '',
        appointment_time: '',
        notes: '',
      });
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 px-4 py-2 rounded-full mb-4">
              <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                Book Your Session
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Begin Your Healing Journey
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Schedule your appointment with Dr. Umesha Dilhara
            </p>
          </div>

          {success && (
            <div className="mb-8 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl p-6 flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                  Booking Confirmed!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Your appointment request has been received. We'll contact you shortly to confirm
                  your session details.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-8 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                  Booking Error
                </h3>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800 rounded-3xl shadow-xl p-8 space-y-6 border border-slate-100 dark:border-slate-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service-select" className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Select Service *</span>
                </label>
                <select
                  id="service-select"
                  name="service_id"
                  value={formData.service_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                >
                  <option value="">Choose a service...</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.title} - {service.duration_minutes} min - LKR {service.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <User className="w-4 h-4" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  name="client_email"
                  value={formData.client_email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number *</span>
                </label>
                <input
                  type="tel"
                  name="client_phone"
                  value={formData.client_phone}
                  onChange={handleChange}
                  required
                  placeholder="+94 77 123 4567"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Preferred Date *</span>
                </label>
                <input
                  type="date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleChange}
                  min={minDate}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Preferred Time *</span>
                </label>
                <input
                  type="time"
                  name="appointment_time"
                  value={formData.appointment_time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>Additional Notes</span>
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Please share any specific concerns, health conditions, or questions..."
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Submitting...' : 'Confirm Booking'}
            </button>

            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              You'll receive a confirmation email within 24 hours. For urgent inquiries, please call directly.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
