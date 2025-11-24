import { Link } from 'react-router-dom';

export default function Sustainability() {
  const handleDownloadReport = (year) => {
    // Trigger download (in production, this would download actual PDFs)
    console.log(`Downloading Sustainability Report ${year}`);
    alert(`Sustainability Report ${year} download will start shortly`);
  };

  const achievements = [
    { value: '37%', label: 'GHG Emissions Reduction', sublabel: 'Since 2020 baseline', icon: 'fa-leaf' },
    { value: '56%', label: 'Renewable Energy', sublabel: 'Of total electricity', icon: 'fa-solar-panel' },
    { value: '1.5 MW', label: 'Solar Capacity', sublabel: 'Rooftop installations', icon: 'fa-sun' },
    { value: 'Zero', label: 'Waste to Landfill', sublabel: 'Manufacturing facilities', icon: 'fa-recycle' }
  ];

  const initiatives = [
    {
      title: 'Carbon Footprint Reduction',
      description: 'Committed to achieving net-zero emissions by 2040 through renewable energy adoption and process optimization',
      icon: 'fa-seedling',
      color: 'from-green-600 to-green-700',
      achievements: [
        'Implemented energy-efficient manufacturing processes',
        '100% renewable electricity at Coimbatore facility',
        'LED lighting across all facilities',
        'Electric vehicle fleet for local operations'
      ]
    },
    {
      title: 'Sustainable Manufacturing',
      description: 'Implementing lean manufacturing principles to minimize waste and maximize resource efficiency',
      icon: 'fa-industry',
      color: 'from-blue-600 to-blue-700',
      achievements: [
        'Water recycling systems reducing consumption by 45%',
        'Zero-discharge wastewater treatment',
        'Paperless documentation systems',
        'Recyclable packaging materials'
      ]
    },
    {
      title: 'Product Lifecycle',
      description: 'Designing products for longevity, efficiency, and end-of-life recyclability',
      icon: 'fa-sync',
      color: 'from-purple-600 to-purple-700',
      achievements: [
        'Average product life: 20+ years',
        'Energy-efficient actuator designs',
        '95% recyclable materials in products',
        'Modular design for easy maintenance'
      ]
    },
    {
      title: 'Employee Well-being',
      description: 'Creating safe, inclusive workplaces where our people can thrive',
      icon: 'fa-users',
      color: 'from-orange-600 to-orange-700',
      achievements: [
        'Comprehensive health and safety programs',
        'Diversity and inclusion initiatives',
        'Continuous learning opportunities',
        'Work-life balance programs'
      ]
    },
    {
      title: 'Community Engagement',
      description: 'Supporting local communities through education, employment, and social initiatives',
      icon: 'fa-hands-helping',
      color: 'from-red-600 to-red-700',
      achievements: [
        'STEM education programs in local schools',
        'Skill development for youth',
        'Local sourcing: 70% of suppliers',
        'Community health initiatives'
      ]
    },
    {
      title: 'Responsible Sourcing',
      description: 'Ensuring ethical and sustainable practices throughout our supply chain',
      icon: 'fa-handshake',
      color: 'from-teal-600 to-teal-700',
      achievements: [
        'Supplier sustainability audits',
        'Conflict minerals compliance',
        'Fair labor practices verification',
        'Long-term supplier partnerships'
      ]
    }
  ];

  const certifications = [
    { name: 'ISO 9001:2015', desc: 'Quality Management', icon: 'fa-certificate' },
    { name: 'ISO 14001:2015', desc: 'Environmental Management', icon: 'fa-leaf' },
    { name: 'ISO 45001:2018', desc: 'Occupational Health & Safety', icon: 'fa-hard-hat' },
    { name: 'Energy Star', desc: 'Energy Efficiency', icon: 'fa-star' }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center bg-green-600/20 backdrop-blur-md border border-green-400/30 px-5 py-2 rounded-full text-sm font-medium mb-6 text-green-200 animate-fade-in">
              <i className="fas fa-leaf mr-2"></i>
              Environmental, Social & Governance
            </span>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight animate-slide-up">
              Sustainability at Susin
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100 leading-relaxed animate-slide-up">
              Building a sustainable future through innovation, responsibility, and commitment to our planet and people
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">
              Our 2024 Achievements
            </h2>
            <p className="text-xl text-secondary-600">
              Measurable progress toward a sustainable future
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <i className={`fas ${achievement.icon} text-4xl text-white`}></i>
                </div>
                <div className="text-5xl font-bold text-green-600 mb-2">{achievement.value}</div>
                <div className="font-bold text-secondary-900 mb-1">{achievement.label}</div>
                <div className="text-sm text-secondary-600">{achievement.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Initiatives */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-green-600 mr-3"></div>
              OUR INITIATIVES
              <div className="h-1 w-12 bg-green-600 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              Sustainability Pillars
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Comprehensive approach to environmental stewardship, social responsibility, and governance excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-green-500 group">
                <div className={`h-48 bg-gradient-to-br ${initiative.color} flex items-center justify-center relative overflow-hidden`}>
                  <i className={`fas ${initiative.icon} text-9xl text-white opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all`}></i>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-green-600 transition-colors">
                    {initiative.title}
                  </h3>
                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    {initiative.description}
                  </p>
                  <ul className="space-y-2">
                    {initiative.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start text-sm text-secondary-700">
                        <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">
              Environmental Certifications
            </h2>
            <p className="text-xl text-secondary-600">
              Independently verified commitment to environmental excellence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-secondary-50 rounded-xl p-6 text-center hover:shadow-lg transition-all border-2 border-secondary-200 hover:border-green-500">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${cert.icon} text-3xl text-white`}></i>
                </div>
                <h4 className="font-bold text-secondary-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-secondary-600">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals 2030 */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold mb-6">
                Our 2030 Goals
              </h2>
              <p className="text-xl text-green-100">
                Ambitious targets aligned with UN Sustainable Development Goals
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { goal: '50% Reduction in Carbon Emissions', target: 'From 2020 baseline' },
                { goal: '100% Renewable Energy', target: 'All global facilities' },
                { goal: 'Zero Waste to Landfill', target: 'Manufacturing operations' },
                { goal: '30% Women in Leadership', target: 'Management positions' },
                { goal: '80% Local Sourcing', target: 'Regional supply chains' },
                { goal: '100% Recyclable Products', target: 'Product portfolio' }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
                  <h4 className="text-xl font-bold mb-2">{item.goal}</h4>
                  <p className="text-green-200">{item.target}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reports Download */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-6">
              Sustainability Reports
            </h2>
            <p className="text-xl text-secondary-600 mb-8">
              Download our annual sustainability reports for detailed insights into our ESG performance
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {['2024', '2023', '2022'].map((year) => (
                <div key={year} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-green-500">
                  <i className="far fa-file-pdf text-6xl text-red-500 mb-4"></i>
                  <h4 className="text-xl font-bold text-secondary-900 mb-2">
                    Sustainability Report {year}
                  </h4>
                  <button 
                    onClick={() => handleDownloadReport(year)}
                    className="mt-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-all w-full"
                  >
                    <i className="fas fa-download mr-2"></i>
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Join Us in Building a Sustainable Future
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Partner with us for environmentally responsible flow control solutions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-green-700 hover:bg-secondary-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all inline-flex items-center"
            >
              <i className="fas fa-envelope mr-2"></i>
              Contact Our ESG Team
            </Link>
            <Link 
              to="/resources" 
              className="bg-green-800 hover:bg-green-900 px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 transition-all inline-flex items-center"
            >
              <i className="fas fa-book mr-2"></i>
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
