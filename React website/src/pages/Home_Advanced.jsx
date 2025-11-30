import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

export default function HomeAdvanced() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // SEO Structured Data
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SUSIN iTORK",
    "url": "https://susiniTORK.com",
    "logo": "/assets/img/logo.png",
    "description": "Leading manufacturer of industrial actuators and valve automation solutions",
    "foundingDate": "1992",
    "address": [
      {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressLocality": "Mumbai"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "telephone": "+91-22-XXXX-XXXX",
      "email": "sales@susitork.com"
    }
  };

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      // Scroll handler for future parallax effects
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slides configuration (kept for future carousel implementation)
  // const slides = [...]

  const features = [
    {
      icon: "fa-bolt",
      title: "Ultra-Fast Response",
      description: "Millisecond-level actuation with zero latency",
      color: "from-yellow-400 to-orange-600"
    },
    {
      icon: "fa-shield",
      title: "Military-Grade",
      description: "ATEX & API certified for extreme conditions",
      color: "from-red-400 to-pink-600"
    },
    {
      icon: "fa-brain",
      title: "AI-Powered",
      description: "Intelligent predictive maintenance algorithms",
      color: "from-purple-400 to-indigo-600"
    },
    {
      icon: "fa-globe",
      title: "Global Network",
      description: "24/7 support across 3 continents",
      color: "from-blue-400 to-cyan-600"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Offshore Drilling Inc",
      rating: 5,
      text: "Outstanding reliability. Their systems have reduced our downtime by 40%."
    },
    {
      name: "Ahmed Al-Mansouri",
      company: "Gulf Energy Corp",
      rating: 5,
      text: "Best actuators in the market. Technical support is exceptional."
    },
    {
      name: "Hans Mueller",
      company: "European Power Systems",
      rating: 5,
      text: "32 years of proven excellence. We trust them completely."
    }
  ];

  const caseStudies = [
    {
      title: "FPSO Platform Automation",
      industry: "Oil & Gas",
      result: "99.8% Uptime",
      icon: "fa-ship"
    },
    {
      title: "Power Plant Valve Control",
      industry: "Energy",
      result: "50% Cost Reduction",
      icon: "fa-plug"
    },
    {
      title: "Water Treatment Excellence",
      industry: "Environmental",
      result: "100K+ Gallons/Day",
      icon: "fa-water"
    }
  ];

  return (
    <>
      <SEO
        title="Industrial Actuators & Valve Automation - SUSIN iTORK"
        description="Advanced valve automation solutions. 32+ years of excellence. ISO 9001:2015 & ATEX certified. Serving 100+ industries worldwide."
        keywords="industrial actuators, pneumatic, electro-hydraulic, electrical, valve automation, FPSO, oil & gas"
        image="/assets/img/products/pneumatic/hd-actuator-main.png"
        structuredData={homeStructuredData}
      />

      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        
        {/* HERO SECTION - Advanced Parallax */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-primary-600/20 rounded-full blur-3xl -top-40 -left-40 animate-float"></div>
            <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -bottom-40 -right-40 animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl top-1/2 left-1/2 animate-float" style={{animationDelay: '4s'}}></div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 lg:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-primary-600/20 backdrop-blur border border-primary-500/30 rounded-full px-6 py-2">
                  <span className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-primary-300">Industry 4.0 Ready</span>
                </div>

                <h1 className="text-7xl lg:text-8xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Next-Gen
                  </span>
                  <br />
                  Valve Automation
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                  Revolutionary actuator technology powering critical infrastructure across 100+ industries. Precision. Reliability. Innovation.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <Link 
                    to="/products" 
                    className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full font-bold text-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center gap-2">
                      Explore Products
                      <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                    </span>
                  </Link>

                  <Link 
                    to="/contact" 
                    className="group px-8 py-4 border-2 border-slate-400 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                  >
                    Get Consultation
                    <i className="fas fa-phone ml-2 group-hover:scale-110 transition-transform inline-block"></i>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-12 border-t border-slate-700">
                  <div>
                    <div className="text-4xl font-bold text-primary-400">32+</div>
                    <div className="text-sm text-slate-400">Years Proven</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-400">100+</div>
                    <div className="text-sm text-slate-400">Industries</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-cyan-400">99.8%</div>
                    <div className="text-sm text-slate-400">Uptime</div>
                  </div>
                </div>
              </div>

              {/* Right - Hero Image with Glow */}
              <div className="relative h-[600px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 to-blue-600/30 rounded-3xl blur-2xl"></div>
                <div 
                  className="relative w-full h-full rounded-3xl overflow-hidden border border-primary-500/30 backdrop-blur-xl"
                  style={{
                    transform: `perspective(1000px) rotateY(${(mousePos.x - window.innerWidth / 2) * 0.02}deg) rotateX(${-(mousePos.y - window.innerHeight / 2) * 0.02}deg)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <img 
                    src="/assets/img/products/pneumatic/hd-actuator-main.png" 
                    alt="Advanced Actuator Technology"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm text-slate-400">Scroll to explore</span>
              <i className="fas fa-chevron-down text-primary-400 text-2xl"></i>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                Why Choose <span className="bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">SUSIN iTORK</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Four decades of excellence delivered through cutting-edge technology and uncompromising quality
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="group relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${feature.icon} text-2xl text-white`}></i>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS SHOWCASE */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 className="text-5xl lg:text-6xl font-bold mb-20 text-center">
              Complete Product <span className="bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">Portfolio</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Pneumatic", range: "10 - 120K Nm", icon: "fa-wind", color: "from-blue-500 to-cyan-600" },
                { title: "Electro-Hydraulic", range: "Up to 500K Nm", icon: "fa-tint", color: "from-purple-500 to-pink-600" },
                { title: "Electrical", range: "IoT Enabled", icon: "fa-bolt", color: "from-yellow-500 to-orange-600" },
                { title: "Gearboxes", range: "10:1 to 120:1", icon: "fa-cogs", color: "from-green-500 to-emerald-600" }
              ].map((prod, idx) => (
                <Link 
                  key={idx}
                  to="/products"
                  className="group relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`h-40 bg-gradient-to-br ${prod.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-500">
                      <i className={`fas ${prod.icon} text-6xl text-white/20 absolute -right-10 -bottom-10`}></i>
                    </div>
                    <i className={`fas ${prod.icon} text-5xl text-white relative z-10`}></i>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-primary-400 font-semibold mb-4">{prod.range}</p>
                    <div className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors">
                      Explore
                      <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 className="text-5xl lg:text-6xl font-bold mb-20 text-center">
              Trusted by Industry <span className="bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">Leaders</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((test, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-primary-500/50 transition-all"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-primary-400"></i>
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 text-lg leading-relaxed">"{test.text}"</p>
                  <div className="border-t border-slate-700 pt-4">
                    <p className="font-bold text-primary-400">{test.name}</p>
                    <p className="text-slate-400 text-sm">{test.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 className="text-5xl lg:text-6xl font-bold mb-20 text-center">
              Success <span className="bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">Stories</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.map((study, idx) => (
                <div 
                  key={idx}
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 hover:border-primary-500/50 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 to-blue-600/0 group-hover:from-primary-600/10 group-hover:to-blue-600/10 transition-all"></div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-primary-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/30 transition-all">
                      <i className={`fas ${study.icon} text-3xl text-primary-400`}></i>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                    <p className="text-slate-400 mb-4">{study.industry}</p>
                    <div className="text-4xl font-bold text-primary-400 group-hover:text-primary-300 transition-colors">
                      {study.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 rounded-3xl p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl -top-40 -left-40"></div>
                <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl -bottom-40 -right-40"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Operations?</h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Join hundreds of industry leaders who trust SUSIN iTORK for their mission-critical applications
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                  <Link 
                    to="/contact"
                    className="px-10 py-4 bg-white text-primary-600 font-bold rounded-full hover:bg-slate-100 transition-all inline-flex items-center gap-2 group"
                  >
                    Schedule Demo
                    <i className="fas fa-calendar group-hover:scale-110 transition-transform"></i>
                  </Link>
                  <Link 
                    to="/products"
                    className="px-10 py-4 bg-white/20 backdrop-blur text-white font-bold rounded-full border border-white/30 hover:bg-white/30 transition-all inline-flex items-center gap-2 group"
                  >
                    View Catalog
                    <i className="fas fa-book group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="py-16 border-t border-slate-700">
          <div className="container mx-auto px-4 lg:px-6 text-center">
            <h3 className="text-3xl font-bold mb-4">Questions? Let's Talk</h3>
            <p className="text-slate-400 mb-8">Available 24/7 for technical support and consultation</p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 rounded-full font-bold transition-all group"
            >
              <i className="fas fa-phone"></i>
              Contact Us Now
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
