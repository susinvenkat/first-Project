import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Resources() {
  const [activeTab, setActiveTab] = useState('catalogs');
  const [dataSheetFilter, setDataSheetFilter] = useState('All');

  const handleDownload = (item) => {
    console.log(`Downloading: ${item}`);
    alert(`${item} download will start shortly`);
  };

  const catalogs = [
    {
      title: 'Pneumatic Actuators Complete Catalog',
      description: 'Comprehensive guide to our pneumatic actuator range including PDS, HD, PLDS, and MPLDS series',
      pages: '48 pages',
      size: '12.5 MB',
      format: 'PDF',
      icon: 'fa-wind',
      downloadLink: '#'
    },
    {
      title: 'Electrical Actuators Catalog',
      description: 'Quarter-turn and multi-turn electrical actuators with smart positioning systems',
      pages: '36 pages',
      size: '8.2 MB',
      format: 'PDF',
      icon: 'fa-bolt',
      downloadLink: '#'
    },
    {
      title: 'Gearboxes & Motion Control',
      description: 'Manual and power gearboxes for valve automation applications',
      pages: '24 pages',
      size: '5.8 MB',
      format: 'PDF',
      icon: 'fa-cog',
      downloadLink: '#'
    },
    {
      title: 'Control Accessories Guide',
      description: 'Positioners, limit switches, solenoid valves, and control panels',
      pages: '32 pages',
      size: '7.1 MB',
      format: 'PDF',
      icon: 'fa-sliders-h',
      downloadLink: '#'
    }
  ];

  const datasheets = [
    { name: 'PDS Series Datasheet', category: 'Pneumatic', size: '1.2 MB' },
    { name: 'HD Series Technical Specs', category: 'Pneumatic', size: '1.5 MB' },
    { name: 'PLDS Series Datasheet', category: 'Pneumatic', size: '1.1 MB' },
    { name: 'MPLDS Series Datasheet', category: 'Pneumatic', size: '1.3 MB' },
    { name: 'Quarter-Turn Electric Actuator', category: 'Electrical', size: '980 KB' },
    { name: 'Multi-Turn Electric Actuator', category: 'Electrical', size: '1.1 MB' },
    { name: 'Smart Positioners Datasheet', category: 'Controls', size: '850 KB' },
    { name: 'MAB Worm Gearbox', category: 'Gearbox', size: '720 KB' }
  ];

  const certificates = [
    {
      title: 'ISO 9001:2015',
      description: 'Quality Management System',
      icon: 'fa-certificate',
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'ATEX Certification',
      description: 'Explosive Atmospheres Directive',
      icon: 'fa-shield-alt',
      color: 'from-orange-600 to-orange-700'
    },
    {
      title: 'CE Marking',
      description: 'European Conformity',
      icon: 'fa-check-circle',
      color: 'from-green-600 to-green-700'
    },
    {
      title: 'API 609',
      description: 'Butterfly Valves & Operators',
      icon: 'fa-award',
      color: 'from-purple-600 to-purple-700'
    },
    {
      title: 'SIL Certification',
      description: 'Safety Integrity Level',
      icon: 'fa-lock',
      color: 'from-red-600 to-red-700'
    },
    {
      title: 'CMRI Approval',
      description: 'Coal Mines Regulations',
      icon: 'fa-hard-hat',
      color: 'from-yellow-600 to-yellow-700'
    }
  ];

  const caseStudies = [
    {
      title: 'Oil & Gas Refinery Automation',
      industry: 'Oil & Gas',
      location: 'Middle East',
      description: 'Supplied 500+ pneumatic actuators for critical refinery operations',
      results: '30% reduction in maintenance, 99.8% uptime',
      icon: 'fa-fire'
    },
    {
      title: 'Water Treatment Plant Upgrade',
      industry: 'Water',
      location: 'India',
      description: 'Complete valve automation for 150 MLD water treatment facility',
      results: '40% energy savings, automated remote control',
      icon: 'fa-water'
    },
    {
      title: 'Power Plant Modernization',
      industry: 'Power',
      location: 'UAE',
      description: 'Retrofit of 200+ actuators with smart positioning systems',
      results: 'Improved control accuracy, reduced emissions',
      icon: 'fa-plug'
    },
    {
      title: 'Chemical Processing Facility',
      industry: 'Chemical',
      location: 'Qatar',
      description: 'ATEX-certified actuators for hazardous area applications',
      results: 'Enhanced safety, zero incidents in 3 years',
      icon: 'fa-flask'
    }
  ];

  const videos = [
    {
      title: 'Pneumatic Actuator Overview',
      duration: '5:32',
      thumbnail: '/assets/img/videos/pneumatic.jpg',
      category: 'Product Tour'
    },
    {
      title: 'Installation & Commissioning Guide',
      duration: '8:15',
      thumbnail: '/assets/img/videos/installation.jpg',
      category: 'Training'
    },
    {
      title: 'Maintenance Best Practices',
      duration: '6:45',
      thumbnail: '/assets/img/videos/maintenance.jpg',
      category: 'Training'
    },
    {
      title: 'Smart Actuator Technology',
      duration: '4:20',
      thumbnail: '/assets/img/videos/smart.jpg',
      category: 'Innovation'
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center bg-primary-600/20 backdrop-blur-md border border-primary-400/30 px-5 py-2 rounded-full text-sm font-medium mb-6 text-primary-200 animate-fade-in">
              <i className="fas fa-book-open mr-2"></i>
              Knowledge Center
            </span>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight animate-slide-up">
              Technical Resources
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-secondary-200 leading-relaxed animate-slide-up">
              Access comprehensive documentation, technical specifications, certifications, and case studies
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'catalogs', icon: 'fa-book', label: 'Catalogs' },
              { id: 'datasheets', icon: 'fa-file-pdf', label: 'Data Sheets' },
              { id: 'cad', icon: 'fa-cube', label: 'CAD Models' },
              { id: 'certificates', icon: 'fa-certificate', label: 'Certifications' },
              { id: 'case-studies', icon: 'fa-clipboard-check', label: 'Case Studies' },
              { id: 'videos', icon: 'fa-video', label: 'Videos' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                <i className={`fas ${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogs Tab */}
      {activeTab === 'catalogs' && (
        <section id="catalogs" className="py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">
                Product Catalogs
              </h2>
              <p className="text-xl text-secondary-600">
                Download comprehensive product catalogs with specifications and applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {catalogs.map((catalog, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500 group">
                  <div className="flex items-start mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <i className={`fas ${catalog.icon} text-3xl text-white`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {catalog.title}
                      </h3>
                      <p className="text-secondary-600 text-sm mb-3">
                        {catalog.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-secondary-500">
                        <span><i className="far fa-file-pdf mr-1"></i>{catalog.format}</span>
                        <span><i className="fas fa-file mr-1"></i>{catalog.pages}</span>
                        <span><i className="fas fa-download mr-1"></i>{catalog.size}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownload(catalog.title)}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    <i className="fas fa-download mr-2"></i>
                    Download Catalog
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Data Sheets Tab */}
      {activeTab === 'datasheets' && (
        <section id="datasheets" className="py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">
                Technical Data Sheets
              </h2>
              <p className="text-xl text-secondary-600">
                Detailed technical specifications for all product series
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {['All', 'Pneumatic', 'Electrical', 'Gearbox', 'Controls'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setDataSheetFilter(category)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all font-semibold ${
                      dataSheetFilter === category
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-secondary-700 border-secondary-200 hover:border-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="divide-y divide-secondary-100">
                  {datasheets.map((sheet, index) => (
                    <div key={index} className="p-6 hover:bg-primary-50 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <i className="far fa-file-pdf text-red-500 text-3xl mr-4"></i>
                          <div>
                            <h4 className="font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                              {sheet.name}
                            </h4>
                            <p className="text-sm text-secondary-500">
                              {sheet.category} • {sheet.size}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDownload(sheet.name)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CAD Models Tab */}
      {activeTab === 'cad' && (
        <section id="cad" className="py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">
                CAD Models & 3D Drawings
              </h2>
              <p className="text-xl text-secondary-600">
                Download 2D/3D CAD models in multiple formats for design integration
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-12 text-white text-center">
                <i className="fas fa-cube text-8xl mb-6 opacity-50"></i>
                <h3 className="text-3xl font-bold mb-4">CAD Library Coming Soon</h3>
                <p className="text-xl text-primary-100 mb-8">
                  We're building a comprehensive library of 3D models in STEP, IGES, DWG, and other formats
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg">
                    <i className="fas fa-check mr-2"></i>STEP Format
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg">
                    <i className="fas fa-check mr-2"></i>IGES Format
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg">
                    <i className="fas fa-check mr-2"></i>DWG Format
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg">
                    <i className="fas fa-check mr-2"></i>PDF Drawings
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-block mt-8 bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-secondary-50 transition-all"
                >
                  Request CAD Files
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certifications Tab */}
      {activeTab === 'certificates' && (
        <section id="certificates" className="py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">
                Certifications & Approvals
              </h2>
              <p className="text-xl text-secondary-600">
                Our products meet international quality and safety standards
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {certificates.map((cert, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500">
                  <div className={`w-20 h-20 bg-gradient-to-br ${cert.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <i className={`fas ${cert.icon} text-4xl text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2">{cert.title}</h3>
                  <p className="text-secondary-600 mb-6">{cert.description}</p>
                  <button 
                    onClick={() => alert(`${cert.title} certificate will be displayed`)}
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    View Certificate <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Tab */}
      {activeTab === 'case-studies' && (
        <section id="case-studies" className="py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">
                Customer Success Stories
              </h2>
              <p className="text-xl text-secondary-600">
                Real-world applications and proven results from our global projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500 group">
                  <div className="h-48 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                    <i className={`fas ${study.icon} text-9xl text-white opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all`}></i>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {study.industry}
                      </span>
                      <span className="text-secondary-500 text-sm">
                        <i className="fas fa-map-marker-alt mr-1"></i>{study.location}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-secondary-600 mb-4">{study.description}</p>
                    <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded">
                      <p className="font-semibold text-primary-800">
                        <i className="fas fa-chart-line mr-2"></i>Results
                      </p>
                      <p className="text-secondary-700">{study.results}</p>
                    </div>
                    <button 
                      onClick={() => alert(`${study.title} - Full case study will open`)}
                      className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      Read Full Case Study <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos Tab */}
      {activeTab === 'videos' && (
        <section id="videos" className="py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">
                Videos & Webinars
              </h2>
              <p className="text-xl text-secondary-600">
                Watch product demonstrations, installation guides, and technical training
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {videos.map((video, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                  <div className="relative h-48 bg-secondary-800 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/50 to-primary-800/50"></div>
                    <i className="fas fa-play-circle text-6xl text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all cursor-pointer relative z-10"></i>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-semibold mb-2">
                      {video.category}
                    </span>
                    <h4 className="font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                      {video.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Need More Information?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Can't find what you're looking for? Our technical team is here to help
          </p>
          <Link 
            to="/contact" 
            className="bg-white text-primary-700 hover:bg-secondary-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all inline-flex items-center"
          >
            <i className="fas fa-envelope mr-2"></i>
            Contact Technical Support
          </Link>
        </div>
      </section>
    </div>
  );
}
