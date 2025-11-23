export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Engineering Excellence</h1>
            <p className="text-xl mb-8">Leading MEP Contracting and Engineering Solutions Provider</p>
            <div className="flex space-x-4">
              <button className="btn-primary bg-white text-primary hover:bg-gray-100">Our Services</button>
              <button className="btn-secondary border-2 border-white">Contact Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About Susin Group</h2>
              <p className="text-gray-600 mb-4">
                Established in 2000, Susin Group has been at the forefront of MEP contracting 
                and engineering solutions across India, UAE, and Qatar.
              </p>
              <p className="text-gray-600 mb-4">
                With over two decades of experience, we specialize in HVAC systems, fire fighting 
                systems, plumbing services, and electrical works for commercial and residential projects.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">500+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">20+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">3</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="/images/about.jpg" 
                alt="About Susin Group" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: 'fa-tools', title: 'MEP Contracting', desc: 'Complete MEP solutions for all types of buildings' },
              { icon: 'fa-wind', title: 'HVAC Systems', desc: 'Energy-efficient heating, ventilation, and air conditioning' },
              { icon: 'fa-fire-extinguisher', title: 'Fire Fighting', desc: 'Advanced fire protection and safety systems' },
              { icon: 'fa-faucet', title: 'Plumbing Services', desc: 'Professional plumbing installation and maintenance' },
              { icon: 'fa-bolt', title: 'Electrical Works', desc: 'Comprehensive electrical solutions and automation' },
              { icon: 'fa-building', title: 'Building Management', desc: 'Smart building automation and control systems' },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="text-4xl text-primary mb-4">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Global Presence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { country: 'India', city: 'Multiple Cities', icon: 'fa-landmark' },
              { country: 'UAE', city: 'Dubai', icon: 'fa-building' },
              { country: 'Qatar', city: 'Doha', icon: 'fa-city' },
            ].map((location, index) => (
              <div key={index} className="text-center p-6 bg-gray-800 rounded-lg">
                <div className="text-5xl mb-4">
                  <i className={`fas ${location.icon}`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">{location.country}</h3>
                <p className="text-gray-400">{location.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8">Contact us today for a consultation</p>
          <button className="btn-primary bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}
