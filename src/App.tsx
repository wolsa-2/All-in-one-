import React, { useState } from 'react';
import { Search, Menu, X, Github, Heart, Zap } from 'lucide-react';
import { TOOLS, CATEGORIES, Category, Tool } from './constants';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

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
import TweetGenerator from './components/tools/TweetGenerator';
import HtmlEntities from './components/tools/HtmlEntities';

export default function App() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const renderTool = () => {
    if (!activeTool) return null;
    
    switch (activeTool.id) {
      case 'character-counter': return <CharacterCounter />;
      case 'password-generator': return <PasswordGenerator />;
      case 'base64-codec': return <Base64Codec />;
      case 'json-formatter': return <JsonFormatter />;
      case 'qr-generator': return <QrGenerator />;
      case 'case-converter': return <CaseConverter />;
      case 'hash-generator': return <HashGenerator />;
      case 'bionic-reading': return <BionicReading />;
      case 'webcam-test': return <WebcamTest />;
      case 'image-placeholder': return <ImagePlaceholder />;
      case 'image-to-base64': return <ImageToBase64 />;
      case 'pdf-metadata': return <PdfMetadata />;
      case 'tweet-generator': return <TweetGenerator />;
      case 'html-entities': return <HtmlEntities />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-lg border border-amber-100 mb-4">
              This tool is currently under development.
            </div>
            <button 
              onClick={() => setActiveTool(null)}
              className="text-indigo-600 hover:underline"
            >
              Go back to tools
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#1A1A3A] font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => {setActiveTool(null); setSearchQuery('');}}>
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Blog</button>
              <button className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">About</button>
              <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all">
                Suggest a Tool
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!activeTool ? (
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

            {/* Categorized Grid */}
            {Object.entries(toolsByCategory).map(([category, tools]) => (
              <div key={category} className="space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">{category}</span>
                  <h2 className="text-3xl font-black text-[#1A1A3A]">{category} Tools</h2>
                  <p className="text-slate-400 text-sm">All the {category.toLowerCase()} tools that you need in the same website.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <button 
              onClick={() => setActiveTool(null)}
              className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 font-medium transition-colors group"
            >
              <div className="p-2 bg-white border border-slate-200 rounded-lg group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all">
                <X size={16} />
              </div>
              Back to all tools
            </button>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                    <activeTool.icon size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{activeTool.name}</h2>
                    <p className="text-slate-500">{activeTool.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                {renderTool()}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
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
              <div className="flex gap-4">
                <button className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                  <Github size={20} />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Categories</h4>
              <ul className="space-y-4">
                {CATEGORIES.slice(0, 5).map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => {setActiveTool(null); setSearchQuery(''); window.scrollTo(0,0);}}
                      className="text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-500">
                <li><button className="hover:text-indigo-600 transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-indigo-600 transition-colors">Terms of Service</button></li>
                <li><button className="hover:text-indigo-600 transition-colors">Cookie Policy</button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 OmniTool. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              Made with <Heart size={14} className="text-rose-500 fill-rose-500" /> for the community.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
