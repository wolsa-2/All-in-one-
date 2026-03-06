import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Github, Heart, Zap, Home, BookOpen, Info, Mail, Shield, FileText } from 'lucide-react';
import { TOOLS, CATEGORIES, Category, Tool } from './constants';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { STATIC_PAGES_CONTENT } from './content';
import AdUnit from './components/AdUnit';

const StructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Allinone.tools",
    "url": "https://allinone.tools/",
    "description": "Free online utility tools for developers and designers.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "author": {
      "@type": "Person",
      "name": "Shivam Kumar"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

// Tool Components
import CharacterCounter from './components/tools/CharacterCounter';
import PasswordGenerator from './components/tools/PasswordGenerator';
import Base64Codec from './components/tools/Base64Codec';
import JsonFormatter from './components/tools/JsonFormatter';
import QrGenerator from './components/tools/QrGenerator';
import CaseConverter from './components/tools/CaseConverter';
import HashGenerator from './components/tools/HashGenerator';
import BionicReading from './components/tools/BionicReading';
import WebcamTest from './components/tools/WebcamTest';
import ImagePlaceholder from './components/tools/ImagePlaceholder';
import ImageToBase64 from './components/tools/ImageToBase64';
import PdfMetadata from './components/tools/PdfMetadata';
import JpgToPdf from './components/tools/JpgToPdf';
import TweetGenerator from './components/tools/TweetGenerator';
import HtmlEntities from './components/tools/HtmlEntities';

// Layout & Pages
import ToolLayout from './components/ToolLayout';
import Blog from './components/Blog';
import { Marquee } from './components/Marquee';

type Page = 'home' | 'blog' | 'about' | 'contact' | 'privacy' | 'terms';

export default function App() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    return !localStorage.getItem('cookie-consent');
  });

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [currentPage, activeTool]);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowCookieConsent(false);
  };

  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const toolsByCategory = CATEGORIES.reduce((acc, cat) => {
    const tools = filteredTools.filter(t => t.category === cat);
    if (tools.length > 0) acc[cat] = tools;
    return acc;
  }, {} as Record<Category, Tool[]>);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setActiveTool(null);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const renderTool = () => {
    if (!activeTool) return null;
    
    let component = null;
    switch (activeTool.id) {
      case 'character-counter': component = <CharacterCounter />; break;
      case 'password-generator': component = <PasswordGenerator />; break;
      case 'base64-codec': component = <Base64Codec />; break;
      case 'json-formatter': component = <JsonFormatter />; break;
      case 'qr-generator': component = <QrGenerator />; break;
      case 'case-converter': component = <CaseConverter />; break;
      case 'hash-generator': component = <HashGenerator />; break;
      case 'bionic-reading': component = <BionicReading />; break;
      case 'webcam-test': component = <WebcamTest />; break;
      case 'image-placeholder': component = <ImagePlaceholder />; break;
      case 'image-to-base64': component = <ImageToBase64 />; break;
      case 'pdf-metadata': component = <PdfMetadata />; break;
      case 'jpg-to-pdf': component = <JpgToPdf />; break;
      case 'tweet-generator': component = <TweetGenerator />; break;
      case 'html-entities': component = <HtmlEntities />; break;
      default:
        component = (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-lg border border-amber-100 mb-4">
              This tool is currently under development.
            </div>
          </div>
        );
    }

    return (
      <ToolLayout title={activeTool.name} description={activeTool.description} toolId={activeTool.id}>
        <AdUnit slot="tool-top" className="mb-8" />
        {component}
        <AdUnit slot="tool-bottom" className="mt-12" />
      </ToolLayout>
    );
  };

  const renderPage = () => {
    if (activeTool) return renderTool();

    switch (currentPage) {
      case 'blog': return <Blog />;
      case 'about':
        return (
          <div className="max-w-4xl mx-auto space-y-8 py-12">
            <div className="prose prose-indigo prose-lg max-w-none text-slate-600 leading-relaxed space-y-6" 
                 dangerouslySetInnerHTML={{ __html: STATIC_PAGES_CONTENT.about }} />
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-3xl mx-auto space-y-8 py-12">
            <h1 className="text-4xl font-black text-[#1A1A3A]">Contact Us</h1>
            <p className="text-slate-600 leading-relaxed">
              Have a suggestion for a new tool? Found a bug that needs fixing? Or just want to say hi? 
              We'd love to hear from you. Our team is dedicated to making Allinone.tools the best utility hub on the web.
            </p>
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-lg font-bold text-[#1A1A3A]">Email us at:</p>
              <a href="mailto:b605649@gmail.com" className="text-2xl font-black text-indigo-600 hover:underline">b605649@gmail.com</a>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="max-w-4xl mx-auto space-y-8 py-12">
            <div className="prose prose-indigo prose-lg max-w-none text-slate-600 leading-relaxed space-y-6" 
                 dangerouslySetInnerHTML={{ __html: STATIC_PAGES_CONTENT.privacy }} />
          </div>
        );
      case 'terms':
        return (
          <div className="max-w-4xl mx-auto space-y-8 py-12">
            <div className="prose prose-indigo prose-lg max-w-none text-slate-600 leading-relaxed space-y-6" 
                 dangerouslySetInnerHTML={{ __html: STATIC_PAGES_CONTENT.terms }} />
          </div>
        );
      default:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-20"
          >
            {/* Hero */}
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-black text-[#1A1A3A] tracking-tight">All Tools</h1>
              <p className="text-slate-500 font-medium">Free online tools for everyone. No sign-up required.</p>
            </div>

            <AdUnit slot="home-top" className="max-w-5xl mx-auto" />

            {/* Marquee Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Quick Access</span>
                <h2 className="text-2xl font-black text-[#1A1A3A]">Featured Tools</h2>
              </div>
              <div className="space-y-4">
                <Marquee 
                  items={TOOLS.slice(0, Math.ceil(TOOLS.length / 2))} 
                  onItemClick={(tool) => {
                    setActiveTool(tool);
                    window.scrollTo(0, 0);
                  }} 
                  speed={30}
                />
                <Marquee 
                  items={TOOLS.slice(Math.ceil(TOOLS.length / 2))} 
                  onItemClick={(tool) => {
                    setActiveTool(tool);
                    window.scrollTo(0, 0);
                  }} 
                  direction="right"
                  speed={35}
                />
              </div>
            </div>

            {/* Categorized Grid */}
            {Object.entries(toolsByCategory).map(([category, tools]) => (
              <div key={category} className="space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">{category}</span>
                  <h2 className="text-3xl font-black text-[#1A1A3A]">{category} Tools</h2>
                  <p className="text-slate-400 text-sm">All the {category.toLowerCase()} tools that you need in the same website.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {tools.map((tool) => (
                    <motion.div
                      key={tool.id}
                      whileHover={{ y: -4 }}
                      onClick={() => setActiveTool(tool)}
                      className="group bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-2xl hover:border-indigo-50 transition-all cursor-pointer flex items-start gap-6"
                    >
                      <div className="w-14 h-14 bg-[#F8F9FF] rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                        <tool.icon size={28} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-xl font-black text-[#1A1A3A] group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{tool.description}</p>
                        <div className="pt-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-indigo-300 transition-colors">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#1A1A3A] font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <StructuredData />
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <Zap size={28} fill="currentColor" />
              </div>
              <span className="text-2xl font-black tracking-tight text-[#1A1A3A]">Allinone.tools</span>
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-md mx-12">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search for a tool..."
                  className="w-full pl-11 pr-4 py-3 bg-[#F8F9FF] border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentPage !== 'home') navigateTo('home');
                  }}
                />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => navigateTo('home')} className={cn("text-sm font-bold transition-colors", currentPage === 'home' ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600")}>Home</button>
              <button onClick={() => navigateTo('blog')} className={cn("text-sm font-bold transition-colors", currentPage === 'blog' ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600")}>Blog</button>
              <button onClick={() => navigateTo('about')} className={cn("text-sm font-bold transition-colors", currentPage === 'about' ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600")}>About</button>
              <button onClick={() => navigateTo('contact')} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all">
                Contact Us
              </button>
            </div>

            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4 shadow-xl fixed top-20 left-0 right-0 z-40"
          >
            <div className="flex flex-col gap-2">
              <button onClick={() => navigateTo('home')} className="p-4 text-left font-bold text-slate-600 hover:bg-slate-50 rounded-xl">Home</button>
              <button onClick={() => navigateTo('blog')} className="p-4 text-left font-bold text-slate-600 hover:bg-slate-50 rounded-xl">Blog</button>
              <button onClick={() => navigateTo('about')} className="p-4 text-left font-bold text-slate-600 hover:bg-slate-50 rounded-xl">About</button>
              <button onClick={() => navigateTo('contact')} className="p-4 text-left font-bold text-slate-600 hover:bg-slate-50 rounded-xl">Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <Zap size={18} fill="currentColor" />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900">Allinone.tools</span>
              </div>
              <p className="text-slate-500 max-w-sm">
                Allinone.tools is your one-stop shop for all utility needs. We provide free, secure, and easy-to-use tools for everyone. No registration required.
              </p>
              <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs">
                Disclaimer: All tools on this site are provided "as is" without warranty of any kind. We do not store any user data processed by our local-first tools.
              </p>
              <div className="flex gap-4">
                <button className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                  <Github size={20} />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><button onClick={() => navigateTo('home')} className="text-slate-500 hover:text-indigo-600 transition-colors">Home</button></li>
                <li><button onClick={() => navigateTo('blog')} className="text-slate-500 hover:text-indigo-600 transition-colors">Blog</button></li>
                <li><button onClick={() => navigateTo('about')} className="text-slate-500 hover:text-indigo-600 transition-colors">About Us</button></li>
                <li><button onClick={() => navigateTo('contact')} className="text-slate-500 hover:text-indigo-600 transition-colors">Contact Us</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-500">
                <li><button onClick={() => navigateTo('privacy')} className="hover:text-indigo-600 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => navigateTo('terms')} className="hover:text-indigo-600 transition-colors">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 Allinone.tools. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              Made with <Heart size={14} className="text-rose-500 fill-rose-500" /> for the community.
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent */}
      <AnimatePresence>
        {showCookieConsent && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:max-w-md bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 z-[60] space-y-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                <Shield size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">Cookie Policy</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We use cookies to enhance your experience and serve personalized ads via Google AdSense. By using our site, you agree to our use of cookies.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={acceptCookies}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all"
              >
                Accept All
              </button>
              <button 
                onClick={() => navigateTo('privacy')}
                className="flex-1 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
