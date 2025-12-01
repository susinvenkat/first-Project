import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ProductSearch from '../common/ProductSearch';
import LanguageSelector from '../common/LanguageSelector';
import FAQChatbot from '../common/FAQChatbot';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActivePath = (path) => location.pathname === path;

  const handleDropdownOpen = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-primary-100/50' : 'bg-white shadow-md'
    }`} style={isScrolled ? { 
      backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.98), rgba(255,255,255,0.95))',
      backdropFilter: 'blur(20px) saturate(180%)'
    } : {}}>      
      {/* Top Bar */}
      <div className="relative bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-900 text-white text-sm overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-primary-500/20 to-primary-600/10 animate-gradient-x"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center space-x-6">
              <span className="flex items-center group cursor-default">
                <i className="fas fa-certificate mr-2 text-primary-400 group-hover:rotate-12 transition-transform"></i>
                <span className="hidden sm:inline">ISO 9001:2015 Certified</span>
              </span>
              <span className="hidden md:flex items-center group cursor-default">
                <i className="fas fa-award mr-2 text-primary-400 group-hover:scale-110 transition-transform"></i>
                32+ Years of Excellence
              </span>
              <span className="hidden lg:flex items-center group cursor-default">
                <i className="fas fa-globe mr-2 text-primary-400 group-hover:rotate-12 transition-transform"></i>
                Global Presence: India • UAE • Qatar
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="tel:+917708097242" className="hover:text-primary-300 transition-colors flex items-center group">
                <i className="fas fa-phone mr-2 group-hover:animate-pulse"></i>
                <span className="hidden sm:inline font-medium">+91 77080 97242</span>
              </a>
              <a href="mailto:info@susin.in" className="hover:text-primary-300 transition-colors flex items-center group">
                <i className="fas fa-envelope mr-2 group-hover:scale-110 transition-transform"></i>
                <span className="hidden sm:inline font-medium">info@susin.in</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 lg:px-6">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3 group relative">
            <div className="relative">
              {/* Glow effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-all duration-500 animate-pulse-slow"></div>
              <img 
                src="/assets/img/susin-logo.svg" 
                alt="Susin Group Logo" 
                className="h-14 w-14 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-lg group-hover:drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 8px rgba(37, 99, 235, 0.3))' }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent group-hover:from-primary-500 group-hover:via-primary-600 group-hover:to-primary-700 transition-all duration-300">
                Susin Group
              </h1>
              <p className="text-xs text-secondary-600 font-medium group-hover:text-primary-600 transition-colors duration-300">Industrial Actuators & Automation</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-6">
            <li><Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link></li>
            
            <li className="relative group">
              <button className="text-gray-700 hover:text-primary-600 font-medium flex items-center transition-colors">
                Products<i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-secondary-100 z-50">
                <div className="p-5">
                  <h4 className="font-bold text-secondary-900 mb-3 text-sm uppercase tracking-wide border-b pb-2">Actuators</h4>
                  <ul className="space-y-1">
                    <li><Link to="/products#pneumatic" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-wind mr-2 text-primary-600"></i>Pneumatic Actuators</Link></li>
                    <li><Link to="/products#electro-hydraulic" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-tint mr-2 text-primary-600"></i>Electro-Hydraulic</Link></li>
                    <li><Link to="/products#electrical" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-bolt mr-2 text-primary-600"></i>Electrical Actuators</Link></li>
                  </ul>
                  <h4 className="font-bold text-secondary-900 mt-4 mb-3 text-sm uppercase tracking-wide border-b pb-2">Motion Control</h4>
                  <ul className="space-y-1">
                    <li><Link to="/products#gearboxes" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-cog mr-2 text-primary-600"></i>Gearboxes</Link></li>
                    <li><Link to="/products#accessories" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-puzzle-piece mr-2 text-primary-600"></i>Accessories & Controls</Link></li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="relative group">
              <button className="text-gray-700 hover:text-primary-600 font-medium flex items-center transition-colors">
                Solutions<i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-secondary-100 z-50">
                <div className="p-5">
                  <h4 className="font-bold text-secondary-900 mb-3 text-sm uppercase tracking-wide border-b pb-2">Industries</h4>
                  <ul className="space-y-1">
                    <li><Link to="/industries#oil-gas" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-fire mr-2 text-primary-600"></i>Oil & Gas</Link></li>
                    <li><Link to="/industries#water" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-water mr-2 text-primary-600"></i>Water & Wastewater</Link></li>
                    <li><Link to="/industries#power" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-plug mr-2 text-primary-600"></i>Power Generation</Link></li>
                    <li><Link to="/industries#chemical" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-flask mr-2 text-primary-600"></i>Chemical & Petrochemical</Link></li>
                    <li><Link to="/industries#marine" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-ship mr-2 text-primary-600"></i>Marine & Offshore</Link></li>
                    <li><Link to="/industries#mining" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-gem mr-2 text-primary-600"></i>Mining & Minerals</Link></li>
                  </ul>
                  <h4 className="font-bold text-secondary-900 mt-4 mb-3 text-sm uppercase tracking-wide border-b pb-2">Integrated Solutions</h4>
                  <ul className="space-y-1">
                    <li><Link to="/services#vac" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-tools mr-2 text-primary-600"></i>Valve Automation Center</Link></li>
                    <li><Link to="/services#control" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-sliders-h mr-2 text-primary-600"></i>Control Solutions</Link></li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="relative group">
              <button className="text-gray-700 hover:text-primary-600 font-medium flex items-center transition-colors">
                Services<i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-secondary-100 z-50">
                <div className="p-5">
                  <h4 className="font-bold text-secondary-900 mb-3 text-sm uppercase tracking-wide border-b pb-2">Aftermarket Services</h4>
                  <ul className="space-y-1">
                    <li><Link to="/services#installation" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-wrench mr-2 text-primary-600"></i>Installation & Commissioning</Link></li>
                    <li><Link to="/services#mro" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-tools mr-2 text-primary-600"></i>Maintenance & Repair (MRO)</Link></li>
                    <li><Link to="/services#training" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-graduation-cap mr-2 text-primary-600"></i>Technical Training</Link></li>
                    <li><Link to="/services#modernization" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-sync-alt mr-2 text-primary-600"></i>Retrofit & Modernization</Link></li>
                  </ul>
                  <h4 className="font-bold text-secondary-900 mt-4 mb-3 text-sm uppercase tracking-wide border-b pb-2">Support</h4>
                  <ul className="space-y-1">
                    <li><Link to="/services#support" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-headset mr-2 text-primary-600"></i>Technical Support</Link></li>
                    <li><Link to="/services#warranty" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-shield-alt mr-2 text-primary-600"></i>Warranty & Service Plans</Link></li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="relative group">
              <button className="text-gray-700 hover:text-primary-600 font-medium flex items-center transition-colors">
                Resources<i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-secondary-100 z-50">
                <div className="p-5">
                  <h4 className="font-bold text-secondary-900 mb-3 text-sm uppercase tracking-wide border-b pb-2">Knowledge Center</h4>
                  <ul className="space-y-1">
                    <li><Link to="/resources#catalogs" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-book mr-2 text-primary-600"></i>Product Catalogs</Link></li>
                    <li><Link to="/resources#datasheets" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-file-pdf mr-2 text-primary-600"></i>Technical Data Sheets</Link></li>
                    <li><Link to="/resources#cad" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-cube mr-2 text-primary-600"></i>CAD Models & Drawings</Link></li>
                    <li><Link to="/resources#certificates" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-certificate mr-2 text-primary-600"></i>Certifications</Link></li>
                    <li><Link to="/resources#case-studies" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-clipboard-check mr-2 text-primary-600"></i>Case Studies</Link></li>
                    <li><Link to="/resources#videos" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-video mr-2 text-primary-600"></i>Videos & Webinars</Link></li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="relative group">
              <button className="text-gray-700 hover:text-primary-600 font-medium flex items-center transition-colors">
                Company<i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-secondary-100 z-50">
                <div className="p-5">
                  <ul className="space-y-1">
                    <li><Link to="/about" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-building mr-2 text-primary-600"></i>About Susin</Link></li>
                    <li><Link to="/about#leadership" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-users mr-2 text-primary-600"></i>Leadership Team</Link></li>
                    <li><Link to="/about#history" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-history mr-2 text-primary-600"></i>Our History</Link></li>
                    <li><Link to="/about#certifications" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-award mr-2 text-primary-600"></i>Quality & Certifications</Link></li>
                    <li><Link to="/sustainability" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-leaf mr-2 text-primary-600"></i>Sustainability</Link></li>
                    <li><Link to="/careers" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-briefcase mr-2 text-primary-600"></i>Careers</Link></li>
                    <li><Link to="/contact" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-envelope mr-2 text-primary-600"></i>Contact Us</Link></li>
                  </ul>
                  <h4 className="font-bold text-secondary-900 mt-4 mb-3 text-sm uppercase tracking-wide border-b pb-2">Global Presence</h4>
                  <ul className="space-y-1">
                    <li><Link to="/global/india" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-map-marker-alt mr-2 text-primary-600"></i>India</Link></li>
                    <li><Link to="/global/uae" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-map-marker-alt mr-2 text-primary-600"></i>UAE</Link></li>
                    <li><Link to="/global/qatar" className="block px-3 py-2 hover:bg-primary-50 rounded text-sm transition-colors"><i className="fas fa-map-marker-alt mr-2 text-primary-600"></i>Qatar</Link></li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Product Search */}
            <ProductSearch />

            {/* Language Selector */}
            <LanguageSelector />

            {/* Login/User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-colors p-2">
                  <i className="fas fa-user-circle text-xl"></i>
                  <span className="text-sm font-medium">{user.full_name}</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border-2 border-primary-500 z-50">
                  <div className="p-2">
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-primary-50 rounded-lg transition-colors">
                      <i className="fas fa-tachometer-alt mr-2 text-primary-600"></i>Dashboard
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-primary-50 rounded-lg transition-colors">
                      <i className="fas fa-sign-out-alt mr-2 text-red-600"></i>Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/backend/auth/login.php"
                className="flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-colors p-2"
                title="Login"
              >
                <i className="fas fa-user-circle text-xl"></i>
                <span className="text-sm font-medium hidden xl:inline">Login</span>
              </Link>
            )}

            <div className="h-8 w-px bg-secondary-300"></div>

            <Link to="/contact#quote" className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-5 py-2.5 rounded-lg flex items-center shadow-md hover:shadow-lg transition-all font-semibold">
              <i className="fas fa-file-invoice-dollar mr-2"></i>
              Get Quote
            </Link>
            <a href="tel:+917708097242" className="text-secondary-700 hover:text-primary-600 flex items-center font-medium transition-colors">
              <i className="fas fa-phone-alt mr-2"></i>
              <span className="hidden xl:inline">+91 77080 97242</span>
            </a>
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
              <li><Link to="/services" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-tools mr-2"></i>Services</Link></li>
              <li><Link to="/resources" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-book mr-2"></i>Resources</Link></li>
              <li><Link to="/global/india" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-map-marker-alt mr-2"></i>India</Link></li>
              <li><Link to="/global/uae" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-map-marker-alt mr-2"></i>UAE</Link></li>
              <li><Link to="/global/qatar" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-map-marker-alt mr-2"></i>Qatar</Link></li>
              <li><Link to="/about" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-building mr-2"></i>About</Link></li>
              <li><Link to="/sustainability" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-leaf mr-2"></i>Sustainability</Link></li>
              <li><Link to="/careers" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-briefcase mr-2"></i>Careers</Link></li>
              <li><Link to="/contact" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-envelope mr-2"></i>Contact</Link></li>
              {!user && (
                <li><Link to="/backend/auth/login.php" className="block py-2 text-primary-700 font-semibold" onClick={toggleMenu}><i className="fas fa-user-circle mr-2"></i>Login</Link></li>
              )}
              {user && (
                <>
                  <li><Link to="/dashboard" className="block py-2 text-gray-700" onClick={toggleMenu}><i className="fas fa-tachometer-alt mr-2"></i>Dashboard</Link></li>
                  <li><button onClick={() => { handleLogout(); toggleMenu(); }} className="w-full text-left py-2 text-red-600"><i className="fas fa-sign-out-alt mr-2"></i>Logout</button></li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* FAQ Chatbot - Global Component */}
      <FAQChatbot />
    </header>
  );
}
