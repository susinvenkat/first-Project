import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Industries() {
  const { t } = useLanguage();
  const [activeIndustry, setActiveIndustry] = useState(null);

  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const industries = [
    {
      id: 'oil-gas',
      name: 'Oil & Gas',
      icon: 'fa-fire',
      color: 'orange',
      gradient: 'from-orange-600 to-orange-700',
      bgGradient: 'from-orange-50 to-orange-100',
      tagline: 'Critical Flow Control for Energy Infrastructure',
      description: 'Providing mission-critical valve automation solutions for upstream, midstream, and downstream operations in the oil and gas sector for over three decades.',
      applications: [
        'FPSO & Offshore Platforms',
        'Refineries & Petrochemical Plants',
        'Pipeline & Distribution Systems',
        'LNG Terminals & Storage',
        'Gas Processing Facilities',
        'Wellhead & Production',
        'Tanks & Terminals',
        'Loading & Unloading Systems'
      ],
      certifications: ['ATEX', 'IECEx', 'API 609', 'SIL 2/3', 'Fire Safe', 'API 6D'],
      stats: [
        { value: '100+', label: 'FPSO Actuators', icon: 'fa-ship' },
        { value: '50+', label: 'Refineries Served', icon: 'fa-industry' },
        { value: '1000+', label: 'Installations', icon: 'fa-cog' }
      ],
      benefits: [
        'Explosion-proof designs for hazardous areas',
        'High-temperature and high-pressure capabilities',
        'Emergency shutdown (ESD) systems',
        'Remote monitoring and control',
        'Corrosion-resistant materials',
        '24/7 emergency support'
      ]
    },
    {
      id: 'water',
      name: 'Water & Wastewater',
      icon: 'fa-water',
      color: 'blue',
      gradient: 'from-blue-600 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100',
      tagline: 'Sustainable Solutions for Water Management',
      description: 'Advanced automation for water treatment, distribution, and wastewater management facilities ensuring clean water supply and environmental protection.',
      applications: [
        'Potable Water Treatment',
        'Wastewater Treatment Plants',
        'Desalination Facilities',
        'Water Distribution Networks',
        'Irrigation & Flood Control',
        'Filtration & Reverse Osmosis',
        'Sludge Treatment',
        'Storm Water Management'
      ],
      certifications: ['NSF/ANSI 61', 'ISO 9001', 'WRAS', 'CE', 'Drinking Water Approved'],
      stats: [
        { value: '200+', label: 'Treatment Plants', icon: 'fa-building' },
        { value: '150 MLD', label: 'Capacity Automated', icon: 'fa-tint' },
        { value: '99.9%', label: 'Uptime', icon: 'fa-check-circle' }
      ],
      benefits: [
        'Non-toxic, potable water safe materials',
        'Submersible and waterproof designs',
        'Energy-efficient operation',
        'Low maintenance requirements',
        'SCADA integration capabilities',
        'Environmentally friendly solutions'
      ]
    },
    {
      id: 'power',
      name: 'Power Generation',
      icon: 'fa-plug',
      color: 'yellow',
      gradient: 'from-yellow-600 to-yellow-700',
      bgGradient: 'from-yellow-50 to-yellow-100',
      tagline: 'Powering the Future with Reliable Automation',
      description: 'Precision flow control solutions for thermal, nuclear, hydro, and renewable energy power generation facilities worldwide.',
      applications: [
        'Thermal Power Plants',
        'Combined Cycle Plants',
        'Nuclear Power Facilities',
        'Hydroelectric Dams',
        'Solar Thermal Plants',
        'Geothermal Energy',
        'Biomass & Waste-to-Energy',
        'Cogeneration Units'
      ],
      certifications: ['BHEL Approved', 'NTPC Approved', 'ASME', 'IEEE', 'Nuclear Grade'],
      stats: [
        { value: '100+', label: 'Power Plants', icon: 'fa-bolt' },
        { value: '50 GW', label: 'Generation Capacity', icon: 'fa-chart-line' },
        { value: '30+', label: 'Years Experience', icon: 'fa-history' }
      ],
      benefits: [
        'High-cycle life for frequent operation',
        'Steam and high-temperature rated',
        'Fast response time for safety systems',
        'Low fugitive emissions',
        'Nuclear safety qualifications available',
        'Predictive maintenance capabilities'
      ]
    },
    {
      id: 'chemical',
      name: 'Chemical & Petrochemical',
      icon: 'fa-flask',
      color: 'purple',
      gradient: 'from-purple-600 to-purple-700',
      bgGradient: 'from-purple-50 to-purple-100',
      tagline: 'Safe & Reliable Process Control',
      description: 'Specialized valve automation for chemical processing, pharmaceuticals, and specialty chemicals manufacturing with strict safety requirements.',
      applications: [
        'Chemical Processing Plants',
        'Pharmaceutical Manufacturing',
        'Specialty Chemicals',
        'Fertilizer Production',
        'Polymer & Plastics',
        'Industrial Gas Production',
        'Batch Processing',
        'Continuous Processing'
      ],
      certifications: ['ATEX', 'FDA Compliant', 'cGMP', '3A Sanitary', 'EHEDG'],
      stats: [
        { value: '75+', label: 'Chemical Plants', icon: 'fa-vial' },
        { value: 'Zero', label: 'Safety Incidents', icon: 'fa-shield-alt' },
        { value: '100%', label: 'Compliance', icon: 'fa-check-double' }
      ],
      benefits: [
        'Corrosion-resistant construction',
        'Hazardous area classifications',
        'Sanitary and cleanable designs',
        'Chemical compatibility assured',
        'Emergency isolation systems',
        'Process validation support'
      ]
    },
    {
      id: 'marine',
      name: 'Marine & Offshore',
      icon: 'fa-ship',
      color: 'teal',
      gradient: 'from-teal-600 to-teal-700',
      bgGradient: 'from-teal-50 to-teal-100',
      tagline: 'Engineered for Harsh Marine Environments',
      description: 'Rugged valve automation systems designed for marine vessels, offshore platforms, and subsea applications in the harshest environments.',
      applications: [
        'Offshore Oil Platforms',
        'FPSO Vessels',
        'Marine Propulsion Systems',
        'Ballast Water Treatment',
        'Cargo Handling Systems',
        'Subsea Control Systems',
        'Shipbuilding',
        'Port & Terminal Operations'
      ],
      certifications: ['ABS', 'DNV', 'Lloyd\'s Register', 'BV', 'Class NK', 'RINA'],
      stats: [
        { value: '100+', label: 'Vessels & Platforms', icon: 'fa-anchor' },
        { value: '15', label: 'Years at Sea', icon: 'fa-calendar' },
        { value: '100%', label: 'Marine Grade', icon: 'fa-certificate' }
      ],
      benefits: [
        'Saltwater and corrosion resistant',
        'Shock and vibration rated',
        'IP67/IP68 ingress protection',
        'DNV type-approved designs',
        'Compact footprint for space saving',
        'Global service network'
      ]
    },
    {
      id: 'mining',
      name: 'Mining & Minerals',
      icon: 'fa-gem',
      color: 'red',
      gradient: 'from-red-600 to-red-700',
      bgGradient: 'from-red-50 to-red-100',
      tagline: 'Robust Solutions for Extreme Conditions',
      description: 'Heavy-duty valve automation for mineral processing, mining operations, and cement manufacturing in abrasive and demanding conditions.',
      applications: [
        'Mineral Processing',
        'Slurry Handling',
        'Tailings Management',
        'Ore Processing',
        'Cement Manufacturing',
        'Quarrying Operations',
        'Coal Handling',
        'Metal & Steel Production'
      ],
      certifications: ['CMRI Approved', 'MSHA', 'ISO 9001', 'Abrasion Resistant'],
      stats: [
        { value: '50+', label: 'Mining Sites', icon: 'fa-mountain' },
        { value: '24/7', label: 'Continuous Operation', icon: 'fa-clock' },
        { value: '10M+', label: 'Cycles Tested', icon: 'fa-redo' }
      ],
      benefits: [
        'Abrasion and wear resistant',
        'Heavy-duty construction',
        'Dust and particle protection',
        'High torque capabilities',
        'Extended service life',
        'Minimal downtime'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center bg-primary-600/20 backdrop-blur-md border border-primary-400/30 px-5 py-2 rounded-full text-sm font-medium mb-6 text-primary-200 animate-fade-in">
              <i className="fas fa-industry mr-2"></i>
              {t('industries.heroBadge')}
            </span>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight animate-slide-up">
              {t('industries.heroTitle')}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-secondary-200 leading-relaxed animate-slide-up">
              {t('industries.heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Industry Grid Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              {t('industries.gridLabel')}
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              {t('industries.gridTitle')}
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              {t('industries.gridSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <a
                key={index}
                href={`#${industry.id}`}
                onClick={() => setActiveIndustry(industry.id)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-secondary-100 hover:border-primary-500"
              >
                <div className={`h-48 bg-gradient-to-br ${industry.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <i className={`fas ${industry.icon} text-9xl text-white opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300`}></i>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-4">{industry.tagline}</p>
                  <div className="flex items-center text-primary-600 font-semibold group-hover:underline">
                    {t('industries.learnMore')} <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Industry Sections */}
      {industries.map((industry, index) => (
        <section
          key={index}
          id={industry.id}
          className={`py-20 ${index % 2 === 0 ? 'bg-secondary-50' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
              <div className={`grid md:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Content Side */}
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${industry.gradient} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}>
                      <i className={`fas ${industry.icon} text-5xl text-white`}></i>
                    </div>
                    <div>
                      <h2 className="text-4xl font-heading font-bold text-secondary-900">{industry.name}</h2>
                      <p className="text-primary-600 font-semibold mt-1">{industry.tagline}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-secondary-700 mb-6 leading-relaxed">
                    {industry.description}
                  </p>

                  <h4 className="font-bold text-secondary-900 mb-4 text-lg flex items-center">
                    <i className="fas fa-list-check text-primary-600 mr-2"></i>
                    {t('industries.applications')}
                  </h4>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {industry.applications.map((app, i) => (
                      <div key={i} className="flex items-start text-secondary-700">
                        <i className={`fas fa-check-circle text-${industry.color}-600 mr-2 mt-1 flex-shrink-0`}></i>
                        <span className="text-sm">{app}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-bold text-secondary-900 mb-4 text-lg flex items-center">
                    <i className="fas fa-shield-alt text-primary-600 mr-2"></i>
                    {t('industries.benefits')}
                  </h4>
                  <ul className="space-y-2 mb-8">
                    {industry.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-secondary-700">
                        <i className={`fas fa-star text-${industry.color}-600 mr-2 mt-1 flex-shrink-0`}></i>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`bg-gradient-to-br ${industry.bgGradient} rounded-2xl p-6 border-2 border-${industry.color}-200`}>
                    <h4 className="font-bold text-secondary-900 mb-4 flex items-center">
                      <i className="fas fa-certificate text-primary-600 mr-2"></i>
                      {t('industries.certs')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.certifications.map((cert, i) => (
                        <span key={i} className={`bg-white px-4 py-2 rounded-full text-sm font-semibold text-${industry.color}-700 border border-${industry.color}-200 shadow-sm`}>
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats & Visual Side */}
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className={`bg-gradient-to-br ${industry.bgGradient} rounded-2xl p-8 border-2 border-${industry.color}-200`}>
                    <div className="grid grid-cols-1 gap-6">
                      {industry.stats.map((stat, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
                          <i className={`fas ${stat.icon} text-4xl text-${industry.color}-600 mb-3`}></i>
                          <div className={`text-5xl font-bold text-${industry.color}-600 mb-2`}>{stat.value}</div>
                          <div className="text-secondary-700 font-medium">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="font-bold text-secondary-900 mb-4 text-center">Featured Products</h4>
                      {/* products list remains as-is */}
                      <div className="space-y-3">
                        {['Pneumatic Actuators', 'Electrical Actuators', 'Control Accessories'].map((product, i) => (
                          <Link
                            key={i}
                            to="/products"
                            className={`block bg-${industry.color}-50 hover:bg-${industry.color}-100 px-4 py-3 rounded-lg transition-all text-center font-semibold text-secondary-900`}
                          >
                            <i className="fas fa-cog mr-2"></i>
                            {product}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <Link
                        to="/contact#quote"
                        className={`inline-block bg-gradient-to-r ${industry.gradient} hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
                      >
                        <i className="fas fa-envelope mr-2"></i>
                        {t('industries.requestSolution')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Cross-Industry Capabilities */}
      <section className="py-20 bg-gradient-to-br from-secondary-900 to-secondary-800 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold mb-6">{t('industries.crossTitle')}</h2>
              <p className="text-xl text-secondary-200">{t('industries.crossSubtitle')}</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: 'fa-tools', title: t('industries.crossItems.engineering.title'), desc: t('industries.crossItems.engineering.desc') },
                { icon: 'fa-industry', title: t('industries.crossItems.manufacturing.title'), desc: t('industries.crossItems.manufacturing.desc') },
                { icon: 'fa-headset', title: t('industries.crossItems.support.title'), desc: t('industries.crossItems.support.desc') },
                { icon: 'fa-shipping-fast', title: t('industries.crossItems.logistics.title'), desc: t('industries.crossItems.logistics.desc') }
              ].map((capability, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`fas ${capability.icon} text-3xl text-white`}></i>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{capability.title}</h4>
                  <p className="text-secondary-200">{capability.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">{t('industries.ctaTitle')}</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">{t('industries.ctaSubtitle')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-primary-700 hover:bg-secondary-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all inline-flex items-center"
            >
              <i className="fas fa-envelope mr-2"></i>
              {t('industries.ctaContact')}
            </Link>
            <Link 
              to="/products" 
              className="bg-primary-800 hover:bg-primary-900 px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 transition-all inline-flex items-center"
            >
              <i className="fas fa-cogs mr-2"></i>
              {t('industries.ctaExplore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
