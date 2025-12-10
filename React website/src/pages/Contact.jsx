import { useState } from 'react';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import GradientText from '../components/ui/GradientText';
import Container from '../components/common/Container';
import Button from '../components/ui/Button';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [quoteData, setQuoteData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: '',
    quantity: '',
    specifications: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (window.location.hash === '#quote') {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.submitContact(formData);
      setSuccess(t('contact.success'));
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch (err) {
      setError(t('contact.fail'));
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.submitContact({ ...quoteData, subject: 'Quote Request' });
      setSuccess(t('contact.quoteSuccess'));
      setQuoteData({ name: '', email: '', phone: '', company: '', product: '', quantity: '', specifications: '' });
    } catch (err) {
      setError(t('contact.fail'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-5"></div>
        <Container className="relative z-10 text-center">
          <Badge variant="primary" size="lg" icon="fas fa-envelope" className="mb-6">
            {t('contact.heroBadge') || 'Get in Touch'}
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <GradientText from="from-primary-400" via="via-blue-400" to="to-cyan-400" animate={true}>
              {t('contact.heroTitle')}
            </GradientText>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">{t('contact.heroSubtitle')}</p>
        </Container>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-slate-900">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card variant="dark" className="text-center bg-slate-800/50 backdrop-blur border-slate-700 p-8 hover:border-primary-500/50" hoverable>
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-phone text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">{t('contact.phone')}</h3>
              <p className="text-gray-600">India: +91 77080 97242</p>
              <p className="text-gray-600">UAE: +971 54 307 4131</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-envelope text-4xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">{t('contact.email')}</h3>
              <p className="text-gray-600">info@susin.in</p>
              <p className="text-gray-600">sales@susin.in</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-clock text-4xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">{t('contact.hours')}</h3>
              <p className="text-gray-600">{t('contact.hoursWeek')}</p>
              <p className="text-gray-600">{t('contact.hoursSat')}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('contact.sendMessage')}</h2>
              {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
              {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t('contact.namePh')}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder={t('contact.emailPh')}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder={t('contact.phonePh')}
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder={t('contact.companyPh')}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder={t('contact.subjectPh')}
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <textarea
                  placeholder={t('contact.messagePh')}
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
                >
                  {loading ? 'Sending...' : t('contact.sendBtn')}
                </button>
              </form>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('contact.officesTitle')}</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    {t('contact.officesIndia')}
                  </h4>
                  <p className="text-gray-700 mb-2">Susin Group</p>
                  <p className="text-gray-600 text-sm">Coimbatore, Tamil Nadu, India</p>
                  <p className="text-gray-600 text-sm mt-2">Phone: +91 77080 97242</p>
                  <p className="text-gray-600 text-sm">Email: info@susin.in</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    {t('contact.officesUae')}
                  </h4>
                  <p className="text-gray-700 mb-2">SUSIN Middle East</p>
                  <p className="text-gray-600 text-sm">Dubai, United Arab Emirates</p>
                  <p className="text-gray-600 text-sm mt-2">Phone: +971 54 307 4131</p>
                  <p className="text-gray-600 text-sm">Email: dubai@susin.in</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    {t('contact.officesQatar')}
                  </h4>
                  <p className="text-gray-700 mb-2">SUSIN Qatar</p>
                  <p className="text-gray-600 text-sm">Doha, Qatar</p>
                  <p className="text-gray-600 text-sm mt-2">Email: qatar@susin.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request */}
      <section id="quote" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('contact.quoteTitle')}</h2>
              <p className="text-xl text-gray-600">{t('contact.quoteSubtitle')}</p>
            </div>
            
            <form onSubmit={handleQuoteSubmit} className="bg-white rounded-xl p-8 shadow-lg space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder={t('contact.quoteFullName')}
                  required
                  value={quoteData.name}
                  onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  placeholder={t('contact.quoteEmail')}
                  required
                  value={quoteData.email}
                  onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  placeholder={t('contact.quotePhone')}
                  required
                  value={quoteData.phone}
                  onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder={t('contact.quoteCompany')}
                  required
                  value={quoteData.company}
                  onChange={(e) => setQuoteData({ ...quoteData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
              <select
                required
                value={quoteData.product}
                onChange={(e) => setQuoteData({ ...quoteData, product: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">{t('contact.quoteProduct')}</option>
                <option value="pneumatic">Pneumatic Actuators</option>
                <option value="electro-hydraulic">Electro-Hydraulic Actuators</option>
                <option value="electrical">Electrical Actuators</option>
                <option value="gearboxes">Gearboxes</option>
                <option value="accessories">Accessories</option>
                <option value="custom">Custom Solution</option>
              </select>
              <input
                type="text"
                placeholder={t('contact.quoteQty')}
                value={quoteData.quantity}
                onChange={(e) => setQuoteData({ ...quoteData, quantity: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder={t('contact.quoteSpecs')}
                required
                rows="5"
                value={quoteData.specifications}
                onChange={(e) => setQuoteData({ ...quoteData, specifications: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-lg text-lg disabled:opacity-50"
              >
                {loading ? t('contact.quoteSubmitting') : t('contact.quoteBtn')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
