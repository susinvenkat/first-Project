import { Link } from 'react-router-dom';

export default function About() {
  const milestones = [
    { year: '1992', title: 'Company Founded', description: 'SUSIN India established in Coimbatore', icon: 'fa-flag-checkered' },
    { year: '2000', title: 'ISO Certification', description: 'Awarded ISO 9001:2000 quality certification', icon: 'fa-certificate' },
    { year: '2008', title: 'Regional Expansion', description: 'Opened UAE regional office in Dubai', icon: 'fa-expand-arrows-alt' },
    { year: '2012', title: '20 Years Milestone', description: 'Celebrated 20 years of excellence', icon: 'fa-birthday-cake' },
    { year: '2015', title: 'ATEX Approval', description: 'Received ATEX certification for hazardous areas', icon: 'fa-shield-alt' },
    { year: '2018', title: 'Smart Actuators Launch', description: 'Introduced IoT-enabled smart positioning systems', icon: 'fa-microchip' },
    { year: '2020', title: 'Qatar Office', description: 'Established presence in Doha, Qatar', icon: 'fa-building' },
    { year: '2024', title: '32 Years Strong', description: 'Serving 100+ industries with 15,000+ projects', icon: 'fa-trophy' }
  ];

  const leadership = [
    {
      name: 'Venkatesh Rajasekar',
      position: 'CEO - Mechanical Actuator Division',
      bio: 'Joined in 2010 as fresh graduate engineer, instrumental in ERP implementation. Leading the future of mechanical actuator division with over 13 years of experience.',
      icon: 'fa-user-tie',
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Engineering Leadership',
      position: 'Technical Excellence',
      bio: 'Experienced team with 15-20+ years leading product development, quality management, and project execution across global operations.',
      icon: 'fa-cogs',
      color: 'from-purple-600 to-purple-700'
    },
    {
      name: 'Global Operations',
      position: 'Multi-region Management',
      bio: 'Managing operations across India, UAE, and Qatar with focus on customer satisfaction, innovation, and sustainable growth.',
      icon: 'fa-globe',
      color: 'from-green-600 to-green-700'
    }
  ];

  const awards = [
    { title: 'Standout Performer of the Year', desc: 'Annual award by founder recognizing exceptional talent with golden ring', icon: 'fa-trophy', color: 'from-yellow-600 to-yellow-700' },
    { title: 'Finding of Susin Award', desc: 'Recognition for outstanding employee contributions to company growth', icon: 'fa-award', color: 'from-orange-600 to-orange-700' },
    { title: 'Industry Excellence', desc: 'Recognized for innovation and quality in valve automation sector', icon: 'fa-star', color: 'from-red-600 to-red-700' },
    { title: 'Quality Excellence', desc: 'Maintaining ISO standards and zero-defect manufacturing', icon: 'fa-medal', color: 'from-teal-600 to-teal-700' }
  ];

  const capabilities = [
    {
      title: 'Manufacturing Excellence',
      description: 'State-of-the-art manufacturing facilities with advanced CNC machining, assembly lines, and quality control',
      features: ['CNC Machining Centers', 'Automated Assembly Lines', 'In-house Testing Facilities', 'Quality Control Lab'],
      icon: 'fa-industry'
    },
    {
      title: 'Engineering Innovation',
      description: 'Dedicated R&D team developing next-generation actuator technology and Industry 4.0 solutions',
      features: ['CAD/CAE Design Centers', 'Prototype Development', 'IoT Integration', 'Smart Positioning Systems'],
      icon: 'fa-lightbulb'
    },
    {
      title: 'Global Service Network',
      description: 'Comprehensive aftermarket support with local presence for installation, maintenance, and technical assistance',
      features: ['24/7 Technical Support', 'On-site Services', 'Spare Parts Management', 'Training Programs'],
      icon: 'fa-hands-helping'
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center bg-primary-600/20 backdrop-blur-md border border-primary-400/30 px-5 py-2 rounded-full text-sm font-medium mb-6 text-primary-200 animate-fade-in">
              <i className="fas fa-building mr-2"></i>
              Established 1992
            </span>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight animate-slide-up">
              About Susin Group
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-secondary-200 leading-relaxed animate-slide-up">
              32+ Years of Engineering Excellence in Valve Automation
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <span className="text-primary-600 font-semibold text-lg mb-2 block flex items-center">
                <div className="h-1 w-12 bg-primary-600 mr-3"></div>
                OUR STORY
              </span>
              <h2 id="history" className="text-4xl font-heading font-bold text-secondary-900 mb-6">
                Engineering the Future Since 1992
              </h2>
              <p className="text-lg text-secondary-700 mb-4 leading-relaxed">
                SUSIN iTORK India Pvt. Ltd. (formerly known as SUSIN INDIA) was established in 1992, bringing 
                advanced valve automation technology to the Asian market. Over three decades, we have grown from 
                a regional supplier to a globally recognized manufacturer of industrial actuators and motion control systems.
              </p>
              <p className="text-lg text-secondary-700 mb-4 leading-relaxed">
                Our commitment to engineering excellence and customer satisfaction has made us the preferred 
                partner for over 100 power plants, refineries, and industrial facilities across India, UAE, and Qatar.
              </p>
              <p className="text-lg text-secondary-700 leading-relaxed">
                Today, SUSIN continues to innovate with smart digital actuators, IoT integration, and Industry 4.0 
                solutions while maintaining our core values of reliability, quality, and service.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 text-center hover:shadow-xl transition-all">
                <div className="text-5xl font-bold text-primary-600 mb-2">1992</div>
                <div className="text-secondary-700 font-semibold">Founded</div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 text-center hover:shadow-xl transition-all">
                <div className="text-5xl font-bold text-primary-600 mb-2">100+</div>
                <div className="text-secondary-700 font-semibold">Industries Served</div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 text-center hover:shadow-xl transition-all">
                <div className="text-5xl font-bold text-primary-600 mb-2">3</div>
                <div className="text-secondary-700 font-semibold">Countries</div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 text-center hover:shadow-xl transition-all">
                <div className="text-5xl font-bold text-primary-600 mb-2">15K+</div>
                <div className="text-secondary-700 font-semibold">Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              OUR JOURNEY
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              Key Milestones
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Three decades of innovation, growth, and excellence
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>

              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500">
                      <div className={`text-4xl font-bold text-primary-600 mb-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        {milestone.year}
                      </div>
                      <h4 className="text-xl font-bold text-secondary-900 mb-2">{milestone.title}</h4>
                      <p className="text-secondary-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Center circle */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full items-center justify-center shadow-lg z-10">
                    <i className={`fas ${milestone.icon} text-2xl text-white`}></i>
                  </div>

                  {/* Spacer for alternating sides */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border-2 border-blue-200 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                <i className="fas fa-bullseye text-4xl text-white"></i>
              </div>
              <h3 className="text-3xl font-heading font-bold text-secondary-900 mb-4">Our Mission</h3>
              <p className="text-secondary-700 text-lg leading-relaxed">
                To provide world-class valve automation solutions that ensure safe, reliable, and efficient 
                operations for our clients across critical industries. We are committed to continuous innovation, 
                quality excellence, and exceptional customer service.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg border-2 border-green-200 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-6">
                <i className="fas fa-eye text-4xl text-white"></i>
              </div>
              <h3 className="text-3xl font-heading font-bold text-secondary-900 mb-4">Our Vision</h3>
              <p className="text-secondary-700 text-lg leading-relaxed">
                To be the global leader in intelligent valve automation, pioneering Industry 4.0 solutions 
                and sustainable technologies that shape the future of industrial process control while 
                maintaining our legacy of engineering excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="leadership" className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-secondary-600">
              Experienced professionals driving innovation and growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500 group">
                <div className={`h-48 bg-gradient-to-br ${leader.color} flex items-center justify-center`}>
                  <i className={`fas ${leader.icon} text-8xl text-white opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all`}></i>
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {leader.name}
                  </h4>
                  <p className="text-primary-600 font-semibold mb-4">{leader.position}</p>
                  <p className="text-secondary-600 leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">
              Manufacturing Capabilities
            </h2>
            <p className="text-xl text-secondary-600">
              Advanced facilities and expertise delivering superior quality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-secondary-50 rounded-2xl p-8 hover:shadow-xl transition-all border-2 border-secondary-200 hover:border-primary-500">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center mb-6">
                  <i className={`fas ${capability.icon} text-3xl text-white`}></i>
                </div>
                <h4 className="text-2xl font-bold text-secondary-900 mb-3">{capability.title}</h4>
                <p className="text-secondary-600 mb-4 leading-relaxed">{capability.description}</p>
                <ul className="space-y-2">
                  {capability.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-secondary-700">
                      <i className="fas fa-check-circle text-primary-600 mr-2 mt-1"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-br from-secondary-900 to-secondary-800 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-secondary-200">
              Celebrating excellence and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {awards.map((award, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all">
                <div className={`w-20 h-20 bg-gradient-to-br ${award.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <i className={`fas ${award.icon} text-4xl text-white`}></i>
                </div>
                <h4 className="text-xl font-bold mb-2">{award.title}</h4>
                <p className="text-secondary-200 text-sm">{award.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">Certifications & Approvals</h2>
            <p className="text-xl text-secondary-600">Certified excellence in manufacturing and quality</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "ISO 9001:2015", desc: "Quality Management System", icon: "fa-certificate", color: "from-blue-600 to-blue-700" },
              { name: "ISO 14001:2015", desc: "Environmental Management", icon: "fa-leaf", color: "from-green-600 to-green-700" },
              { name: "API 609", desc: "Butterfly Valves & Operators", icon: "fa-cog", color: "from-purple-600 to-purple-700" },
              { name: "ATEX / IECEx", desc: "Explosion Proof Certification", icon: "fa-shield-alt", color: "from-orange-600 to-orange-700" },
              { name: "CE Marking", desc: "European Conformity Standards", icon: "fa-check-circle", color: "from-indigo-600 to-indigo-700" },
              { name: "SIL 2/3", desc: "Safety Integrity Level", icon: "fa-lock", color: "from-red-600 to-red-700" },
              { name: "CMRI Approval", desc: "Coal Mines Regulations", icon: "fa-hard-hat", color: "from-yellow-600 to-yellow-700" },
              { name: "BHEL/NTPC", desc: "Power Sector Approved", icon: "fa-plug", color: "from-teal-600 to-teal-700" }
            ].map((cert, i) => (
              <div key={i} className="bg-secondary-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all border-2 border-secondary-200 hover:border-primary-500 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <i className={`fas ${cert.icon} text-3xl text-white`}></i>
                </div>
                <h4 className="font-bold text-secondary-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-secondary-600">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">Global Presence</h2>
            <p className="text-xl text-secondary-600">Strategic locations serving clients worldwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link to="/global/india" className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-map-marker-alt text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">India</h3>
              <p className="text-primary-600 font-semibold mb-4">Headquarters - Coimbatore</p>
              <p className="text-sm text-secondary-600 mb-4">Manufacturing facility and engineering center</p>
              <div className="text-primary-600 font-semibold group-hover:underline">View Details <i className="fas fa-arrow-right ml-2"></i></div>
            </Link>
            <Link to="/global/uae" className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-map-marker-alt text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">UAE</h3>
              <p className="text-primary-600 font-semibold mb-4">Regional Office - Dubai</p>
              <p className="text-sm text-secondary-600 mb-4">Sales and service center for Middle East</p>
              <div className="text-primary-600 font-semibold group-hover:underline">View Details <i className="fas fa-arrow-right ml-2"></i></div>
            </Link>
            <Link to="/global/qatar" className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-map-marker-alt text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">Qatar</h3>
              <p className="text-primary-600 font-semibold mb-4">Branch Office - Doha</p>
              <p className="text-sm text-secondary-600 mb-4">Local support and technical services</p>
              <div className="text-primary-600 font-semibold group-hover:underline">View Details <i className="fas fa-arrow-right ml-2"></i></div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Partner With Industry Leaders
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Experience the Susin difference - reliability, innovation, and 32+ years of engineering excellence
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-primary-700 hover:bg-secondary-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all inline-flex items-center"
            >
              <i className="fas fa-envelope mr-2"></i>
              Contact Us
            </Link>
            <Link 
              to="/products" 
              className="bg-primary-800 hover:bg-primary-900 px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 transition-all inline-flex items-center"
            >
              <i className="fas fa-cogs mr-2"></i>
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
