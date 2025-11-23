import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Industries() {
  useEffect(() => {
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
          <h1 className="text-5xl font-bold mb-6">Industries We Serve</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Trusted valve automation solutions for critical industries worldwide
          </p>
        </div>
      </section>

      {/* Oil & Gas */}
      <section id="oil-gas" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-fire text-4xl text-orange-600"></i>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Oil & Gas</h2>
              </div>
              <p className="text-xl text-gray-700 mb-6">
                Providing critical valve automation solutions for upstream, midstream, and downstream operations 
                in the oil and gas sector for over three decades.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "FPSO & Offshore Platforms",
                  "Refineries & Petrochemical Plants",
                  "Pipeline Systems",
                  "LNG Terminals",
                  "Gas Processing Facilities",
                  "Storage & Distribution"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-orange-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">Key Certifications:</h4>
                <div className="flex flex-wrap gap-3">
                  {["ATEX", "IECEx", "API 609", "SIL 2/3", "Fire Safe"].map((cert, i) => (
                    <span key={i} className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-orange-700 border border-orange-200">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-8">
              <img src="/assets/img/industries/oil-gas/offshore-platform.jpg" alt="Oil & Gas" className="rounded-lg shadow-lg mb-6" />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-orange-600">100+</div>
                  <div className="text-sm text-gray-600">FPSO Actuators</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-orange-600">50+</div>
                  <div className="text-sm text-gray-600">Refineries Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Water Treatment */}
      <section id="water" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-8">
              <img src="/assets/img/industries/water-treatment/plant.jpg" alt="Water Treatment" className="rounded-lg shadow-lg mb-6" />
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "Municipal", icon: "fa-city" },
                  { value: "Industrial", icon: "fa-industry" },
                  { value: "Desalination", icon: "fa-water" }
                ].map((type, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 text-center">
                    <i className={`fas ${type.icon} text-2xl text-blue-600 mb-2`}></i>
                    <div className="text-xs text-gray-600">{type.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-water text-4xl text-blue-600"></i>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Water Treatment</h2>
              </div>
              <p className="text-xl text-gray-700 mb-6">
                Reliable automation solutions for water and wastewater treatment facilities, 
                ensuring safe and efficient operations.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Drinking Water Plants",
                  "Wastewater Treatment",
                  "Desalination Plants",
                  "Industrial Water Systems",
                  "Pumping Stations",
                  "Distribution Networks"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-blue-500 mr-3"></i>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">Features:</h4>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <li><i className="fas fa-shield-alt text-blue-600 mr-2"></i>Corrosion Resistant</li>
                  <li><i className="fas fa-tint text-blue-600 mr-2"></i>IP68 Rating</li>
                  <li><i className="fas fa-recycle text-blue-600 mr-2"></i>NSF Certified</li>
                  <li><i className="fas fa-lock text-blue-600 mr-2"></i>Fail-Safe Design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Power Generation */}
      <section id="power" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-plug text-4xl text-yellow-600"></i>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Power Generation</h2>
              </div>
              <p className="text-xl text-gray-700 mb-6">
                Supporting power plants with robust valve automation for thermal, nuclear, and renewable energy facilities.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Thermal Power Plants",
                  "Nuclear Facilities",
                  "Combined Cycle Plants",
                  "Cogeneration Units",
                  "Boiler Feed Systems",
                  "Steam & Condensate Systems"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-yellow-500 mr-3"></i>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-yellow-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">Approvals:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><i className="fas fa-certificate text-yellow-600 mr-2"></i>BHEL Approved</div>
                  <div><i className="fas fa-certificate text-yellow-600 mr-2"></i>NTPC Approved</div>
                  <div><i className="fas fa-certificate text-yellow-600 mr-2"></i>ASME Certified</div>
                  <div><i className="fas fa-certificate text-yellow-600 mr-2"></i>Seismic Rated</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-8">
              <img src="/assets/img/industries/power-generation/plant.jpg" alt="Power Generation" className="rounded-lg shadow-lg mb-6" />
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-4">100+ Power Plants Supported</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Thermal Plants:</span>
                    <span className="font-semibold">60+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Combined Cycle:</span>
                    <span className="font-semibold">30+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cogeneration:</span>
                    <span className="font-semibold">10+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chemical */}
      <section id="chemical" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-8">
              <img src="/assets/img/industries/chemical/plant.jpg" alt="Chemical" className="rounded-lg shadow-lg" />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-flask text-4xl text-purple-600"></i>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Chemical Processing</h2>
              </div>
              <p className="text-xl text-gray-700 mb-6">
                Precision valve automation for chemical plants handling corrosive, toxic, and high-purity processes.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Petrochemical Plants",
                  "Specialty Chemicals",
                  "Fertilizer Production",
                  "Polymer Processing",
                  "Acid & Alkali Handling",
                  "Batch Processing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-purple-500 mr-3"></i>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">Special Features:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><i className="fas fa-shield-virus text-purple-600 mr-2"></i>Corrosion Resistant Materials</li>
                  <li><i className="fas fa-temperature-high text-purple-600 mr-2"></i>High Temperature Rating</li>
                  <li><i className="fas fa-biohazard text-purple-600 mr-2"></i>Chemical Compatibility</li>
                  <li><i className="fas fa-lock text-purple-600 mr-2"></i>Zero Emission Design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marine & Offshore */}
      <section id="marine" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-ship text-4xl text-blue-600"></i>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Marine & Offshore</h2>
              </div>
              <p className="text-xl text-gray-700 mb-6">
                Marine-grade actuators for ships, offshore platforms, and subsea applications in harsh environments.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "FPSO & FSO Vessels",
                  "Oil & Gas Platforms",
                  "LNG Carriers",
                  "Tankers & Cargo Ships",
                  "Naval Vessels",
                  "Subsea Systems"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-blue-500 mr-3"></i>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">Marine Certifications:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><i className="fas fa-anchor text-blue-600 mr-2"></i>ABS Approved</div>
                  <div><i className="fas fa-anchor text-blue-600 mr-2"></i>DNV GL Certified</div>
                  <div><i className="fas fa-anchor text-blue-600 mr-2"></i>Lloyd's Register</div>
                  <div><i className="fas fa-anchor text-blue-600 mr-2"></i>RINA Approved</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-200 rounded-xl p-8">
              <img src="/assets/img/industries/marine/fpso.jpg" alt="Marine" className="rounded-lg shadow-lg mb-6" />
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-4">100+ FPSO Actuators in Operation</h4>
                <p className="text-sm text-gray-600">
                  Our actuators are operating reliably on floating production platforms across the globe, 
                  withstanding extreme marine conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Industry-Specific Solutions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { industry: "Oil & Gas", link: "#oil-gas", icon: "fa-fire", color: "orange" },
              { industry: "Water Treatment", link: "#water", icon: "fa-water", color: "blue" },
              { industry: "Power Generation", link: "#power", icon: "fa-plug", color: "yellow" },
              { industry: "Chemical", link: "#chemical", icon: "fa-flask", color: "purple" },
              { industry: "Marine & Offshore", link: "#marine", icon: "fa-ship", color: "cyan" },
              { industry: "Pharmaceutical", link: "#pharma", icon: "fa-pills", color: "green" }
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 flex items-center transition-all"
              >
                <i className={`fas ${item.icon} text-4xl text-${item.color}-400 mr-4`}></i>
                <div>
                  <h3 className="font-bold text-lg">{item.industry}</h3>
                  <p className="text-sm text-gray-400">View Solutions</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Discuss Your Industry Requirements</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our application engineers will help you select the right solution for your specific industry needs
          </p>
          <Link to="/contact" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center">
            <i className="fas fa-comments mr-2"></i>
            Schedule Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
