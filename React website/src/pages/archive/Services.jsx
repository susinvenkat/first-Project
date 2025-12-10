import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      id: 'installation',
      icon: 'fa-wrench',
      title: 'Installation & Commissioning',
      description: 'Professional installation and commissioning services ensuring optimal performance from day one',
      features: [
        'On-site installation by certified technicians',
        'System integration and testing',
        'Performance verification',
        'Documentation and handover',
        'Post-installation support'
      ],
      image: '/assets/img/services/installation.jpg'
    },
    {
      id: 'mro',
      icon: 'fa-tools',
      title: 'Maintenance, Repair & Operations',
      description: 'Comprehensive MRO services to maximize uptime and extend equipment lifecycle',
      features: [
        'Preventive maintenance programs',
        'Emergency repair services 24/7',
        'Spare parts management',
        'Performance diagnostics',
        'Equipment refurbishment'
      ],
      image: '/assets/img/services/mro.jpg'
    },
    {
      id: 'vac',
      icon: 'fa-cogs',
      title: 'Valve Automation Center (VAC)',
      description: 'Complete valve automation solutions from design to implementation',
      features: [
        'Custom valve automation packages',
        'Integration with control systems',
        'Factory assembly and testing',
        'Reduced installation time',
        'Single-source responsibility'
      ],
      image: '/assets/img/services/vac.jpg'
    },
    {
      id: 'training',
      icon: 'fa-graduation-cap',
      title: 'Technical Training',
      description: 'Hands-on training programs to enhance your team\'s capabilities',
      features: [
        'Product-specific training courses',
        'Maintenance and troubleshooting',
        'Control system integration',
        'On-site or facility-based training',
        'Certification programs available'
      ],
      image: '/assets/img/services/training.jpg'
    },
    {
      id: 'modernization',
      icon: 'fa-sync-alt',
      title: 'Retrofit & Modernization',
      description: 'Upgrade legacy systems with modern technology for improved performance',
      features: [
        'Control system upgrades',
        'Smart actuator integration',
        'Energy efficiency improvements',
        'Asset life extension',
        'Minimal downtime solutions'
      ],
      image: '/assets/img/services/modernization.jpg'
    },
    {
      id: 'support',
      icon: 'fa-headset',
      title: 'Technical Support',
      description: 'Expert technical support available whenever you need assistance',
      features: [
        '24/7 technical hotline',
        'Remote diagnostics and monitoring',
        'Engineering consultation',
        'Application assistance',
        'Troubleshooting guidance'
      ],
      image: '/assets/img/services/support.jpg'
    }
  ];

  const serviceStats = [
    { value: '24/7', label: 'Support Available', icon: 'fa-clock' },
    { value: '500+', label: 'Service Technicians', icon: 'fa-users' },
    { value: '3', label: 'Service Centers', icon: 'fa-map-marker-alt' },
    { value: '99%', label: 'Customer Satisfaction', icon: 'fa-smile' }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center bg-primary-600/20 backdrop-blur-md border border-primary-400/30 px-5 py-2 rounded-full text-sm font-medium mb-6 text-primary-200 animate-fade-in">
              <i className="fas fa-tools mr-2"></i>
              Aftermarket Excellence
            </span>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight animate-slide-up">
              Services & Support
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-secondary-200 leading-relaxed animate-slide-up">
              Comprehensive aftermarket services to optimize performance, reduce downtime, and extend the life of your flow control equipment
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {serviceStats.map((stat, index) => (
              <div key={index} className="group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <i className={`fas ${stat.icon} text-3xl text-white`}></i>
                </div>
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-secondary-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              OUR SERVICES
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              Complete Lifecycle Support
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              From installation to modernization, we're with you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} id={service.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-secondary-100 hover:border-primary-500 group">
                <div className="h-48 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                  <i className={`fas ${service.icon} text-8xl text-white opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300`}></i>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center mr-4">
                      <i className={`fas ${service.icon} text-xl text-white`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-secondary-700">
                        <i className="fas fa-check text-primary-600 mr-2 mt-1"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/contact#quote"
                    className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-center py-3 rounded-lg font-semibold transition-all group-hover:shadow-glow"
                  >
                    Request Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty & Service Plans */}
      <section id="warranty" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-6">
                Warranty & Service Plans
              </h2>
              <p className="text-xl text-secondary-600">
                Comprehensive coverage options to protect your investment
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-secondary-50 rounded-2xl p-8 border-2 border-secondary-200 hover:border-primary-500 transition-all">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-shield-alt text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2">Standard Warranty</h3>
                  <p className="text-secondary-600">Included with purchase</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-secondary-700">
                    <i className="fas fa-check text-primary-600 mr-2 mt-1"></i>
                    <span>12-18 months coverage</span>
                  </li>
                  <li className="flex items-start text-secondary-700">
                    <i className="fas fa-check text-primary-600 mr-2 mt-1"></i>
                    <span>Manufacturing defects</span>
                  </li>
                  <li className="flex items-start text-secondary-700">
                    <i className="fas fa-check text-primary-600 mr-2 mt-1"></i>
                    <span>Parts replacement</span>
                  </li>
                  <li className="flex items-start text-secondary-700">
                    <i className="fas fa-check text-primary-600 mr-2 mt-1"></i>
                    <span>Technical support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white transform scale-105 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-crown text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Extended Plan</h3>
                  <p className="text-primary-100">Most Popular</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className="fas fa-check text-white mr-2 mt-1"></i>
                    <span>Up to 5 years coverage</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-white mr-2 mt-1"></i>
                    <span>Priority service response</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-white mr-2 mt-1"></i>
                    <span>Preventive maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-white mr-2 mt-1"></i>
                    <span>Annual inspections</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-white mr-2 mt-1"></i>
                    <span>Remote monitoring</span>
                  </li>
                </ul>
                <Link 
                  to="/contact"
                  className="block w-full bg-white text-primary-700 text-center py-3 rounded-lg font-bold hover:bg-secondary-50 transition-all"
                >
                  Contact Sales
                </Link>
              </div>

              <div className="bg-secondary-50 rounded-2xl p-8 border-2 border-secondary-200 hover:border-primary-500 transition-all">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-star text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2">Premium Care</h3>
                  <p className="text-secondary-600">Ultimate protection</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-secondary-700">
                    <i className="fas fa-check text-primary-600 mr-2 mt-1"></i>
                    <span>Lifetime coverage options</span>
                  </li>
                  <li className="flex items-start text-secondary-700">
                    <i className="fas fa-check text-primary-600 mr-2 mt-1"></i>
                    <span>24/7 emergency support</span>
                  </li>
                  <li className="flex items-start text-secondary-700">
                    <i className="fas fa-check text-primary-600 mr-2 mt-1"></i>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start text-secondary-700">
                    <i className="fas fa-check text-primary-600 mr-2 mt-1"></i>
                    <span>Customized maintenance plan</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Need Service Support?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Our expert service team is ready to help with installation, maintenance, or technical support
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-primary-700 hover:bg-secondary-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all inline-flex items-center"
            >
              <i className="fas fa-envelope mr-2"></i>
              Contact Service Team
            </Link>
            <a 
              href="tel:+917708097242" 
              className="bg-primary-800 hover:bg-primary-900 px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 transition-all inline-flex items-center"
            >
              <i className="fas fa-phone mr-2"></i>
              Call: +91 77080 97242
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
