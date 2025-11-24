import Header from './Header';
import Footer from './Footer';
import DigitalSizingTool from '../common/DigitalSizingTool';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <DigitalSizingTool />
    </div>
  );
}
