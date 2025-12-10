import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import GradientText from '../components/ui/GradientText';
import SEO from '../components/common/SEO';
import LazyImage from '../components/common/LazyImage';
import { useLanguage } from '../context/LanguageContext';

export default function HomeAdvanced() {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // SEO Structured Data
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SUSIN iTORK",
    "url": "https://susiniTORK.com",
    "logo": "/assets/img/logo.png",
    "description": "Leading manufacturer of industrial actuators and valve automation solutions",
    "foundingDate": "1992",
    "address": [
      {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressLocality": "Mumbai"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "telephone": "+91-22-XXXX-XXXX",
      "email": "sales@susitork.com"
    }
  };

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      // Scroll handler for future parallax effects
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slides configuration (kept for future carousel implementation)
  // const slides = [...]

  const features = [
    {
      icon: "fa-bolt",
      title: t('home.features.fastTitle'),
      description: t('home.features.fastDesc'),
      color: "from-yellow-400 to-orange-600"
    },
    {
      icon: "fa-shield",
      title: t('home.features.shieldTitle'),
      description: t('home.features.shieldDesc'),
      color: "from-red-400 to-pink-600"
    },
    {
      icon: "fa-brain",
      title: t('home.features.aiTitle'),
      description: t('home.features.aiDesc'),
      color: "from-purple-400 to-indigo-600"
    },
    {
      icon: "fa-globe",
      title: t('home.features.globeTitle'),
      description: t('home.features.globeDesc'),
      color: "from-blue-400 to-cyan-600"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Offshore Drilling Inc",
      rating: 5,
      text: "Outstanding reliability. Their systems have reduced our downtime by 40%."
    },
    {
      name: "Ahmed Al-Mansouri",
      company: "Gulf Energy Corp",
      rating: 5,
      text: "Best actuators in the market. Technical support is exceptional."
    },
    {
      name: "Hans Mueller",
      company: "European Power Systems",
      rating: 5,
      text: "32 years of proven excellence. We trust them completely."
    }
  ];

  const caseStudies = [
    {
      title: "FPSO Platform Automation",
      industry: "Oil & Gas",
      result: "99.8% Uptime",
      icon: "fa-ship"
    },
    {
      title: "Power Plant Valve Control",
      industry: "Energy",
      result: "50% Cost Reduction",
      icon: "fa-plug"
    },
    {
      title: "Water Treatment Excellence",
      industry: "Environmental",
      result: "100K+ Gallons/Day",
      icon: "fa-water"
    }
  ];

  return (
    <>
      <SEO
        title={t('home.seoTitle')}
        description={t('home.seoDesc')}
        keywords={t('home.seoKeywords')}
        image="/assets/img/products/pneumatic/hd-actuator-main.png"
        structuredData={homeStructuredData}
      />

      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-100 text-secondary-900 overflow-hidden">
        
        {/* HERO SECTION - Advanced Parallax */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 text-white rounded-b-[32px] shadow-2xl shadow-primary-200/40">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-primary-600/20 rounded-full blur-3xl -top-40 -left-40 animate-float"></div>
            <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -bottom-40 -right-40 animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl top-1/2 left-1/2 animate-float" style={{animationDelay: '4s'}}></div>
          </div>

          {/* Content */}
          <Container className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text Content */}
              <div className="space-y-8">
                <Badge variant="primary" size="lg" icon="fas fa-bolt" className="animate-pulse-ring">
                  {t('home.badge')}
                </Badge>

                <h1 className="text-7xl lg:text-8xl font-bold leading-tight">
                  <GradientText 
                    from="from-primary-400" 
                    via="via-blue-400" 
                    to="to-cyan-400"
                    animate={true}
                  >
                    {t('home.title1')}
                  </GradientText>
                  <br />
                  {t('home.title2')}
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-xl">{t('home.subtitle')}</p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button as={Link} to="/products" variant="primary" size="lg" className="gap-2 shadow-glow">
                    {t('home.ctaExplore')} <i className="fas fa-arrow-right"></i>
                  </Button>
                  <Button as={Link} to="/contact" variant="outline" size="lg" className="gap-2 border-slate-400 text-white hover:text-white/90">
                    {t('home.ctaConsult')} <i className="fas fa-phone"></i>
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-12 border-t border-slate-700">
                  <div>
                    <div className="text-4xl font-bold text-primary-400">32+</div>
                    <div className="text-sm text-slate-400">{t('home.statYears')}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-400">100+</div>
                    <div className="text-sm text-slate-400">{t('home.statIndustries')}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-cyan-400">99.8%</div>
                    <div className="text-sm text-slate-400">{t('home.statUptime')}</div>
                  </div>
                </div>
              </div>

              {/* Right - Hero Image with Glow */}
              <div className="relative h-[600px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 to-blue-600/30 rounded-3xl blur-2xl"></div>
                <div 
                  className="relative w-full h-full rounded-3xl overflow-hidden border border-primary-500/30 backdrop-blur-xl"
                  style={{
                    transform: `perspective(1000px) rotateY(${(mousePos.x - window.innerWidth / 2) * 0.02}deg) rotateX(${-(mousePos.y - window.innerHeight / 2) * 0.02}deg)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <LazyImage 
                    src="/assets/img/products/pneumatic/hd-actuator-main.png" 
                    alt="Advanced Actuator Technology"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </Container>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm text-slate-400">{t('home.scroll')}</span>
              <i className="fas fa-chevron-down text-primary-400 text-2xl"></i>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24 relative">
          <Container>
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                {t('home.whyChoose')} <GradientText from="from-primary-400" to="to-blue-400">SUSIN iTORK</GradientText>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">{t('home.whySubtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <Card 
                  key={idx}
                  variant="dark"
                  className="bg-slate-800/50 backdrop-blur border-slate-700 hover:border-primary-500/50 p-8 group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${feature.icon} text-2xl text-white`}></i>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* PRODUCTS SHOWCASE */}
        <section className="py-24 relative">
          <Container>
            <h2 className="text-5xl lg:text-6xl font-bold mb-20 text-center">
              {t('home.portfolio')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t('home.product.pneumatic'), range: t('home.product.pneumaticRange'), icon: "fa-wind", color: "from-blue-500 to-cyan-600" },
                { title: t('home.product.electroHydraulic'), range: t('home.product.electroHydraulicRange'), icon: "fa-tint", color: "from-purple-500 to-pink-600" },
                { title: t('home.product.electrical'), range: t('home.product.electricalRange'), icon: "fa-bolt", color: "from-yellow-500 to-orange-600" },
                { title: t('home.product.gearboxes'), range: t('home.product.gearboxesRange'), icon: "fa-cogs", color: "from-green-500 to-emerald-600" }
              ].map((prod, idx) => (
                <Card
                  key={idx}
                  as={Link}
                  to="/products"
                  variant="dark"
                  className="bg-slate-800/50 backdrop-blur border-slate-700 hover:border-primary-500/50 overflow-hidden group"
                >
                  <div className={`h-40 bg-gradient-to-br ${prod.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-500">
                      <i className={`fas ${prod.icon} text-6xl text-white/20 absolute -right-10 -bottom-10`}></i>
                    </div>
                    <i className={`fas ${prod.icon} text-5xl text-white relative z-10`}></i>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-primary-400 font-semibold mb-4">{prod.range}</p>
                    <div className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors">
                      {t('home.product.explore')}
                      <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 relative">
          <Container>
            <h2 className="text-5xl lg:text-6xl font-bold mb-20 text-center">
              {t('home.trustedBy')}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((test, idx) => (
                <Card
                  key={idx}
                  variant="dark"
                  className="bg-slate-800/50 backdrop-blur border-slate-700 hover:border-primary-500/50 p-8"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-primary-400"></i>
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 text-lg leading-relaxed">"{test.text}"</p>
                  <div className="border-t border-slate-700 pt-4">
                    <p className="font-bold text-primary-400">{test.name}</p>
                    <p className="text-slate-400 text-sm">{test.company}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CASE STUDIES */}
        <section className="py-24 relative">
          <Container>
            <h2 className="text-5xl lg:text-6xl font-bold mb-20 text-center">
              {t('home.successStories')}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.map((study, idx) => (
                <Card
                  key={idx}
                  variant="dark"
                  className="group bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-primary-500/50 p-8 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 to-blue-600/0 group-hover:from-primary-600/10 group-hover:to-blue-600/10 transition-all"></div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-primary-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/30 transition-all">
                      <i className={`fas ${study.icon} text-3xl text-primary-400`}></i>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                    <p className="text-slate-400 mb-4">{study.industry}</p>
                    <div className="text-4xl font-bold text-primary-400 group-hover:text-primary-300 transition-colors">
                      {study.result}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 relative">
          <Container>
            <Card 
              variant="gradient"
              className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 p-16 text-center relative overflow-hidden border-0"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl -top-40 -left-40"></div>
                <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl -bottom-40 -right-40"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-5xl font-bold mb-6">{t('home.ctaTitle')}</h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">{t('home.ctaSubtitle')}</p>

                <div className="flex flex-wrap justify-center gap-6">
                  <Button
                    as={Link}
                    to="/contact"
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-slate-100 font-bold rounded-full gap-2 px-10 py-4 group shadow-glow"
                  >
                    {t('home.ctaSchedule')}
                    <i className="fas fa-calendar group-hover:scale-110 transition-transform"></i>
                  </Button>
                  <Button
                    as={Link}
                    to="/products"
                    variant="outline"
                    size="lg"
                    className="bg-white/20 backdrop-blur text-white border-white/30 hover:bg-white/30 font-bold rounded-full gap-2 px-10 py-4 group"
                  >
                    {t('home.ctaCatalog')}
                    <i className="fas fa-book group-hover:translate-x-1 transition-transform"></i>
                  </Button>
                </div>
              </div>
            </Card>
          </Container>
        </section>

        {/* FOOTER CTA */}
        <section className="py-16 border-t border-slate-700">
          <Container className="text-center">
            <h3 className="text-3xl font-bold mb-4">{t('home.footerCtaTitle')}</h3>
            <p className="text-slate-400 mb-8">{t('home.footerCtaSubtitle')}</p>
            <Button
              as={Link}
              to="/contact"
              variant="primary"
              size="lg"
              className="gap-2 rounded-full group shadow-glow"
            >
              <i className="fas fa-phone"></i>
              {t('home.footerCtaButton')}
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </Button>
          </Container>
        </section>
      </div>
    </>
  );
}
