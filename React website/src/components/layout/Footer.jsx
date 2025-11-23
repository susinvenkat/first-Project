import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">SUSIN GROUP</h3>
            <p className="text-sm mb-4">Leading MEP contracting and engineering solutions provider with global presence.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-primary"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-primary"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-primary"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/products/mep" className="hover:text-primary">Products</Link></li>
              <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products/mep" className="hover:text-primary">MEP Contracting</Link></li>
              <li><Link to="/products/hvac" className="hover:text-primary">HVAC Systems</Link></li>
              <li><Link to="/products/fire-fighting" className="hover:text-primary">Fire Fighting Systems</Link></li>
              <li><Link to="/products/plumbing" className="hover:text-primary">Plumbing Services</Link></li>
              <li><Link to="/products/electrical" className="hover:text-primary">Electrical Works</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span>UAE Office: Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-2"></i>
                <span>+971 54 307 4131</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-2"></i>
                <span>info@susin.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Susin Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
