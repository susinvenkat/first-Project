import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ProductSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  const products = [
    { name: 'Pneumatic Actuators', category: 'Actuators', link: '/products#pneumatic', keywords: ['pneumatic', 'air', 'spring return', 'double acting', 'scotch yoke'] },
    { name: 'Electrical Actuators', category: 'Actuators', link: '/products#electrical', keywords: ['electric', 'motor', 'multi-turn', 'quarter-turn', 'modulating'] },
    { name: 'Electro-Hydraulic Actuators', category: 'Actuators', link: '/products#electro-hydraulic', keywords: ['hydraulic', 'high torque', 'heavy duty', 'subsea'] },
    { name: 'Gearboxes', category: 'Motion Control', link: '/products#gearboxes', keywords: ['gearbox', 'gear', 'worm', 'bevel', 'spur'] },
    { name: 'Control Accessories', category: 'Accessories', link: '/products#accessories', keywords: ['control', 'solenoid', 'limit switch', 'positioner', 'controller'] },
    { name: 'Oil & Gas Solutions', category: 'Industries', link: '/industries#oil-gas', keywords: ['oil', 'gas', 'fpso', 'refinery', 'pipeline', 'lng'] },
    { name: 'Water Treatment', category: 'Industries', link: '/industries#water', keywords: ['water', 'wastewater', 'desalination', 'municipal', 'filtration'] },
    { name: 'Power Generation', category: 'Industries', link: '/industries#power', keywords: ['power', 'thermal', 'nuclear', 'hydro', 'renewable', 'biomass'] },
    { name: 'Chemical & Petrochemical', category: 'Industries', link: '/industries#chemical', keywords: ['chemical', 'pharmaceutical', 'fertilizer', 'polymer'] },
    { name: 'Marine & Offshore', category: 'Industries', link: '/industries#marine', keywords: ['marine', 'offshore', 'ship', 'vessel', 'subsea', 'ballast'] },
    { name: 'Mining & Minerals', category: 'Industries', link: '/industries#mining', keywords: ['mining', 'mineral', 'slurry', 'tailings', 'cement', 'coal'] },
  ];

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
        product.keywords.some(keyword => keyword.includes(query))
      );
      setSearchResults(results);
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
  };

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-secondary-700 hover:text-primary-600 transition-colors p-2"
        aria-label="Search Products"
      >
        <i className="fas fa-search text-xl"></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border-2 border-primary-500 z-50 animate-slide-down">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search products, industries, solutions..."
                className="w-full px-4 py-3 pr-10 border-2 border-secondary-200 rounded-lg focus:border-primary-500 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>

            {searchResults.length > 0 && (
              <div className="mt-4 max-h-96 overflow-y-auto">
                <div className="text-xs text-secondary-500 mb-2 font-semibold uppercase tracking-wide">
                  {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} Found
                </div>
                <ul className="space-y-2">
                  {searchResults.map((result, index) => (
                    <li key={index}>
                      <Link
                        to={result.link}
                        onClick={() => {
                          setIsOpen(false);
                          clearSearch();
                        }}
                        className="block p-3 hover:bg-primary-50 rounded-lg transition-colors border border-transparent hover:border-primary-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-secondary-900">{result.name}</div>
                            <div className="text-xs text-secondary-500 mt-1">{result.category}</div>
                          </div>
                          <i className="fas fa-arrow-right text-primary-600 mt-1"></i>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="mt-4 text-center py-8">
                <i className="fas fa-search text-4xl text-secondary-300 mb-3"></i>
                <p className="text-secondary-600">No results found for "{searchQuery}"</p>
                <p className="text-sm text-secondary-500 mt-2">Try different keywords or browse our categories</p>
              </div>
            )}

            {!searchQuery && (
              <div className="mt-4">
                <div className="text-xs text-secondary-500 mb-3 font-semibold uppercase tracking-wide">
                  Popular Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Pneumatic', 'Electrical', 'Oil & Gas', 'Water', 'Gearbox'].map((term, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 bg-secondary-100 hover:bg-primary-100 text-secondary-700 hover:text-primary-700 rounded-full text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
