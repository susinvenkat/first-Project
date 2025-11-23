import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Susin Group</h1>
          <p className="text-xl max-w-3xl mx-auto">32+ Years of Engineering Excellence in Valve Automation</p>
        </div>
      </section>

      {/* Company History */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-lg mb-2 block">Established 1992</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                SUSIN iTORK India Pvt. Ltd. (formerly known as SUSIN INDIA) was established in 1992, bringing 
                advanced valve automation technology to the Asian market. Over three decades, we have grown from 
                a regional supplier to a globally recognized manufacturer of industrial actuators and motion control systems.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Our commitment to engineering excellence and customer satisfaction has made us the preferred 
                partner for over 100 power plants, refineries, and industrial facilities across India, UAE, and Qatar.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, SUSIN continues to innovate with smart digital actuators, IoT integration, and Industry 4.0 
                solutions while maintaining our core values of reliability, quality, and service.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-primary mb-2">1992</div>
                <div className="text-gray-600">Founded</div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-primary mb-2">100+</div>
                <div className="text-gray-600">Industries Served</div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-primary mb-2">3</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-primary mb-2">100+</div>
                <div className="text-gray-600">FPSO Actuators</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-bullseye text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide world-class valve automation solutions that ensure safe, reliable, and efficient 
                operations for our clients across critical industries. We are committed to continuous innovation, 
                quality excellence, and exceptional customer service.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-eye text-4xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the global leader in intelligent valve automation, pioneering Industry 4.0 solutions 
                and sustainable technologies that shape the future of industrial process control while 
                maintaining our legacy of engineering excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Approvals</h2>
            <p className="text-xl text-gray-600">Certified excellence in manufacturing and quality</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "ISO 9001:2015", desc: "Quality Management", icon: "fa-certificate" },
              { name: "BHEL Approved", desc: "Power Sector", icon: "fa-plug" },
              { name: "NTPC Approved", desc: "Thermal Plants", icon: "fa-industry" },
              { name: "API 609", desc: "Butterfly Valves", icon: "fa-check-circle" },
              { name: "ATEX / IECEx", desc: "Explosion Proof", icon: "fa-fire-extinguisher" },
              { name: "SIL 2/3", desc: "Safety Systems", icon: "fa-shield-alt" },
              { name: "ABS / DNV GL", desc: "Marine Approved", icon: "fa-ship" },
              { name: "CE Marked", desc: "European Standards", icon: "fa-flag" }
            ].map((cert, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <i className={`fas ${cert.icon} text-4xl text-primary mb-4`}></i>
                <h4 className="font-bold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-600">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Global Presence</h2>
            <p className="text-xl text-gray-300">Strategic locations serving clients worldwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/global/india" className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all group">
              <i className="fas fa-map-marker-alt text-5xl text-primary mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">India</h3>
              <p className="text-gray-400 mb-4">Headquarters - Coimbatore</p>
              <p className="text-sm text-gray-300">Manufacturing facility and engineering center</p>
              <div className="mt-4 text-primary group-hover:underline">View Details <i className="fas fa-arrow-right ml-2"></i></div>
            </Link>
            <Link to="/global/uae" className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all group">
              <i className="fas fa-map-marker-alt text-5xl text-primary mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">UAE</h3>
              <p className="text-gray-400 mb-4">Regional Office - Dubai</p>
              <p className="text-sm text-gray-300">Sales and service center for Middle East</p>
              <div className="mt-4 text-primary group-hover:underline">View Details <i className="fas fa-arrow-right ml-2"></i></div>
            </Link>
            <Link to="/global/qatar" className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all group">
              <i className="fas fa-map-marker-alt text-5xl text-primary mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">Qatar</h3>
              <p className="text-gray-400 mb-4">Branch Office - Doha</p>
              <p className="text-sm text-gray-300">Local support and technical services</p>
              <div className="mt-4 text-primary group-hover:underline">View Details <i className="fas fa-arrow-right ml-2"></i></div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Success Story</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover why leading industries trust SUSIN for their valve automation needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center">
              <i className="fas fa-cogs mr-2"></i>
              View Products
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center">
              <i className="fas fa-envelope mr-2"></i>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
