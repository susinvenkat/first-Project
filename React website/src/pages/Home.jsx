import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      title: "HD Series Pneumatic Actuators",
      subtitle: "High-Performance Spring Return Solutions",
      features: ["Torque up to 120,867 Nm", "ISO 5211 Mounting", "Fail-Safe Design"],
      image: "/assets/img/products/pneumatic/hd-actuator-main.png"
    },
    {
      title: "PD Series Pneumatic Actuators",
      subtitle: "Compact Double-Acting Performance",
      features: ["Space-Saving Design", "Low Air Consumption", "High Efficiency"],
      image: "/assets/img/products/pneumatic/PD-actuator.jpg"
    },
    {
      title: "Heavy Duty Actuator Range",
      subtitle: "Industry-Leading Torque Capacity",
      features: ["10 Nm to 120,867 Nm", "All Valve Types", "32+ Years Proven"],
      image: "/assets/img/HD Actuator Image.png"
    },
    {
      title: "Manual Gearbox Solutions",
      subtitle: "Precision Manual Override Systems",
      features: ["Emergency Override", "Torque Multiplication", "Robust Design"],
      image: "/assets/img/products/gearboxes/MAB Series.jpg"
    },
    {
      title: "Complete Valve Automation",
      subtitle: "Trusted by 100+ Power & Oil Industries",
      features: ["ISO 9001:2015", "Global Presence", "24/7 Support"],
      image: "/assets/img/heroes/hero-large.jpg"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
            </div>
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <span className="inline-block bg-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Valve Automation Solutions
                </span>
                <h1 className="text-5xl font-bold mb-4 leading-tight">{slide.title}</h1>
                <p className="text-xl mb-6 text-gray-200">{slide.subtitle}</p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {slide.features.map((feature, i) => (
                    <span key={i} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                      <i className="fas fa-check-circle text-green-400 mr-2"></i>
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link to="/products" className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg font-medium inline-flex items-center">
                    <i className="fas fa-cogs mr-2"></i>
                    View Products
                  </Link>
                  <Link to="/contact" className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium inline-flex items-center">
                    <i className="fas fa-envelope mr-2"></i>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white">
                <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
              </button>
              <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-primary font-semibold text-lg mb-2 block">Since 1992</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Leading Provider of Industrial Actuators & Valve Automation
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              SUSIN has proudly provided steadfast support to the Asian power and oil & gas industries for over 32 years, 
              delivering engineered reliability and precision motion control solutions across the globe.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-industry text-4xl text-primary"></i>
              </div>
              <h3 className="text-5xl font-bold text-primary mb-2">100+</h3>
              <p className="text-gray-600 font-medium">Power Industries Supported</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-calendar-check text-4xl text-primary"></i>
              </div>
              <h3 className="text-5xl font-bold text-primary mb-2">32+</h3>
              <p className="text-gray-600 font-medium">Years of Experience</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-ship text-4xl text-primary"></i>
              </div>
              <h3 className="text-5xl font-bold text-primary mb-2">100+</h3>
              <p className="text-gray-600 font-medium">FPSO Actuators Operating</p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/products" className="btn-primary inline-flex items-center">
              <i className="fas fa-arrow-right mr-2"></i>
              Explore Our Products
            </Link>
            <Link to="/contact#quote" className="btn-secondary ml-4 inline-flex items-center">
              <i className="fas fa-file-invoice-dollar mr-2"></i>
              Request Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-certificate text-5xl text-blue-600"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Engineered Reliability</h3>
              <p className="text-gray-600">
                ISO 9001:2015 certified manufacturing with rigorous quality control. Approved by BHEL, NTPC, and major refineries.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-globe-asia text-5xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Delivery</h3>
              <p className="text-gray-600">
                Strategic presence in India, UAE, and Qatar. Worldwide shipping with local support and service centers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-tools text-5xl text-purple-600"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Service & Commissioning</h3>
              <p className="text-gray-600">
                Complete lifecycle support from installation to maintenance. Expert technical training and 24/7 emergency support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Product Range</h2>
            <p className="text-xl text-gray-600">Comprehensive valve automation solutions for every application</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <i className="fas fa-wind text-8xl text-white/90"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Pneumatic Actuators</h3>
                <p className="text-gray-600 text-sm mb-4">Torque range: 10 Nm - 120,867 Nm</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li><i className="fas fa-check text-green-500 mr-2"></i>PDS Series</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>HD Series</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>PLDS Series</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>MPLDS Series</li>
                </ul>
                <Link to="/products#pneumatic" className="text-primary font-medium group-hover:underline">
                  Learn More <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <i className="fas fa-tint text-8xl text-white/90"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Electro-Hydraulic</h3>
                <p className="text-gray-600 text-sm mb-4">Precision control for heavy-duty applications</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li><i className="fas fa-check text-green-500 mr-2"></i>High Torque Output</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>Compact Design</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>Remote Control</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>ATEX Certified</li>
                </ul>
                <Link to="/products#electro-hydraulic" className="text-primary font-medium group-hover:underline">
                  Learn More <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                <i className="fas fa-bolt text-8xl text-white/90"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Electrical Actuators</h3>
                <p className="text-gray-600 text-sm mb-4">Smart digital control with IoT integration</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li><i className="fas fa-check text-green-500 mr-2"></i>Modbus/HART</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>4-20mA Control</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>Position Feedback</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>Explosion Proof</li>
                </ul>
                <Link to="/products#electrical" className="text-primary font-medium group-hover:underline">
                  Learn More <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <i className="fas fa-cog text-8xl text-white/90"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Gearboxes</h3>
                <p className="text-gray-600 text-sm mb-4">Precision motion control solutions</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li><i className="fas fa-check text-green-500 mr-2"></i>Worm Gearboxes</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>Bevel Gearboxes</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>Custom Ratios</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i>Marine Grade</li>
                </ul>
                <Link to="/products#gearboxes" className="text-primary font-medium group-hover:underline">
                  Learn More <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600">Trusted by leading companies worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Oil & Gas", icon: "fa-fire", link: "#oil-gas" },
              { name: "Water Treatment", icon: "fa-water", link: "#water" },
              { name: "Power Generation", icon: "fa-plug", link: "#power" },
              { name: "Chemical", icon: "fa-flask", link: "#chemical" },
              { name: "Marine", icon: "fa-ship", link: "#marine" },
              { name: "Pharmaceutical", icon: "fa-pills", link: "#pharma" }
            ].map((industry, index) => (
              <Link
                key={index}
                to={`/industries${industry.link}`}
                className="bg-gray-50 hover:bg-primary hover:text-white rounded-lg p-6 text-center transition-all group"
              >
                <i className={`fas ${industry.icon} text-4xl mb-3 text-primary group-hover:text-white`}></i>
                <h3 className="font-semibold">{industry.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our engineering team to discuss your valve automation requirements
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact#quote" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center">
              <i className="fas fa-file-invoice-dollar mr-2"></i>
              Request Quote
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center">
              <i className="fas fa-phone mr-2"></i>
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
