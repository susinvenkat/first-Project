import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex items-center space-x-6">
            <a href="tel:+971543074131" className="flex items-center text-sm text-gray-600 hover:text-primary">
              <i className="fas fa-phone mr-2"></i>
              +971 54 307 4131
            </a>
            <a href="mailto:info@susin.in" className="flex items-center text-sm text-gray-600 hover:text-primary">
              <i className="fas fa-envelope mr-2"></i>
              info@susin.in
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-sm text-gray-700">
                  <i className="fas fa-user-circle text-lg"></i>
                  <span>{user.full_name}</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-dashboard mr-2"></i>Dashboard
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-user mr-2"></i>Profile
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center space-x-2 text-sm text-gray-700 hover:text-primary"
              >
                <i className="fas fa-user"></i>
                <span>Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Susin Group" className="h-12" />
            <div>
              <h1 className="text-2xl font-bold text-primary">SUSIN GROUP</h1>
              <p className="text-xs text-gray-600">Engineering Excellence Since 2000</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-6">
            <li><Link to="/" className="text-gray-700 hover:text-primary font-medium">Home</Link></li>
            <li className="relative group">
              <button className="text-gray-700 hover:text-primary font-medium flex items-center">
                Products <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <ul className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <li><Link to="/products/mep" className="block px-4 py-2 hover:bg-gray-100">MEP Contracting</Link></li>
                <li><Link to="/products/hvac" className="block px-4 py-2 hover:bg-gray-100">HVAC Systems</Link></li>
                <li><Link to="/products/fire-fighting" className="block px-4 py-2 hover:bg-gray-100">Fire Fighting</Link></li>
                <li><Link to="/products/plumbing" className="block px-4 py-2 hover:bg-gray-100">Plumbing Services</Link></li>
                <li><Link to="/products/electrical" className="block px-4 py-2 hover:bg-gray-100">Electrical Works</Link></li>
              </ul>
            </li>
            <li className="relative group">
              <button className="text-gray-700 hover:text-primary font-medium flex items-center">
                Global Presence <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <ul className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <li><Link to="/global/india" className="block px-4 py-2 hover:bg-gray-100">India</Link></li>
                <li><Link to="/global/uae" className="block px-4 py-2 hover:bg-gray-100">UAE</Link></li>
                <li><Link to="/global/qatar" className="block px-4 py-2 hover:bg-gray-100">Qatar</Link></li>
              </ul>
            </li>
            <li><Link to="/careers" className="text-gray-700 hover:text-primary font-medium">Careers</Link></li>
            <li><Link to="/contact" className="text-gray-700 hover:text-primary font-medium">Contact</Link></li>
          </ul>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden text-2xl text-gray-700">
            <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <ul className="space-y-2">
              <li><Link to="/" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/products/mep" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>MEP Contracting</Link></li>
              <li><Link to="/products/hvac" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>HVAC Systems</Link></li>
              <li><Link to="/products/fire-fighting" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Fire Fighting</Link></li>
              <li><Link to="/products/plumbing" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Plumbing Services</Link></li>
              <li><Link to="/products/electrical" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Electrical Works</Link></li>
              <li><Link to="/global/india" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>India Office</Link></li>
              <li><Link to="/global/uae" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>UAE Office</Link></li>
              <li><Link to="/global/qatar" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Qatar Office</Link></li>
              <li><Link to="/careers" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Careers</Link></li>
              <li><Link to="/contact" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Contact</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
