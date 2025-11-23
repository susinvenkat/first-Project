import { Link } from 'react-router-dom';

export default function India() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">India Operations</h1>
          <p className="text-xl">Headquarters & Manufacturing Facility</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">SUSIN iTORK India Pvt. Ltd.</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our Indian facility serves as the global headquarters and main manufacturing center, 
                equipped with state-of-the-art production lines and quality control systems.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-4">Contact Information</h4>
                <p className="mb-2"><i className="fas fa-map-marker-alt text-primary mr-2"></i>Coimbatore, Tamil Nadu, India</p>
                <p className="mb-2"><i className="fas fa-phone text-primary mr-2"></i>+91 77080 97242</p>
                <p className="mb-2"><i className="fas fa-envelope text-primary mr-2"></i>info@susin.in</p>
              </div>
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
