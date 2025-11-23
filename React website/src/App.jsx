import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Industries from './pages/Industries';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import India from './pages/global/India';
import UAE from './pages/global/UAE';
import Qatar from './pages/global/Qatar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/global/india" element={<India />} />
            <Route path="/global/uae" element={<UAE />} />
            <Route path="/global/qatar" element={<Qatar />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
