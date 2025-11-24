import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const products = [
    { 
      name: 'HD Series Pneumatic Actuators', 
      category: 'Pneumatic Actuators',
      description: 'High-performance spring return actuators up to 120,867 Nm',
      link: '/products#pneumatic', 
      icon: 'fa-wind',
      keywords: ['pneumatic', 'air', 'spring return', 'hd series', 'scotch yoke', 'fail-safe'] 
    },
    { 
      name: 'PD Series Pneumatic Actuators', 
      category: 'Pneumatic Actuators',
      description: 'Compact double-acting actuators for space-constrained applications',
      link: '/products#pneumatic', 
      icon: 'fa-wind',
      keywords: ['pneumatic', 'pd series', 'double acting', 'compact', 'air actuator'] 
    },
    { 
      name: 'Electrical Actuators', 
      category: 'Electric Actuators',
      description: 'Smart digital control with IoT integration and remote monitoring',
      link: '/products#electrical', 
      icon: 'fa-bolt',
      keywords: ['electric', 'motor', 'multi-turn', 'quarter-turn', 'modulating', 'smart', 'iot', 'modbus'] 
    },
    { 
      name: 'Electro-Hydraulic Actuators', 
      category: 'Hydraulic Actuators',
      description: 'High torque solutions for heavy-duty valve automation',
      link: '/products#electro-hydraulic', 
      icon: 'fa-tint',
      keywords: ['hydraulic', 'high torque', 'heavy duty', 'subsea', 'offshore', 'marine'] 
    },
    { 
      name: 'Worm Gearboxes', 
      category: 'Gearboxes',
      description: 'Precision motion control with custom gear ratios',
      link: '/products#gearboxes', 
      icon: 'fa-cog',
      keywords: ['gearbox', 'gear', 'worm', 'manual override', 'torque multiplication'] 
    },
    { 
      name: 'Bevel Gearboxes', 
      category: 'Gearboxes',
      description: 'Right-angle drive solutions for complex installations',
      link: '/products#gearboxes', 
      icon: 'fa-cog',
      keywords: ['gearbox', 'bevel', 'right angle', 'gear drive'] 
    },
    { 
      name: 'Control Accessories', 
      category: 'Accessories',
      description: 'Solenoids, limit switches, positioners, and control panels',
      link: '/products#accessories', 
      icon: 'fa-microchip',
      keywords: ['control', 'solenoid', 'limit switch', 'positioner', 'controller', 'accessories'] 
    },
    { 
      name: 'Oil & Gas Solutions', 
      category: 'Industries',
      description: 'FPSO, refineries, pipelines, and LNG terminals',
      link: '/industries#oil-gas', 
      icon: 'fa-fire',
      keywords: ['oil', 'gas', 'fpso', 'refinery', 'pipeline', 'lng', 'upstream', 'downstream'] 
    },
    { 
      name: 'Water Treatment', 
      category: 'Industries',
      description: 'Municipal water, wastewater, and desalination plants',
      link: '/industries#water', 
      icon: 'fa-water',
      keywords: ['water', 'wastewater', 'desalination', 'municipal', 'filtration', 'sewage'] 
    },
    { 
      name: 'Power Generation', 
      category: 'Industries',
      description: 'Thermal, nuclear, hydro, and renewable energy plants',
      link: '/industries#power', 
      icon: 'fa-plug',
      keywords: ['power', 'thermal', 'nuclear', 'hydro', 'renewable', 'biomass', 'energy'] 
    },
    { 
      name: 'Chemical & Petrochemical', 
      category: 'Industries',
      description: 'Process industry automation and control solutions',
      link: '/industries#chemical', 
      icon: 'fa-flask',
      keywords: ['chemical', 'pharmaceutical', 'fertilizer', 'polymer', 'process', 'petrochemical'] 
    },
    { 
      name: 'Marine & Offshore', 
      category: 'Industries',
      description: 'Ships, vessels, offshore platforms, and subsea systems',
      link: '/industries#marine', 
      icon: 'fa-ship',
      keywords: ['marine', 'offshore', 'ship', 'vessel', 'subsea', 'ballast', 'naval'] 
    },
    { 
      name: 'Mining & Minerals', 
      category: 'Industries',
      description: 'Harsh environment solutions for mining operations',
      link: '/industries#mining', 
      icon: 'fa-gem',
      keywords: ['mining', 'mineral', 'slurry', 'tailings', 'cement', 'coal', 'ore'] 
    },
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const results = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.keywords.some(keyword => keyword.includes(query))
      );
      
      // Sort by relevance (exact matches first)
      results.sort((a, b) => {
        const aExact = a.name.toLowerCase().startsWith(query) ? 1 : 0;
        const bExact = b.name.toLowerCase().startsWith(query) ? 1 : 0;
        return bExact - aExact;
      });
      
      setSearchResults(results);
      setSelectedIndex(-1);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedIndex(-1);
  };

  const saveRecentSearch = (term) => {
    if (!term || term.trim().length === 0) return;
    
    const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleResultClick = (result) => {
    saveRecentSearch(searchQuery);
    navigate(result.link);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e) => {
    if (!searchResults.length) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleResultClick(searchResults[selectedIndex]);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
      >
        <i className="fas fa-search"></i>
        <span className="text-sm">Search</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[500px] bg-white rounded-xl shadow-2xl border border-secondary-200 z-50 animate-slide-down overflow-hidden">
          {/* Search Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
                <i className="fas fa-search"></i>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                placeholder="Search products, industries, solutions..."
                className="w-full px-10 py-3 pr-10 bg-white/90 backdrop-blur-sm rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-white/50 text-secondary-900 placeholder-secondary-500"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[500px] overflow-y-auto">
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-secondary-600 font-semibold uppercase tracking-wide">
                    <i className="fas fa-list-ul mr-2"></i>
                    {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} Found
                  </div>
                  <button 
                    onClick={clearSearch}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-2">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result)}
                      className={`w-full text-left p-3 rounded-lg transition-all border-2 ${
                        selectedIndex === index
                          ? 'bg-primary-50 border-primary-300 shadow-md'
                          : 'bg-secondary-50 border-transparent hover:bg-primary-50 hover:border-primary-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedIndex === index ? 'bg-primary-600' : 'bg-white'
                        }`}>
                          <i className={`fas ${result.icon} text-lg ${
                            selectedIndex === index ? 'text-white' : 'text-primary-600'
                          }`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-secondary-900 mb-1">{result.name}</div>
                          <div className="text-xs text-secondary-600 mb-1">{result.description}</div>
                          <div className="text-xs text-primary-600 font-medium">
                            {result.category}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <i className="fas fa-arrow-right text-primary-600"></i>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchQuery && searchResults.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-search text-3xl text-secondary-400"></i>
                </div>
                <p className="text-secondary-900 font-semibold mb-2">No results found for "{searchQuery}"</p>
                <p className="text-sm text-secondary-600 mb-4">Try different keywords or browse our categories</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Actuators', 'Gearboxes', 'Industries'].map((term, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(term)}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Default State */}
            {!searchQuery && (
              <div className="p-4 space-y-4">
                {/* Popular Searches */}
                <div>
                  <div className="text-xs text-secondary-600 mb-3 font-semibold uppercase tracking-wide flex items-center">
                    <i className="fas fa-fire text-orange-500 mr-2"></i>
                    Popular Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Pneumatic', 'Electrical', 'Hydraulic', 'Oil & Gas', 'Water', 'Gearbox'].map((term, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 bg-gradient-to-r from-secondary-100 to-secondary-50 hover:from-primary-100 hover:to-primary-50 text-secondary-700 hover:text-primary-700 rounded-lg text-sm transition-all font-medium border border-secondary-200 hover:border-primary-300 hover:shadow-md"
                      >
                        <i className="fas fa-hashtag mr-1 text-xs"></i>
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="text-xs text-secondary-600 mb-3 font-semibold uppercase tracking-wide flex items-center justify-between">
                      <span>
                        <i className="fas fa-history text-blue-500 mr-2"></i>
                        Recent Searches
                      </span>
                      <button
                        onClick={() => {
                          setRecentSearches([]);
                          localStorage.removeItem('recentSearches');
                        }}
                        className="text-xs text-secondary-500 hover:text-red-600 normal-case"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchQuery(term)}
                          className="w-full text-left px-3 py-2 bg-secondary-50 hover:bg-primary-50 rounded-lg text-sm text-secondary-700 hover:text-primary-700 transition-colors flex items-center justify-between group"
                        >
                          <span>
                            <i className="fas fa-clock mr-2 text-secondary-400 group-hover:text-primary-500"></i>
                            {term}
                          </span>
                          <i className="fas fa-arrow-up-right text-secondary-400 group-hover:text-primary-600 text-xs"></i>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                <div>
                  <div className="text-xs text-secondary-600 mb-3 font-semibold uppercase tracking-wide">
                    <i className="fas fa-link mr-2"></i>
                    Quick Links
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'All Products', link: '/products', icon: 'fa-cogs' },
                      { name: 'Industries', link: '/industries', icon: 'fa-industry' },
                      { name: 'Resources', link: '/resources', icon: 'fa-book' },
                      { name: 'Contact Us', link: '/contact', icon: 'fa-envelope' }
                    ].map((link, index) => (
                      <Link
                        key={index}
                        to={link.link}
                        onClick={() => setIsOpen(false)}
                        className="p-3 bg-white hover:bg-primary-50 rounded-lg border border-secondary-200 hover:border-primary-300 transition-all text-center group"
                      >
                        <i className={`fas ${link.icon} text-primary-600 group-hover:text-primary-700 mb-1`}></i>
                        <div className="text-xs font-medium text-secondary-700 group-hover:text-primary-700">
                          {link.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-secondary-50 px-4 py-2 border-t border-secondary-200">
            <div className="flex items-center justify-between text-xs text-secondary-600">
              <span>
                <i className="fas fa-keyboard mr-1"></i>
                <kbd className="px-2 py-0.5 bg-white border border-secondary-300 rounded text-xs">↑</kbd>
                <kbd className="px-2 py-0.5 bg-white border border-secondary-300 rounded text-xs ml-1">↓</kbd>
                <span className="ml-1">to navigate</span>
              </span>
              <span>
                <kbd className="px-2 py-0.5 bg-white border border-secondary-300 rounded text-xs">Enter</kbd>
                <span className="ml-1">to select</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
