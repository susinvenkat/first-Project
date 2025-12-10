import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';

// Eager load Home for better initial experience
import Home from './pages/Home_Advanced';
import Login from './pages/Login';

// Lazy load other pages for better performance
const Products = lazy(() => import('./pages/Products_Enhanced'));
const Industries = lazy(() => import('./pages/Industries_Enhanced'));
const About = lazy(() => import('./pages/About_Enhanced'));
const Careers = lazy(() => import('./pages/Careers_Enhanced'));
const Contact = lazy(() => import('./pages/Contact'));
const India = lazy(() => import('./pages/global/India'));
const UAE = lazy(() => import('./pages/global/UAE'));
const Qatar = lazy(() => import('./pages/global/Qatar'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-lg text-secondary-600 font-semibold">Loading...</p>
    </div>
  </div>
);

// 404 Not Found component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 to-secondary-100 p-4">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-secondary-900 mb-4">Page Not Found</h2>
      <p className="text-lg text-secondary-600 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center transition-all">
        <i className="fas fa-home mr-2"></i>
        Back to Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/global/india" element={<India />} />
              <Route path="/global/uae" element={<UAE />} />
              <Route path="/global/qatar" element={<Qatar />} />
              
              {/* Catch all 404 */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
