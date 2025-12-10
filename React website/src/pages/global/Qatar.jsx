import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import GradientText from '../../components/ui/GradientText';
import Container from '../../components/common/Container';
import Button from '../../components/ui/Button';

export default function Qatar() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-secondary-900">
      <section className="bg-gradient-to-r from-secondary-900 via-primary-900 to-secondary-800 text-white py-20 rounded-b-[32px] shadow-2xl shadow-primary-200/40">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Qatar Operations</h1>
          <p className="text-xl text-primary-100">Local Support & Services</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">SUSIN Qatar</h2>
              <p className="text-lg text-secondary-700 mb-6">
                Our Qatar office provides local support and technical services for 
                oil & gas, power, and industrial projects across the country.
              </p>
              <Card className="bg-secondary-50 p-6 mb-6">
                <h4 className="font-bold text-secondary-900 mb-4">Contact Information</h4>
                <p className="mb-2 text-secondary-700"><i className="fas fa-map-marker-alt text-primary-600 mr-2"></i>Doha, Qatar</p>
                <p className="mb-2 text-secondary-700"><i className="fas fa-envelope text-primary-600 mr-2"></i>qatar@susin.in</p>
              </Card>
              <Link to="/contact" className="btn-primary inline-flex items-center">
                <i className="fas fa-envelope mr-2"></i>Contact Qatar Office
              </Link>
            </div>
            <div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-8 mb-6">
                <h3 className="text-2xl font-bold mb-4">Local Support</h3>
                <ul className="space-y-3">
                  {[
                    "Project Consultation",
                    "On-Site Technical Support",
                    "Commissioning Services",
                    "Preventive Maintenance",
                    "Emergency Repairs",
                    "Training Programs"
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
