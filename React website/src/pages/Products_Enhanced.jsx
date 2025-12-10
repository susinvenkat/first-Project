import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import GradientText from '../components/ui/GradientText';
import Container from '../components/common/Container';
import Button from '../components/ui/Button';
import LazyImage from '../components/common/LazyImage';

export default function Products() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  const pneumaticProducts = [
    {
      series: "PDS Series",
      torque: "10 - 5,425 Nm",
      type: "Double Acting & Spring Return",
      features: [
        "ISO 5211 & NAMUR mounting",
        "Operating pressure: 2.8 - 8 bar",
        "Temperature: -40°C to +80°C",
        "Fail-safe options available",
        "Modular solenoid valve assembly",
        "Hard-anodized aluminum housing"
      ],
      image: "/assets/img/products/pneumatic/PD-actuator.jpg",
      applications: ["Ball Valves", "Butterfly Valves", "Plug Valves"]
    },
    {
      series: "HD Series",
      torque: "200 - 120,867 Nm",
      type: "Heavy Duty Scotch Yoke",
      features: [
        "High torque capacity",
        "Extended service life (>2 million cycles)",
        "Pressure rating up to 10 bar",
        "Extreme temperature capability",
        "Custom configurations available",
        "100+ FPSO installations"
      ],
      image: "/assets/img/products/pneumatic/hd-actuator-main.png",
      applications: ["Large Ball Valves", "Dampers", "Gate Valves"]
    },
    {
      series: "PLDS Series",
      torque: "50 - 15,000 Nm",
      type: "Modular Design",
      features: [
        "Compact footprint",
        "Easy maintenance access",
        "Multiple mounting options",
        "Position feedback ready",
        "Fail-safe configurations",
        "Corrosion-resistant coating"
      ],
      image: "/assets/img/products/pneumatic/hd-series-detail.jpg",
      applications: ["Process Valves", "Control Valves", "Isolation Valves"]
    },
    {
      series: "MPLDS Series",
      torque: "100 - 30,000 Nm",
      type: "Multi-Position",
      features: [
        "Multi-position control",
        "ATEX/IECEx certified",
        "SIL 2/3 capable",
        "Smart positioner ready",
        "Explosion-proof options",
        "Remote monitoring compatible"
      ],
      image: "/assets/img/HD Actuator Image.png",
      applications: ["Critical Safety Valves", "Emergency Shutdown", "Multi-Port Valves"]
    }
  ];

  const gearboxProducts = [
    {
      series: "MAB Series",
      ratio: "Worm Gearbox 10:1 to 120:1",
      features: [
        "Manual override capability",
        "Self-locking design",
        "Weather-proof construction",
        "Torque multiplication",
        "Emergency operation",
        "Low maintenance"
      ],
      image: "/assets/img/products/gearboxes/MAB Series.jpg"
    },
    {
      series: "Bevel Gearbox",
      ratio: "Custom ratios available",
      features: [
        "High efficiency >90%",
        "Bi-directional operation",
        "Compact design",
        "Lubrication for life",
        "Position indicators",
        "Limit switch compatible"
      ],
      image: "/assets/img/products/gearboxes/bevel-gearbox.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-secondary-900">
      {/* Hero Section with Gradient */}
      <section className="relative py-24 bg-gradient-to-br from-secondary-900 via-primary-900 to-secondary-800 text-white overflow-hidden rounded-b-[32px] shadow-2xl shadow-primary-200/40">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-5"></div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" size="lg" icon="fas fa-certificate" className="mb-6 animate-fade-in">
              {t('products.heroBadge')}
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              <GradientText from="from-primary-400" via="via-purple-400" to="to-cyan-400" animate={true}>
                {t('products.heroTitle')}
              </GradientText>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-slate-300 leading-relaxed">
              {t('products.heroSubtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Card variant="dark" className="bg-slate-800/50 backdrop-blur px-6 py-4 border-slate-700">
                <div className="text-3xl font-bold text-primary-400">10 - 120,867 Nm</div>
                <div className="text-sm text-slate-400">{t('products.statsTorque')}</div>
              </Card>
              <Card variant="dark" className="bg-slate-800/50 backdrop-blur px-6 py-4 border-slate-700">
                <div className="text-3xl font-bold text-primary-400">32+ Years</div>
                <div className="text-sm text-slate-400">{t('products.statsExperience')}</div>
              </Card>
              <Card variant="dark" className="bg-slate-800/50 backdrop-blur px-6 py-4 border-slate-700">
                <div className="text-3xl font-bold text-primary-400">100+</div>
                <div className="text-sm text-slate-400">{t('products.statsIndustries')}</div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b-2 border-secondary-100 sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'pneumatic', icon: 'fa-wind', label: t('products.quickNav.pneumatic') },
              { id: 'electro-hydraulic', icon: 'fa-tint', label: t('products.quickNav.electroHydraulic') },
              { id: 'electrical', icon: 'fa-bolt', label: t('products.quickNav.electrical') },
              { id: 'gearboxes', icon: 'fa-cogs', label: t('products.quickNav.gearboxes') }
            ].map((item, index) => (
              <a
                key={index}
                href={`#${item.id}`}
                className="flex items-center bg-secondary-50 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 group border-2 border-secondary-200 hover:border-primary-600"
              >
                <i className={`fas ${item.icon} mr-2 group-hover:scale-110 transition-transform`}></i>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pneumatic Actuators Section */}
      <section id="pneumatic" className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              {t('products.pneumaticLabel')}
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              {t('products.pneumaticTitle')}
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
              {t('products.pneumaticSubtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                <i className="fas fa-arrows-alt-h text-blue-600 mr-2"></i>
                <span className="font-semibold">{t('products.torqueLabel')}</span>
              </div>
              <div className="flex items-center bg-orange-50 px-4 py-2 rounded-lg">
                <i className="fas fa-temperature-low text-orange-600 mr-2"></i>
                <span className="font-semibold">{t('products.tempLabel')}</span>
              </div>
              <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
                <i className="fas fa-shield-alt text-green-600 mr-2"></i>
                <span className="font-semibold">{t('products.certsLabel')}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pneumaticProducts.map((product, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-secondary-100 hover:border-primary-500">
                <div className="h-56 overflow-hidden bg-gradient-to-br from-secondary-50 to-secondary-100 relative">
                  <LazyImage 
                    src={product.image} 
                    alt={product.series}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                  />
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.series}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.series}
                  </h3>
                  <p className="text-primary-600 font-bold text-lg mb-1">{product.torque}</p>
                  <p className="text-secondary-600 text-sm mb-4">{product.type}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-secondary-800 mb-2 text-sm">{t('products.keyFeatures')}</h4>
                    <ul className="space-y-2">
                      {product.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-secondary-700">
                          <i className="fas fa-check-circle text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 pt-4 border-t border-secondary-100">
                    <h4 className="font-semibold text-secondary-800 mb-2 text-sm">{t('products.applications')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app, i) => (
                        <span key={i} className="bg-secondary-100 text-secondary-700 text-xs px-2 py-1 rounded-full">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link 
                    to="/contact#quote" 
                    className="mt-4 inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 group-hover:translate-x-2 transition-transform"
                  >
                    {t('products.requestQuote')} 
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Specifications CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">{t('products.techTitle')}</h3>
            <p className="mb-6 text-primary-100">{t('products.techSubtitle')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact#quote" className="bg-white text-primary-700 hover:bg-secondary-50 px-8 py-3 rounded-xl font-bold inline-flex items-center transition-all">
                <i className="fas fa-download mr-2"></i>
                {t('products.techDownload')}
              </Link>
              <Link to="/contact" className="bg-primary-800 hover:bg-primary-900 px-8 py-3 rounded-xl font-bold inline-flex items-center transition-all border-2 border-white/20">
                <i className="fas fa-phone mr-2"></i>
                {t('products.techSpeak')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Electro-Hydraulic Section */}
      <section id="electro-hydraulic" className="py-24 bg-gradient-to-br from-secondary-50 to-secondary-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              {t('products.ehLabel')}
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              {t('products.ehTitle')}
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              {t('products.ehSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-3xl font-bold text-secondary-900 mb-6">Quarter-Turn Electro-Hydraulic</h3>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary-600 mb-2">Up to 500,000 Nm</div>
                  <div className="text-secondary-600">Maximum Torque Output</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Self-contained hydraulic power unit",
                    "Precision position control ±1°",
                    "Emergency backup power options",
                    "Suitable for extreme environments",
                    "Low power consumption",
                    "Remote monitoring & diagnostics",
                    "Explosion-proof configurations",
                    "Fail-safe/fail-last options"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start text-secondary-700">
                      <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-bold text-secondary-900 mb-3">Ideal Applications:</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><i className="fas fa-industry text-blue-600 mr-2"></i>Pipeline Valves</div>
                    <div><i className="fas fa-fire text-blue-600 mr-2"></i>Emergency Shutdown</div>
                    <div><i className="fas fa-ship text-blue-600 mr-2"></i>Offshore Platforms</div>
                    <div><i className="fas fa-tint text-blue-600 mr-2"></i>Subsea Systems</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl opacity-20 blur-xl"></div>
                <LazyImage 
                  src="/assets/img/products/electro-hydraulic/actuator.jpg" 
                  alt="Electro-Hydraulic Actuator"
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Electrical Actuators */}
      <section id="electrical" className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              {t('products.electricalLabel')}
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              {t('products.electricalTitle')}
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              {t('products.electricalSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quarter-Turn Electric",
                range: "Up to 4,000 Nm",
                icon: "fa-sync",
                features: [
                  "0-90° rotation in 15-120 seconds",
                  "Modbus RTU/TCP communication",
                  "Built-in web server",
                  "Self-diagnostic system",
                  "Multi-voltage: 110-480V AC",
                  "IP67/68 enclosure rating"
                ]
              },
              {
                title: "Multi-Turn Electric",
                range: "Linear & Rotary",
                icon: "fa-redo",
                features: [
                  "Precision positioning ±0.5%",
                  "Thrust output up to 250 kN",
                  "Anti-condensation heater",
                  "Manual override",
                  "4-20mA analog control",
                  "HART protocol support"
                ]
              },
              {
                title: "Smart Positioner",
                range: "Digital Control",
                icon: "fa-microchip",
                features: [
                  "Auto-calibration function",
                  "Predictive maintenance alerts",
                  "Data logging & trending",
                  "Wireless connectivity",
                  "Cloud integration ready",
                  "Mobile app control"
                ]
              }
            ].map((product, index) => (
              <div key={index} className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center mb-6">
                  <i className={`fas ${product.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">{product.title}</h3>
                <p className="text-primary-600 font-semibold mb-6">{product.range}</p>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-secondary-700">
                      <i className="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gearboxes Section */}
      <section id="gearboxes" className="py-24 bg-secondary-900 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-400 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-400 mr-3"></div>
              {t('products.gearLabel')}
              <div className="h-1 w-12 bg-primary-400 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              {t('products.gearTitle')}
            </h2>
            <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
              {t('products.gearSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {gearboxProducts.map((product, index) => (
              <div key={index} className="bg-secondary-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-glow transition-all">
                <div className="h-64 bg-secondary-700">
                  <LazyImage 
                    src={product.image} 
                    alt={product.series}
                    className="w-full h-full object-contain p-6"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-2">{product.series}</h3>
                  <p className="text-primary-400 font-semibold mb-6">{product.ratio}</p>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-secondary-200">
                        <i className="fas fa-check-circle text-primary-400 mr-3 mt-1"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              to="/contact#quote" 
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-glow transition-all"
            >
              <i className="fas fa-calculator mr-3"></i>
              {t('products.gearCta')}
              <i className="fas fa-arrow-right ml-3"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              {t('products.needHelpTitle')}
            </h2>
            <p className="text-xl mb-10 text-primary-100">
              {t('products.needHelpSubtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact#quote" className="bg-white text-primary-700 hover:bg-secondary-50 px-10 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all inline-flex items-center">
                <i className="fas fa-file-invoice mr-3"></i>
                {t('products.needHelpRequest')}
              </Link>
              <Link to="/contact" className="bg-primary-800 hover:bg-primary-900 px-10 py-4 rounded-xl font-bold text-lg border-2 border-white/30 transition-all inline-flex items-center">
                <i className="fas fa-headset mr-3"></i>
                {t('products.needHelpTalk')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
