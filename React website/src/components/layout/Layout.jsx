import Header from './Header';
import Footer from './Footer';
import DigitalSizingTool from '../common/DigitalSizingTool';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <DigitalSizingTool />
    </div>
  );
}
