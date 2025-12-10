import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import GradientText from '../../components/ui/GradientText';
import Container from '../../components/common/Container';
import Button from '../../components/ui/Button';

export default function India() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-secondary-900">
      <section className="relative py-24 bg-gradient-to-br from-secondary-900 via-primary-900 to-secondary-800 text-white overflow-hidden rounded-b-[32px] shadow-2xl shadow-primary-200/40">
        <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] opacity-5"></div>
        <Container className="relative z-10 text-center">
          <Badge variant="warning" size="lg" icon="fas fa-flag" className="mb-6">
            Headquarters
          </Badge>
          <h1 className="text-5xl font-bold mb-6">
            <GradientText from="from-orange-400" via="via-red-400" to="to-pink-400" animate={true}>
              India Operations
            </GradientText>
          </h1>
          <p className="text-xl text-orange-100">Headquarters & Manufacturing Facility</p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Susin Group - India</h2>
              <p className="text-lg text-secondary-700 mb-6">
                Our Indian facility serves as the global headquarters and main manufacturing center, 
                equipped with state-of-the-art production lines and quality control systems.
              </p>
              <Card className="bg-secondary-50 p-6 mb-6">
                <h4 className="font-bold text-secondary-900 mb-4">Contact Information</h4>
                <p className="mb-2 text-secondary-700"><i className="fas fa-map-marker-alt text-primary-600 mr-2"></i>Coimbatore, Tamil Nadu, India</p>
                <p className="mb-2 text-secondary-700"><i className="fas fa-phone text-primary-600 mr-2"></i>+91 77080 97242</p>
                <p className="mb-2 text-secondary-700"><i className="fas fa-envelope text-primary-600 mr-2"></i>info@susin.in</p>
              </Card>
              <Link to="/contact" className="btn-primary inline-flex items-center">
                <i className="fas fa-envelope mr-2"></i>Contact India Office
              </Link>
            </div>
            <div>
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-8 mb-6">
                <h3 className="text-2xl font-bold mb-4">Capabilities</h3>
                <ul className="space-y-3">
                  {[
                    "Manufacturing & Assembly",
                    "Quality Control & Testing",
                    "R&D and Engineering",
                    "Technical Support",
                    "Training Services",
                    "After-Sales Service"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <i className="fas fa-check-circle text-green-600 mr-3"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
