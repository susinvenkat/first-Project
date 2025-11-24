import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function FAQChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: 'Hello! 👋 Welcome to Susin Group. I\'m your virtual assistant, ready to help you with products, quotes, technical support, and more!',
      suggestions: ['View Products', 'Get Quote', 'Industries', 'Support']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  const faqs = [
    {
      keywords: ['product', 'actuator', 'pneumatic', 'electrical', 'what do you sell'],
      answer: 'We manufacture and supply:\n• Pneumatic Actuators (Spring Return & Double Acting)\n• Electrical Actuators (Multi-turn & Quarter-turn)\n• Electro-Hydraulic Actuators\n• Gearboxes (Worm, Bevel, Spur)\n• Control Accessories\n\nVisit our Products page for detailed specifications.'
    },
    {
      keywords: ['price', 'cost', 'quote', 'quotation', 'how much'],
      answer: 'For pricing and quotations, please:\n1. Click "Get Quote" button in the header\n2. Fill out our quotation form with your requirements\n3. Our sales team will respond within 24 hours\n\nOr call us directly at +91 77080 97242'
    },
    {
      keywords: ['industry', 'application', 'where', 'use'],
      answer: 'Our actuators serve multiple industries:\n• Oil & Gas (FPSO, Refineries, Pipelines)\n• Water & Wastewater Treatment\n• Power Generation (Thermal, Nuclear, Hydro)\n• Chemical & Petrochemical\n• Marine & Offshore\n• Mining & Minerals\n\nEach solution is customized for specific industry needs.'
    },
    {
      keywords: ['certification', 'certified', 'iso', 'atex', 'api'],
      answer: 'We hold numerous certifications:\n• ISO 9001:2015 (Quality Management)\n• ISO 14001 (Environmental)\n• ATEX & IECEx (Explosion-proof)\n• API 609, API 6D\n• SIL 2/3 (Safety Integrity)\n• CMRI, BHEL, NTPC Approved\n• CE, Fire Safe, Marine Certifications\n\nVisit our Resources page for certificate downloads.'
    },
    {
      keywords: ['warranty', 'guarantee', 'service', 'maintenance'],
      answer: 'We offer comprehensive warranty plans:\n• Standard: 12-18 months\n• Extended: Up to 5 years\n• Premium Care: Lifetime support\n\nServices include:\n✓ 24/7 Technical Support\n✓ Installation & Commissioning\n✓ Preventive Maintenance (MRO)\n✓ On-site Emergency Response\n✓ Spare Parts Supply'
    },
    {
      keywords: ['location', 'office', 'where are you', 'address', 'contact'],
      answer: 'Our global presence:\n\n🇮🇳 India (Headquarters)\nCoimbatore, Tamil Nadu\n\n🇦🇪 UAE Office\nDubai\n\n🇶🇦 Qatar Office\nDoha\n\nContact: +91 77080 97242\nEmail: info@susin.in'
    },
    {
      keywords: ['delivery', 'lead time', 'shipping', 'how long'],
      answer: 'Delivery timelines:\n• Standard Products: 2-4 weeks\n• Custom Solutions: 4-8 weeks\n• Emergency Orders: Express available\n\nWe ship globally with:\n✓ Proper packaging & documentation\n✓ Multiple shipping options\n✓ Real-time tracking\n✓ Insurance coverage'
    },
    {
      keywords: ['career', 'job', 'hiring', 'vacancy', 'work'],
      answer: 'We\'re always looking for talented individuals!\n\nCurrent openings include:\n• Engineers (Design, Application, Project)\n• Quality Inspectors\n• Sales & Marketing\n• Production Supervisors\n\nVisit our Careers page to:\n✓ View all positions\n✓ Submit your application\n✓ Learn about benefits\n\nEmail: info@susin.in'
    },
    {
      keywords: ['technical', 'specification', 'datasheet', 'catalog', 'drawing'],
      answer: 'Technical documentation available:\n• Product Catalogs (PDF)\n• Technical Data Sheets\n• CAD Models (STEP, IGES, DWG)\n• Installation Manuals\n• Wiring Diagrams\n• O&M Manuals\n\nAccess all resources on our Resources page or contact our technical team for specific requirements.'
    },
    {
      keywords: ['support', 'help', 'problem', 'issue', 'troubleshoot'],
      answer: 'We\'re here to help!\n\n24/7 Support Options:\n📞 Phone: +91 77080 97242\n📧 Email: info@susin.in\n💬 Live Chat: Available on website\n\nOur technical team provides:\n✓ Remote diagnostics\n✓ On-site support\n✓ Emergency response\n✓ Training programs'
    }
  ];

  const quickActions = [
    { icon: 'fa-cogs', text: 'Products', query: 'Tell me about your products' },
    { icon: 'fa-file-invoice-dollar', text: 'Get Quote', query: 'How do I get a quotation?' },
    { icon: 'fa-industry', text: 'Industries', query: 'Which industries do you serve?' },
    { icon: 'fa-phone-alt', text: 'Contact', query: 'How can I contact you?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        // Don't close on outside click, only on close button
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const findAnswer = (query) => {
    const lowerQuery = query.toLowerCase();
    
    for (const faq of faqs) {
      if (faq.keywords.some(keyword => lowerQuery.includes(keyword))) {
        return faq.answer;
      }
    }
    
    return 'I\'m not sure about that specific question. For detailed assistance, please:\n\n📞 Call: +91 77080 97242\n📧 Email: info@susin.in\n🌐 Visit our website sections:\n   • Products\n   • Industries\n   • Services\n   • Resources\n\nOur team is ready to help you!';
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { type: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse = findAnswer(inputMessage);
      const botMessage = { type: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (query) => {
    setInputMessage(query);
    handleSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800'
        }`}
        aria-label="Chat Support"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'} text-white text-2xl`}></i>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border-2 border-primary-500 flex flex-col animate-slide-up"
          style={{ height: '600px', maxHeight: 'calc(100vh - 8rem)' }}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-primary-600 text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg">Susin Support</h3>
                <p className="text-xs text-primary-100">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-200 transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none'
                      : 'bg-white text-secondary-900 shadow-md rounded-bl-none border border-secondary-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-secondary-900 p-3 rounded-lg shadow-md border border-secondary-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="p-4 bg-white border-t border-secondary-200">
              <p className="text-xs text-secondary-600 mb-2 font-semibold">Quick Actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                    className="flex items-center space-x-2 p-2 bg-secondary-50 hover:bg-primary-50 rounded-lg transition-colors text-left text-sm"
                  >
                    <i className={`fas ${action.icon} text-primary-600`}></i>
                    <span className="text-secondary-700">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-secondary-200 rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 border-2 border-secondary-200 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
