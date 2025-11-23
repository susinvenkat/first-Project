import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <i className="fas fa-shield-check mr-2"></i>
                ISO 9001:2015 Certified
              </span>
              <span className="hidden md:flex items-center">
                <i className="fas fa-award mr-2"></i>
                32+ Years of Excellence
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="tel:+917708097242" className="hover:text-primary-light">
                <i className="fas fa-phone mr-2"></i>
                <span className="hidden sm:inline">+91 77080 97242</span>
              </a>
              <a href="mailto:info@susin.in" className="hover:text-primary-light">
                <i className="fas fa-envelope mr-2"></i>
                <span className="hidden sm:inline">info@susin.in</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-14 w-14 bg-gradient-to-br from-primary to-red-700 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-2xl">Si</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">SUSIN GROUP</h1>
              <p className="text-xs text-gray-600">Valve Automation Solutions</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-6">
            <li><Link to="/" className="text-gray-700 hover:text-primary font-medium flex items-center">
              <i className="fas fa-home mr-2"></i>Home
            </Link></li>
            
            <li className="relative group">
              <Link to="/products" className="text-gray-700 hover:text-primary font-medium flex items-center">
                <i className="fas fa-cogs mr-2"></i>Products<i className="fas fa-chevron-down ml-1 text-xs"></i>
              </Link>
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Actuators</h4>
                  <ul className="space-y-1">
                    <li><Link to="/products#pneumatic" className="block px-3 py-2 hover:bg-gray-100 rounded"><i className="fas fa-wind mr-2"></i>Pneumatic Actuators</Link></li>
                    <li><Link to="/products#electro-hydraulic" className="block px-3 py-2 hover:bg-gray-100 rounded"><i className="fas fa-tint mr-2"></i>Electro-Hydraulic</Link></li>
                    <li><Link to="/products#electrical" className="block px-3 py-2 hover:bg-gray-100 rounded"><i className="fas fa-bolt mr-2"></i>Electrical Actuators</Link></li>
                  </ul>
                  <h4 className="font-bold text-gray-900 mt-3 mb-2">Motion Control</h4>
                  <ul className="space-y-1">
                    <li><Link to="/products#gearboxes" className="block px-3 py-2 hover:bg-gray-100 rounded"><i className="fas fa-cog mr-2"></i>Gearboxes</Link></li>
                    <li><Link to="/products#accessories" className="block px-3 py-2 hover:bg-gray-100 rounded"><i className="fas fa-puzzle-piece mr-2"></i>Accessories</Link></li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="relative group">
              <Link to="/industries" className="text-gray-700 hover:text-primary font-medium flex items-center">
                <i className="fas fa-industry mr-2"></i>Industries<i className="fas fa-chevron-down ml-1 text-xs"></i>
              </Link>
              <ul className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <li><Link to="/industries#oil-gas" className="block px-4 py-2 hover:bg-gray-100"><i className="fas fa-fire mr-2"></i>Oil & Gas</Link></li>
                <li><Link to="/industries#water" className="block px-4 py-2 hover:bg-gray-100"><i className="fas fa-water mr-2"></i>Water Treatment</Link></li>
                <li><Link to="/industries#power" className="block px-4 py-2 hover:bg-gray-100"><i className="fas fa-plug mr-2"></i>Power Generation</Link></li>
                <li><Link to="/industries#chemical" className="block px-4 py-2 hover:bg-gray-100"><i className="fas fa-flask mr-2"></i>Chemical</Link></li>
                <li><Link to="/industries#marine" className="block px-4 py-2 hover:bg-gray-100"><i className="fas fa-ship mr-2"></i>Marine & Offshore</Link></li>
              </ul>
            </li>

            <li className="relative group">
              <Link to="/global" className="text-gray-700 hover:text-primary font-medium flex items-center">
                <i className="fas fa-globe mr-2"></i>Global<i className="fas fa-chevron-down ml-1 text-xs"></i>
              </Link>
              <ul className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <li><Link to="/global/india" className="block px-4 py-2 hover:bg-gray-100"><i className="fas fa-map-marker-alt mr-2"></i>India</Link></li>
                <li><Link to="/global/uae" className="block px-4 py-2 hover:bg-gray-100"><i className="fas fa-map-marker-alt mr-2"></i>UAE</Link></li>
                <li><Link to="/global/qatar" className="block px-4 py-2 hover:bg-gray-100"><i className="fas fa-map-marker-alt mr-2"></i>Qatar</Link></li>
              </ul>
            </li>

            <li><Link to="/about" className="text-gray-700 hover:text-primary font-medium flex items-center">
              <i className="fas fa-building mr-2"></i>About
            </Link></li>
            <li><Link to="/careers" className="text-gray-700 hover:text-primary font-medium flex items-center">
              <i className="fas fa-briefcase mr-2"></i>Careers
            </Link></li>
            <li><Link to="/contact" className="text-gray-700 hover:text-primary font-medium flex items-center">
              <i className="fas fa-envelope mr-2"></i>Contact
            </Link></li>
          </ul>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/contact#quote" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center">
              <i className="fas fa-file-invoice-dollar mr-2"></i>
              Get Quote
            </Link>
            {user && (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                  <i className="fas fa-user-circle text-xl"></i>
                  <span className="text-sm">{user.full_name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100"><i className="fas fa-tachometer-alt mr-2"></i>Dashboard</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100"><i className="fas fa-sign-out-alt mr-2"></i>Logout</button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden text-2xl text-gray-700">
            <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <ul className="space-y-2">
              <li><Link to="/" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-home mr-2"></i>Home</Link></li>
              <li><Link to="/products" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-cogs mr-2"></i>Products</Link></li>
              <li><Link to="/industries" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-industry mr-2"></i>Industries</Link></li>
              <li><Link to="/global/india" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-map-marker-alt mr-2"></i>India</Link></li>
              <li><Link to="/global/uae" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-map-marker-alt mr-2"></i>UAE</Link></li>
              <li><Link to="/global/qatar" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-map-marker-alt mr-2"></i>Qatar</Link></li>
              <li><Link to="/about" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-building mr-2"></i>About</Link></li>
              <li><Link to="/careers" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-briefcase mr-2"></i>Careers</Link></li>
              <li><Link to="/contact" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-envelope mr-2"></i>Contact</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
