import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/assets/img/susin-logo.svg" 
                alt="Susin Group Logo" 
                className="h-12 w-12"
              />
              <h3 className="text-white text-lg font-bold">SUSIN GROUP</h3>
            </div>
            <p className="text-sm mb-4">Leading provider of industrial actuators and valve automation solutions since 1992.</p>
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
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/products" className="hover:text-primary">Products</Link></li>
              <li><Link to="/industries" className="hover:text-primary">Industries</Link></li>
              <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products#pneumatic" className="hover:text-primary">Pneumatic Actuators</Link></li>
              <li><Link to="/products#electro-hydraulic" className="hover:text-primary">Electro-Hydraulic</Link></li>
              <li><Link to="/products#electrical" className="hover:text-primary">Electrical Actuators</Link></li>
              <li><Link to="/products#gearboxes" className="hover:text-primary">Gearboxes</Link></li>
              <li><Link to="/products#accessories" className="hover:text-primary">Accessories</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span>Coimbatore, Tamil Nadu, India</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-2"></i>
                <span>+91 77080 97242</span>
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
