import { Link } from 'react-router-dom';

export default function UAE() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">UAE Operations</h1>
          <p className="text-xl">Middle East Regional Office</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">SUSIN Middle East</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our Dubai office provides comprehensive sales, service, and technical support 
                for clients across the Middle East region.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-4">Contact Information</h4>
                <p className="mb-2"><i className="fas fa-map-marker-alt text-primary mr-2"></i>Dubai, United Arab Emirates</p>
                <p className="mb-2"><i className="fas fa-phone text-primary mr-2"></i>+971 54 307 4131</p>
                <p className="mb-2"><i className="fas fa-envelope text-primary mr-2"></i>dubai@susin.in</p>
              </div>
              <Link to="/contact" className="btn-primary inline-flex items-center">
                <i className="fas fa-envelope mr-2"></i>Contact UAE Office
              </Link>
            </div>
            <div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-8 mb-6">
                <h3 className="text-2xl font-bold mb-4">Services</h3>
                <ul className="space-y-3">
                  {[
                    "Sales & Distribution",
                    "Technical Consultation",
                    "Installation Support",
                    "Maintenance Services",
                    "Spare Parts Supply",
                    "24/7 Emergency Support"
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
