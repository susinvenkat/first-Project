import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Products() {
  useEffect(() => {
    // Scroll to hash if present
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Industrial Actuators & Gearboxes</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive valve automation solutions engineered for reliability and precision across all industries
          </p>
        </div>
      </section>

      {/* Pneumatic Actuators */}
      <section id="pneumatic" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-lg">Pneumatic Solutions</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Pneumatic Scotch Yoke Actuators</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Torque range: 10 Nm - 120,867 Nm | Operating temperatures: -40°C to +80°C
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                series: "PDS Series",
                torque: "10 - 5,425 Nm",
                features: ["Double Acting", "Spring Return Options", "NAMUR Mounting", "ISO 5211 Compatible"],
                image: "/assets/img/products/pneumatic/PD-actuator.jpg"
              },
              {
                series: "HD Series",
                torque: "200 - 120,867 Nm",
                features: ["Heavy Duty Design", "High Pressure Rating", "Extended Life Cycle", "Custom Configurations"],
                image: "/assets/img/products/pneumatic/hd-actuator-main.png"
              },
              {
                series: "PLDS Series",
                torque: "50 - 15,000 Nm",
                features: ["Modular Design", "Easy Maintenance", "Compact Footprint", "Multiple Control Options"],
                image: "/assets/img/products/pneumatic/hd-series-detail.jpg"
              },
              {
                series: "MPLDS Series",
                torque: "100 - 30,000 Nm",
                features: ["Multi-Positional", "Fail-Safe Design", "ATEX Certified", "Position Feedback"],
                image: "/assets/img/HD Actuator Image.png"
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.series}
                    className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.series}</h3>
                  <p className="text-primary font-semibold mb-4">{product.torque}</p>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-700">
                        <i className="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact#quote" className="mt-6 inline-flex items-center text-primary font-semibold hover:underline">
                    Request Quote <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Electro-Hydraulic Actuators */}
      <section id="electro-hydraulic" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-lg">Electro-Hydraulic Solutions</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Electro-Hydraulic Actuators</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High torque output with precision control for heavy-duty applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quarter-Turn Actuators",
                description: "90° rotation for ball, butterfly, and plug valves",
                features: ["Up to 500,000 Nm", "4-20mA Control", "Remote Operation", "Fail-Safe Modes"],
                image: "/assets/img/products/electro-hydraulic/quarter-turn.jpg"
              },
              {
                title: "Multi-Turn Actuators",
                description: "Precision control for gate and globe valves",
                features: ["High Thrust Output", "Position Indication", "Manual Override", "Explosion Proof"],
                image: "/assets/img/products/electro-hydraulic/multi-turn.jpg"
              },
              {
                title: "Linear Actuators",
                description: "Direct stem movement for control valves",
                features: ["Precise Positioning", "Fast Response Time", "Compact Design", "Low Maintenance"],
                image: "/assets/img/products/electro-hydraulic/linear.jpg"
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                  <i className="fas fa-tint text-8xl text-white/90"></i>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <i className="fas fa-chevron-right text-purple-500 mr-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="text-primary font-semibold hover:underline">
                    Learn More <i className="fas fa-arrow-right ml-1"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Electrical Actuators */}
      <section id="electrical" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-lg">Smart Automation</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Electrical Actuators</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intelligent actuators with IoT integration and digital control protocols
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-bolt text-3xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Quarter-Turn Electric</h3>
                  <p className="text-gray-600">Modulating and on/off control for 90° rotation valves</p>
                </div>
              </div>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "Modbus RTU/TCP",
                  "HART Protocol",
                  "4-20mA Signal",
                  "Position Feedback",
                  "Torque Sensing",
                  "ESD Compatible",
                  "ATEX/IECEx Certified",
                  "Remote Diagnostics"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-microchip text-3xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Multi-Turn Electric</h3>
                  <p className="text-gray-600">Precision control for rising stem and globe valves</p>
                </div>
              </div>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "Absolute Encoder",
                  "Thrust Monitoring",
                  "Multi-Voltage Options",
                  "Anti-Condensation Heater",
                  "Hand wheel Override",
                  "Seismic Certification",
                  "SIL 2/3 Rated",
                  "Asset Management"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Smart Digital Actuators with IoT</h3>
            <p className="text-xl mb-6">Industry 4.0 ready with cloud connectivity and predictive maintenance</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <i className="fas fa-wifi text-2xl mb-2"></i>
                <p className="font-semibold">Wireless Control</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <i className="fas fa-chart-line text-2xl mb-2"></i>
                <p className="font-semibold">Real-Time Analytics</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <i className="fas fa-mobile-alt text-2xl mb-2"></i>
                <p className="font-semibold">Mobile App</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <i className="fas fa-bell text-2xl mb-2"></i>
                <p className="font-semibold">Smart Alerts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gearboxes */}
      <section id="gearboxes" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-lg">Motion Control</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Industrial Gearboxes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Precision engineered gearboxes for multi-turn valve automation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                type: "LSB Series Gearbox",
                ratio: "10:1 to 120:1",
                features: ["Self-Locking", "High Efficiency", "Compact Design", "Low Noise"],
                image: "/assets/img/products/gearboxes/LSB-001.png"
              },
              {
                type: "MAB Series Manual",
                ratio: "1:1 to 5:1",
                features: ["90° Drive", "Heavy Duty", "High Torque", "Modular Design"],
                image: "/assets/img/products/gearboxes/MAB Series.jpg"
              },
              {
                type: "Custom Solutions",
                ratio: "As Required",
                features: ["Engineered Solutions", "Special Ratios", "Marine Grade", "Extreme Conditions"],
                image: "/assets/img/products/gearboxes/LSB-003.png"
              }
            ].map((gearbox, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                <div className="h-56 bg-gray-50 flex items-center justify-center p-4">
                  <img 
                    src={gearbox.image} 
                    alt={gearbox.type}
                    className="max-h-full w-auto object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-center mb-2">{gearbox.type}</h3>
                  <p className="text-center text-primary font-semibold mb-6">Ratio: {gearbox.ratio}</p>
                  <ul className="space-y-2">
                    {gearbox.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <i className="fas fa-check text-green-500 mr-3"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section id="accessories" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Actuator Accessories</h2>
            <p className="text-xl text-gray-600">Complete your valve automation system</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Position Transmitters", icon: "fa-location-arrow" },
              { name: "Limit Switch Boxes", icon: "fa-toggle-on" },
              { name: "Solenoid Valves", icon: "fa-magnet" },
              { name: "Pneumatic Controllers", icon: "fa-sliders-h" },
              { name: "Filter Regulators", icon: "fa-filter" },
              { name: "Quick Exhaust Valves", icon: "fa-wind" },
              { name: "Manual Overrides", icon: "fa-hand-pointer" },
              { name: "Mounting Kits", icon: "fa-toolbox" }
            ].map((accessory, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-primary hover:text-white transition-all group">
                <i className={`fas ${accessory.icon} text-4xl mb-3 text-primary group-hover:text-white`}></i>
                <h3 className="font-semibold">{accessory.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Help Selecting the Right Product?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our technical team is ready to assist you with product selection and sizing
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact#quote" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center">
              <i className="fas fa-file-invoice-dollar mr-2"></i>
              Request Quote
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center">
              <i className="fas fa-headset mr-2"></i>
              Talk to Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
