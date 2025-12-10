import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import GradientText from '../components/ui/GradientText';
import Container from '../components/common/Container';
import Button from '../components/ui/Button';

export default function About() {
  const { t } = useLanguage();
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
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-5"></div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" size="lg" icon="fas fa-building" className="mb-6 animate-fade-in">
              {t('about.heroBadge')}
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight animate-slide-up">
              <GradientText from="from-primary-400" via="via-blue-400" to="to-cyan-400" animate={true}>
                {t('about.heroTitle')}
              </GradientText>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-slate-300 leading-relaxed animate-slide-up">
              {t('about.heroSubtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <span className="text-primary-600 font-semibold text-lg mb-2 block flex items-center">
                <div className="h-1 w-12 bg-primary-600 mr-3"></div>
                {t('about.storyLabel')}
              </span>
              <h2 id="history" className="text-4xl font-heading font-bold text-secondary-900 mb-6">
                {t('about.storyTitle')}
              </h2>
              <p className="text-lg text-secondary-700 mb-4 leading-relaxed italic">
                "Founded by Muthukumar Sunderrajan, a visionary first-generation entrepreneur. From humble beginnings as 'SUMKA SONS' in 1992, we have evolved into a trusted partner for valve automation across Asia."
              </p>
              <p className="text-lg text-secondary-700 mb-4 leading-relaxed">
                With over 32 years of experience, SUSIN Group has established itself as a leader in manufacturing precision measurement instruments. We combine traditional engineering wisdom with cutting-edge technology to serve critical sectors like Oil & Gas, Power, and Marine industries.
              </p>
              <p className="text-lg text-secondary-700 leading-relaxed">
                Today, SUSIN continues to innovate with smart digital actuators, IoT integration, and Industry 4.0 
                solutions while maintaining our core values of reliability, quality, and service. Our global presence spans India, UAE, Qatar, Germany, and serves all of Asia.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card variant="gradient" hoverable className="p-6 text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">1992</div>
                <div className="text-slate-700 font-semibold">{t('about.kpiFounded')}</div>
              </Card>
              <Card variant="gradient" hoverable className="p-6 text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">100+</div>
                <div className="text-slate-700 font-semibold">{t('about.kpiIndustries')}</div>
              </Card>
              <Card variant="gradient" hoverable className="p-6 text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">3</div>
                <div className="text-slate-700 font-semibold">{t('about.kpiCountries')}</div>
              </Card>
              <Card variant="gradient" hoverable className="p-6 text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">15K+</div>
                <div className="text-slate-700 font-semibold">{t('about.kpiProjects')}</div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-lg flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary-600 mr-3"></div>
              {t('about.journeyLabel')}
              <div className="h-1 w-12 bg-primary-600 ml-3"></div>
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              {t('about.milestonesTitle')}
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              {t('about.milestonesSubtitle')}
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
                    <Card hoverable className="p-6">
                      <div className={`text-4xl font-bold text-primary-600 mb-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        {milestone.year}
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h4>
                      <p className="text-slate-600">{milestone.description}</p>
                    </Card>
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
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border-2 border-blue-200 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                <i className="fas fa-bullseye text-4xl text-white"></i>
              </div>
              <h3 className="text-3xl font-heading font-bold text-secondary-900 mb-4">Our Mission</h3>
              {/* Keep mission content as-is for now */}
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
        </Container>
      </section>

      {/* Leadership Team */}
      <section id="leadership" className="py-20 bg-secondary-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">{t('about.leadershipTitle')}</h2>
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
        </Container>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">{t('about.mfgTitle')}</h2>
            <p className="text-xl text-secondary-600">{t('about.mfgSubtitle')}</p>
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
        </Container>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-br from-secondary-900 to-secondary-800 text-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">{t('about.awardsTitle')}</h2>
            <p className="text-xl text-secondary-200">{t('about.awardsSubtitle')}</p>
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
        </Container>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">{t('about.certsTitle')}</h2>
            <p className="text-xl text-secondary-600">{t('about.certsSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "ISO 9001:2015", desc: "Quality Management System", icon: "fa-certificate", color: "from-blue-600 to-blue-700" },
              { name: "ATEX Zone 1 & 2", desc: "Explosion-Proof Certification", icon: "fa-shield-alt", color: "from-orange-600 to-orange-700" },
              { name: "SIL 2 & SIL 3", desc: "Safety Integrity Level", icon: "fa-lock", color: "from-red-600 to-red-700" },
              { name: "ISO 5211", desc: "Mounting Interface Standard", icon: "fa-cog", color: "from-purple-600 to-purple-700" },
              { name: "API 60 & API 609", desc: "Petroleum Industry Standards", icon: "fa-industry", color: "from-indigo-600 to-indigo-700" },
              { name: "IP67 / IP68", desc: "Ingress Protection Rating", icon: "fa-water", color: "from-cyan-600 to-cyan-700" },
              { name: "PED Certified", desc: "Pressure Equipment Directive", icon: "fa-compress", color: "from-teal-600 to-teal-700" },
              { name: "CE Marked", desc: "European Conformity", icon: "fa-check-circle", color: "from-green-600 to-green-700" },
              { name: "RoHS Compliant", desc: "Restriction of Hazardous Substances", icon: "fa-leaf", color: "from-emerald-600 to-emerald-700" },
              { name: "NACE MR0175", desc: "Corrosion Resistance Standard", icon: "fa-shield", color: "from-slate-600 to-slate-700" }
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
        </Container>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-secondary-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">{t('about.globalTitle')}</h2>
            <p className="text-xl text-secondary-600">{t('about.globalSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link to="/global/india" className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-map-marker-alt text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">India</h3>
              <p className="text-primary-600 font-semibold mb-4">Headquarters - Coimbatore</p>
              <p className="text-sm text-secondary-600 mb-4">Manufacturing facility and engineering center</p>
              <div className="text-primary-600 font-semibold group-hover:underline">{t('about.viewDetails')} <i className="fas fa-arrow-right ml-2"></i></div>
            </Link>
            <Link to="/global/uae" className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-map-marker-alt text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">UAE</h3>
              <p className="text-primary-600 font-semibold mb-4">Regional Office - Dubai</p>
              <p className="text-sm text-secondary-600 mb-4">Sales and service center for Middle East</p>
              <div className="text-primary-600 font-semibold group-hover:underline">{t('about.viewDetails')} <i className="fas fa-arrow-right ml-2"></i></div>
            </Link>
            <Link to="/global/qatar" className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-100 hover:border-primary-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-map-marker-alt text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">Qatar</h3>
              <p className="text-primary-600 font-semibold mb-4">Branch Office - Doha</p>
              <p className="text-sm text-secondary-600 mb-4">Local support and technical services</p>
              <div className="text-primary-600 font-semibold group-hover:underline">{t('about.viewDetails')} <i className="fas fa-arrow-right ml-2"></i></div>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <Container className="text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">{t('about.ctaTitle')}</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">{t('about.ctaSubtitle')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-primary-700 hover:bg-secondary-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all inline-flex items-center"
            >
              <i className="fas fa-envelope mr-2"></i>
              {t('about.ctaContact')}
            </Link>
            <Link 
              to="/products" 
              className="bg-primary-800 hover:bg-primary-900 px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 transition-all inline-flex items-center"
            >
              <i className="fas fa-cogs mr-2"></i>
              {t('about.ctaExplore')}
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
