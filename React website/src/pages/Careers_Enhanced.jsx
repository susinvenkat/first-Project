import { useState } from 'react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import GradientText from '../components/ui/GradientText';
import Container from '../components/common/Container';
import Button from '../components/ui/Button';

export default function Careers() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    location: '',
    cover_letter: '',
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const openPositions = [
    {
      title: "Senior Human Resources",
      jobNum: "STPHR001",
      department: "HR",
      experience: "1-8 Years",
      location: "Coimbatore, India",
      description: "Lead HR operations including recruitment, employee relations, and policy development"
    },
    {
      title: "Application Engineer",
      jobNum: "SIT-R24E006",
      department: "Sales",
      experience: "1-2 Years",
      location: "Coimbatore, India",
      description: "Provide technical support to customers, prepare quotations, and assist in product selection"
    },
    {
      title: "Design Engineer",
      jobNum: "STDE001",
      department: "Engineering",
      experience: "2-8 Years",
      location: "Coimbatore, India",
      description: "Design and develop actuator systems using CAD software, create technical drawings"
    },
    {
      title: "Quality Inspector",
      jobNum: "STQI001",
      department: "Quality Control",
      experience: "0-4 Years",
      location: "Coimbatore, India",
      description: "Conduct quality inspections, maintain quality records, ensure ISO compliance"
    },
    {
      title: "Accounts Executive",
      jobNum: "STAC001",
      department: "Admin",
      experience: "0-2 Years",
      location: "Coimbatore, India",
      description: "Handle accounting operations, financial reporting, and bookkeeping"
    },
    {
      title: "Purchase Engineer",
      jobNum: "STPL-JV-P002",
      department: "Purchase",
      experience: "0-4 Years",
      location: "Coimbatore, India",
      description: "Manage procurement, vendor relationships, and supply chain operations"
    },
    {
      title: "Engineering Head",
      jobNum: "SIT-R24E004",
      department: "Engineering",
      experience: "15-20+ Years",
      location: "Coimbatore, India",
      description: "Lead engineering team, oversee product development, and strategic planning"
    },
    {
      title: "Quality Manager",
      jobNum: "SIT-R24M003",
      department: "Quality Control",
      experience: "15-20+ Years",
      location: "Coimbatore, India",
      description: "Manage quality systems, certifications, and continuous improvement initiatives"
    },
    {
      title: "Project Manager (Export)",
      jobNum: "SIT-R24M001",
      department: "Projects",
      experience: "10-15 Years",
      location: "Coimbatore, India",
      description: "Oversee international projects, coordinate with global clients and teams"
    },
    {
      title: "Production Supervisor",
      jobNum: "STPS001",
      department: "Production",
      experience: "3-7 Years",
      location: "Coimbatore, India",
      description: "Supervise manufacturing operations, ensure production targets and quality standards"
    }
  ];

  const benefits = [
    {
      icon: "fa-globe-asia",
      title: "Global Exposure",
      description: "Work on international projects across India, UAE, and Qatar with opportunities for global assignments"
    },
    {
      icon: "fa-chart-line",
      title: "Career Growth",
      description: "Structured career progression paths with regular performance reviews and advancement opportunities"
    },
    {
      icon: "fa-graduation-cap",
      title: "Talent Development",
      description: "Comprehensive training programs, technical certifications, and skill development workshops"
    },
    {
      icon: "fa-users",
      title: "Collaborative Culture",
      description: "Work with experienced professionals in a supportive, innovation-driven environment"
    },
    {
      icon: "fa-briefcase",
      title: "Competitive Package",
      description: "Industry-leading compensation, performance bonuses, and comprehensive benefits"
    },
    {
      icon: "fa-heartbeat",
      title: "Work-Life Balance",
      description: "Flexible working arrangements, health insurance, and employee wellness programs"
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setMessage(t('careers.formResumeHint'));
      e.target.value = '';
      return;
    }
    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      if (resume) {
        submitData.append('resume', resume);
      }

      const response = await api.submitApplication(submitData);
      if (response.success) {
        setMessage(t('careers.success'));
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          location: '',
          cover_letter: '',
        });
        setResume(null);
        document.getElementById('resume-input').value = '';
      }
    } catch (error) {
      setMessage(t('careers.fail'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center bg-primary-600/20 backdrop-blur-md border border-primary-400/30 px-5 py-2 rounded-full text-sm font-medium mb-6 text-primary-200 animate-fade-in">
              <i className="fas fa-briefcase mr-2"></i>
              {t('careers.heroBadge')}
            </span>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight animate-slide-up">
              {t('careers.heroTitle')}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-secondary-200 leading-relaxed animate-slide-up">
              {t('careers.heroSubtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-scale-in">
              <a 
                href="#openings" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-glow transition-all inline-flex items-center group"
              >
                <i className="fas fa-search mr-2 group-hover:scale-110 transition-transform"></i>
                {t('careers.heroView')}
              </a>
              <a 
                href="#apply" 
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white hover:text-secondary-900 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all inline-flex items-center"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                {t('careers.heroApply')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact HR Banner */}
      <section className="py-6 bg-primary-600 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center">
              <i className="fas fa-phone-alt text-2xl mr-3"></i>
              <div>
                <div className="text-sm text-primary-100">{t('careers.hrContact')}</div>
                <div className="font-bold">+91 709 444 5352 / +91 709 444 5353</div>
              </div>
            </div>
            <div className="hidden md:block h-12 w-px bg-white/30"></div>
            <div className="flex items-center">
              <i className="fas fa-envelope text-2xl mr-3"></i>
              <div>
                <div className="text-sm text-primary-100">{t('careers.hrEmail')}</div>
                <div className="font-bold">hr@susin.in</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              {t('careers.benefitsLabel')}
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              {t('careers.benefitsTitle')}
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              {t('careers.benefitsSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group bg-secondary-50 hover:bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl border-2 border-secondary-100 hover:border-primary-500">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <i className={`fas ${benefit.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture Stats */}
      <section className="py-16 bg-gradient-to-br from-secondary-900 to-secondary-800 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-primary-400 mb-2 group-hover:scale-110 transition-transform">32+</div>
              <div className="text-secondary-300">{t('careers.statsYears')}</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-primary-400 mb-2 group-hover:scale-110 transition-transform">100+</div>
              <div className="text-secondary-300">{t('careers.statsTeam')}</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-primary-400 mb-2 group-hover:scale-110 transition-transform">3</div>
              <div className="text-secondary-300">{t('careers.statsLocations')}</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-primary-400 mb-2 group-hover:scale-110 transition-transform">15K+</div>
              <div className="text-secondary-300">{t('careers.statsProjects')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              {t('careers.openingsLabel')}
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              {t('careers.openingsTitle')}
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              {t('careers.openingsSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openPositions.map((job, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-secondary-100 hover:border-primary-500 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-secondary-500">Job #: {job.jobNum}</p>
                  </div>
                  <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {job.department}
                  </div>
                </div>
                
                <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-secondary-700">
                    <i className="fas fa-briefcase text-primary-600 mr-2 w-4"></i>
                    <span className="font-medium">{job.experience}</span>
                  </div>
                  <div className="flex items-center text-sm text-secondary-700">
                    <i className="fas fa-map-marker-alt text-primary-600 mr-2 w-4"></i>
                    <span>{job.location}</span>
                  </div>
                </div>

                <a 
                  href="#apply" 
                  onClick={() => setFormData({ ...formData, position: job.title })}
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-lg font-semibold transition-all group-hover:shadow-glow"
                >
                  {t('careers.openingsApply')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-6">{t('careers.processTitle')}</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">{t('careers.processSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Submit Application", desc: "Fill out the form with your details and upload your resume", icon: "fa-file-upload" },
              { step: "02", title: "Initial Screening", desc: "Our HR team reviews your application within 2-3 business days", icon: "fa-search" },
              { step: "03", title: "Interview Process", desc: "Technical and HR interviews with department heads", icon: "fa-comments" },
              { step: "04", title: "Onboarding", desc: "Receive offer letter and join our team with comprehensive training", icon: "fa-user-check" }
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <i className={`fas ${process.icon} text-3xl text-white`}></i>
                </div>
                <div className="text-5xl font-bold text-primary-100 mb-2">{process.step}</div>
                <h4 className="text-xl font-bold text-secondary-900 mb-2">{process.title}</h4>
                <p className="text-secondary-600 text-sm">{process.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-primary-200 -ml-4" style={{ width: 'calc(100% - 80px)' }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 bg-gradient-to-br from-secondary-50 to-secondary-100">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              {t('careers.openingsLabel')}
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              {t('careers.formTitle')}
            </h2>
            <p className="text-xl text-secondary-600">
              {t('careers.formSubtitle')}
            </p>
          </div>
          
          {message && (
            <div className={`mb-6 p-4 rounded-xl ${message.includes('success') ? 'bg-green-100 border-2 border-green-400 text-green-700' : 'bg-red-100 border-2 border-red-400 text-red-700'}`}>
              <div className="flex items-center">
                <i className={`fas ${message.includes('success') ? 'fa-check-circle' : 'fa-exclamation-circle'} text-2xl mr-3`}></i>
                <span className="font-semibold">{message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-secondary-900 font-semibold mb-2">
                  {t('careers.formFullName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  placeholder={t('careers.formFullName')}
                  className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all"
                />
              </div>
              <div>
                <label className="block text-secondary-900 font-semibold mb-2">
                  {t('careers.formEmail')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t('careers.formEmail')}
                  className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-secondary-900 font-semibold mb-2">
                  {t('careers.formPhone')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder={t('careers.formPhone')}
                  className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all"
                />
              </div>
              <div>
                <label className="block text-secondary-900 font-semibold mb-2">
                  {t('careers.formExperience')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder={t('careers.formExperience')}
                  className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-secondary-900 font-semibold mb-2">
                  {t('careers.formPosition')} <span className="text-red-500">*</span>
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all"
                >
                  <option value="">{t('careers.formSelectPosition')}</option>
                  {openPositions.map((job, i) => (
                    <option key={i} value={job.title}>{job.title} - {job.jobNum}</option>
                  ))}
                  <option value="other">{t('careers.formOtherPosition')}</option>
                </select>
              </div>
              <div>
                <label className="block text-secondary-900 font-semibold mb-2">
                  {t('careers.formLocation')} <span className="text-red-500">*</span>
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all"
                >
                  <option value="">{t('careers.formSelectLocation')}</option>
                  <option value="Coimbatore, India">Coimbatore, India</option>
                  <option value="Mumbai, India">Mumbai, India</option>
                  <option value="Dubai, UAE">Dubai, UAE</option>
                  <option value="Doha, Qatar">Doha, Qatar</option>
                  <option value="Any Location">{t('careers.formAnyLocation')}</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-secondary-900 font-semibold mb-2">
                {t('careers.formCoverLetter')}
              </label>
              <textarea
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleChange}
                rows="6"
                placeholder={t('careers.formCoverLetter')}
                className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all"
              ></textarea>
            </div>

            <div className="mb-8">
              <label className="block text-secondary-900 font-semibold mb-2">
                {t('careers.formResume')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resume-input"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary-600 file:text-white file:font-semibold hover:file:bg-primary-700 file:cursor-pointer"
                />
              </div>
              <p className="text-sm text-secondary-500 mt-2 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                {t('careers.formResumeHint')}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center group"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-3"></i>
                  {t('careers.submitting')}
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane mr-3 group-hover:translate-x-1 transition-transform"></i>
                  {t('careers.submit')}
                </>
              )}
            </button>

            <p className="text-center text-sm text-secondary-500 mt-6">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
            <h2 className="text-4xl font-heading font-bold mb-6">{t('careers.ctaTitle')}</h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">{t('careers.ctaSubtitle')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:hr@susin.in" 
              className="bg-white text-primary-700 hover:bg-secondary-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all inline-flex items-center"
            >
              <i className="fas fa-envelope mr-2"></i>
                {t('careers.ctaEmail')}
            </a>
            <a 
              href="tel:+917094445352" 
              className="bg-primary-800 hover:bg-primary-900 px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 transition-all inline-flex items-center"
            >
              <i className="fas fa-phone mr-2"></i>
                {t('careers.ctaCall')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
