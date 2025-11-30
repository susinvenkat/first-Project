import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);
  
  const [stats, setStats] = useState([
    { value: 0, target: 100, label: 'Industries', icon: 'fa-industry', suffix: '+' },
    { value: 0, target: 32, label: 'Years', icon: 'fa-award', suffix: '+' },
    { value: 0, target: 3, label: 'Global', icon: 'fa-globe', suffix: '' },
    { value: 0, target: 15000, label: 'Projects', icon: 'fa-check-circle', suffix: '+' },
  ]);

  // SEO Structured Data for HomePage
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Industrial Actuators & Valve Automation Solutions",
    "description": "Complete range of pneumatic, electro-hydraulic, and electrical actuators for industrial valve automation. Torque range from 10 Nm to 500,000 Nm.",
    "brand": {
      "@type": "Brand",
      "name": "SUSIN iTORK"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "SUSIN iTORK",
      "url": "https://susiniTORK.com"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const slides = [
    {
      title: "HD Series Pneumatic Actuators",
      subtitle: "High-Performance Spring Return Solutions",
      features: ["Torque up to 120,867 Nm", "ISO 5211 Mounting", "Fail-Safe Design"],
      image: "/assets/img/products/pneumatic/hd-actuator-main.png",
      cta: "Explore Pneumatic",
      link: "/products#pneumatic"
    },
    {
      title: "PD Series Pneumatic Actuators",
      subtitle: "Compact Double-Acting Performance",
      features: ["Space-Saving Design", "Low Air Consumption", "High Efficiency"],
      image: "/assets/img/products/pneumatic/PD-actuator.jpg",
      cta: "View Specifications",
      link: "/products#pneumatic"
    },
    {
      title: "Heavy Duty Actuator Range",
      subtitle: "Industry-Leading Torque Capacity",
      features: ["10 Nm to 120,867 Nm", "All Valve Types", "32+ Years Proven"],
      image: "/assets/img/HD Actuator Image.png",
      cta: "Request Catalog",
      link: "/contact#quote"
    },
    {
      title: "Manual Gearbox Solutions",
      subtitle: "Precision Manual Override Systems",
      features: ["Emergency Override", "Torque Multiplication", "Robust Design"],
      image: "/assets/img/products/gearboxes/MAB Series.jpg",
      cta: "Explore Gearboxes",
      link: "/products#gearboxes"
    },
    {
      title: "Complete Valve Automation",
      subtitle: "Trusted by 100+ Power & Oil Industries",
      features: ["ISO 9001:2015", "Global Presence", "24/7 Support"],
      image: "/assets/img/heroes/hero-large.jpg",
      cta: "About Us",
      link: "/about"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate stats when section comes into view
            setStats(prev => prev.map((stat, index) => {
              const duration = 2000;
              const steps = 60;
              const increment = stat.target / steps;
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                  current = stat.target;
                  clearInterval(timer);
                }
                setStats(prevStats => {
                  const newStats = [...prevStats];
                  newStats[index] = { ...newStats[index], value: Math.floor(current) };
                  return newStats;
                });
              }, duration / steps);

              return stat;
            }));
            observer.disconnect(); // Only animate once
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []); // Run once on mount

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const products = [
    { 
      title: "Pneumatic Actuators", 
      icon: "fa-wind", 
      range: "10 - 120,867 Nm",
      description: "Scotch yoke actuators for quarter-turn applications",
      link: "/products#pneumatic",
      color: "from-blue-500 to-blue-700"
    },
    { 
      title: "Electro-Hydraulic", 
      icon: "fa-tint", 
      range: "Up to 500,000 Nm",
      description: "High torque output with precision control",
      link: "/products#electro-hydraulic",
      color: "from-purple-500 to-purple-700"
    },
    { 
      title: "Electrical Actuators", 
      icon: "fa-bolt", 
      range: "IoT Enabled",
      description: "Smart automation with remote monitoring",
      link: "/products#electrical",
      color: "from-yellow-500 to-orange-600"
    },
    { 
      title: "Gearboxes", 
      icon: "fa-cogs", 
      range: "10:1 to 120:1",
      description: "Precision engineered motion control systems",
      link: "/products#gearboxes",
      color: "from-gray-600 to-gray-800"
    }
  ];

  const industries = [
    { name: "Oil & Gas", icon: "fa-fire", link: "/industries#oil-gas", projects: "500+" },
    { name: "Power Generation", icon: "fa-plug", link: "/industries#power", projects: "300+" },
    { name: "Water Treatment", icon: "fa-water", link: "/industries#water", projects: "400+" },
    { name: "Chemical", icon: "fa-flask", link: "/industries#chemical", projects: "250+" },
    { name: "Marine & Offshore", icon: "fa-ship", link: "/industries#marine", projects: "150+" },
    { name: "Pharmaceutical", icon: "fa-prescription-bottle", link: "/industries#pharmaceutical", projects: "200+" }
  ];

  return (
    <>
      {/* SEO Component */}
      <SEO
        title="Industrial Actuators & Valve Automation Solutions"
        description="Leading manufacturer of pneumatic, electro-hydraulic, and electrical actuators. ISO 9001:2015 certified. Serving 100+ industries worldwide. Torque: 10 Nm to 500,000 Nm. 32+ years excellence."
        keywords="industrial actuators, pneumatic actuators, scotch yoke actuators, electro-hydraulic actuators, electrical actuators, valve automation, quarter-turn actuators, FPSO actuators, oil and gas actuators, power generation, marine offshore, ISO 9001, ATEX certified, API 609, India, UAE, Qatar"
        image="/assets/img/products/pneumatic/hd-actuator-main.png"
        structuredData={homeStructuredData}
      />
      
      <div className="min-h-screen bg-secondary-50">
        {/* Hero Slider - Modern Full Screen */}
        <section className="relative h-[700px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[10000ms]"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/95 via-secondary-900/80 to-secondary-900/40"></div>
            </div>
            <div className="relative container mx-auto px-4 lg:px-6 h-full flex items-center">
              <div className="max-w-3xl animate-fade-in">
                <span className="inline-flex items-center bg-primary-600/20 backdrop-blur-md border border-primary-400/30 px-5 py-2 rounded-full text-sm font-medium mb-6 text-primary-200">
                  <i className="fas fa-certificate mr-2"></i>
                  ISO 9001:2015 Certified Solutions
                </span>
                <h1 className="text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight text-white animate-slide-up">
                  {slide.title}
                </h1>
                <p className="text-2xl mb-8 text-secondary-200 animate-slide-up">{slide.subtitle}</p>
                <div className="flex flex-wrap gap-4 mb-10 animate-slide-up">
                  {slide.features.map((feature, i) => (
                    <span key={i} className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all group">
                      <i className="fas fa-check-circle text-primary-400 mr-2 group-hover:scale-110 transition-transform inline-block"></i>
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 animate-scale-in">
                  <Link 
                    to={slide.link} 
                    className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-glow-lg hover:shadow-glow transition-all duration-300 inline-flex items-center group"
                  >
                    <i className="fas fa-rocket mr-3 group-hover:translate-x-1 transition-transform"></i>
                    {slide.cta}
                    <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                  <Link 
                    to="/contact" 
                    className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white hover:text-secondary-900 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 inline-flex items-center group"
                  >
                    <i className="fas fa-envelope mr-3 group-hover:scale-110 transition-transform"></i>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-10 left-0 right-0 container mx-auto px-4 lg:px-6 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={prevSlide}
              className="h-14 w-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all group border border-white/20"
            >
              <i className="fas fa-chevron-left text-white group-hover:scale-125 transition-transform"></i>
            </button>

            <div className="flex items-center space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-12 h-3 bg-primary-500 rounded-full' 
                      : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full'
                  }`}
                />
              ))}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="ml-4 h-10 w-10 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all border border-white/20"
              >
                <i className={`fas fa-${isPlaying ? 'pause' : 'play'} text-white text-sm`}></i>
              </button>
            </div>

            <button
              onClick={nextSlide}
              className="h-14 w-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all group border border-white/20"
            >
              <i className="fas fa-chevron-right text-white group-hover:scale-125 transition-transform"></i>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
          <div className="flex flex-col items-center text-white">
            <i className="fas fa-chevron-down text-2xl mb-2 opacity-70"></i>
            <span className="text-sm opacity-70">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-20 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 inline-block">
                  <div className="h-20 w-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-glow">
                    <i className={`fas ${stat.icon} text-3xl text-white`}></i>
                  </div>
                </div>
                <div className="text-5xl lg:text-6xl font-heading font-bold text-white mb-2">
                  {stat.value.toLocaleString()}+
                </div>
                <div className="text-secondary-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <span className="text-primary-600 font-semibold text-lg flex items-center mb-4">
                <div className="h-1 w-12 bg-primary-600 mr-3"></div>
                SINCE 1992
              </span>
              <h2 className="text-5xl font-heading font-bold text-secondary-900 mb-6">
                Pioneering Valve Automation Excellence
              </h2>
              <p className="text-lg text-secondary-700 leading-relaxed">
                Susin Group has been at the forefront of industrial actuator manufacturing for over three decades. Our commitment to innovation, quality, and customer satisfaction has made us a trusted partner for industries worldwide.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start group">
                  <div className="h-12 w-12 bg-primary-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary-100 transition-all">
                    <i className="fas fa-award text-2xl text-primary-600"></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-secondary-900 mb-1">ISO 9001:2015 Certified</h4>
                    <p className="text-secondary-600">Committed to world-class quality standards</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="h-12 w-12 bg-primary-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary-100 transition-all">
                    <i className="fas fa-globe text-2xl text-primary-600"></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-secondary-900 mb-1">Global Presence</h4>
                    <p className="text-secondary-600">Serving clients across India, UAE, and Qatar</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="h-12 w-12 bg-primary-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary-100 transition-all">
                    <i className="fas fa-headset text-2xl text-primary-600"></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-secondary-900 mb-1">24/7 Support</h4>
                    <p className="text-secondary-600">Round-the-clock technical assistance</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-glow transition-all group">
                <span>Learn More About Us</span>
                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/assets/img/products/pneumatic/hd-actuator-main.png" 
                  alt="SUSIN iTORK Actuators" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                    <i className="fas fa-industry text-2xl text-white"></i>
                  </div>
                  <div>
                    <div className="text-3xl font-heading font-bold text-secondary-900">32+</div>
                    <div className="text-secondary-600 font-medium">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-secondary-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              OUR PRODUCTS
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-5xl font-heading font-bold text-secondary-900 mb-6">
              Comprehensive Automation Solutions
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              From pneumatic to electrical systems, we offer the complete spectrum of valve automation technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Link 
                key={index} 
                to={product.link}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`h-48 bg-gradient-to-br ${product.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                  <i className={`fas ${product.icon} text-8xl text-white/90 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}></i>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-medium">
                    {product.range}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-secondary-600 mb-4">{product.description}</p>
                  <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Explore Now
                    <i className="fas fa-arrow-right ml-2"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="inline-flex items-center bg-secondary-900 hover:bg-secondary-800 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg transition-all group">
              <span>View All Products</span>
              <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              INDUSTRIES WE SERVE
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-5xl font-heading font-bold text-secondary-900 mb-6">
              Powering Critical Industries Worldwide
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Trusted by leading companies across diverse sectors for reliable valve automation solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Link
                key={index}
                to={industry.link}
                className="group bg-secondary-50 hover:bg-white rounded-2xl p-8 border-2 border-secondary-100 hover:border-primary-500 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <i className={`fas ${industry.icon} text-2xl text-white`}></i>
                  </div>
                  <div className="bg-primary-50 px-3 py-1 rounded-full text-primary-700 font-semibold text-sm">
                    {industry.projects}
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {industry.name}
                </h3>
                <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform">
                  View Solutions
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/industries" className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-glow transition-all group">
              <span>Explore All Industries</span>
              <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl lg:text-6xl font-heading font-bold mb-6">
              Ready to Automate Your Operations?
            </h2>
            <p className="text-2xl mb-10 text-primary-100">
              Get expert consultation and customized solutions for your valve automation needs
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact#quote" className="bg-white hover:bg-secondary-50 text-primary-700 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-glow transition-all inline-flex items-center group">
                <i className="fas fa-file-alt mr-3 group-hover:rotate-12 transition-transform"></i>
                Request a Quote
                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
              </Link>
              <Link to="/contact" className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white hover:text-primary-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all inline-flex items-center group">
                <i className="fas fa-phone mr-3 group-hover:scale-110 transition-transform"></i>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Banner */}
      <section className="py-16 bg-secondary-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            <div className="flex items-center space-x-4 text-white">
              <i className="fas fa-certificate text-4xl text-primary-400"></i>
              <div>
                <div className="font-bold text-lg">ISO 9001:2015</div>
                <div className="text-sm text-secondary-400">Quality Management</div>
              </div>
            </div>
            <div className="h-12 w-px bg-secondary-700 hidden lg:block"></div>
            <div className="flex items-center space-x-4 text-white">
              <i className="fas fa-shield-alt text-4xl text-primary-400"></i>
              <div>
                <div className="font-bold text-lg">ATEX Certified</div>
                <div className="text-sm text-secondary-400">Explosion Proof</div>
              </div>
            </div>
            <div className="h-12 w-px bg-secondary-700 hidden lg:block"></div>
            <div className="flex items-center space-x-4 text-white">
              <i className="fas fa-check-circle text-4xl text-primary-400"></i>
              <div>
                <div className="font-bold text-lg">API 609</div>
                <div className="text-sm text-secondary-400">Industry Standard</div>
              </div>
            </div>
            <div className="h-12 w-px bg-secondary-700 hidden lg:block"></div>
            <div className="flex items-center space-x-4 text-white">
              <i className="fas fa-flag text-4xl text-primary-400"></i>
              <div>
                <div className="font-bold text-lg">CE Marked</div>
                <div className="text-sm text-secondary-400">European Standards</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
