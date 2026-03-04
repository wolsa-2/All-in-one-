import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Optimize Your Images for Web Performance",
    excerpt: "Learn the best practices for image compression and format selection to make your website lightning fast.",
    date: "March 1, 2026",
    author: "Admin",
    category: "Tutorials"
  },
  {
    id: 2,
    title: "The Importance of Data Encryption in 2026",
    excerpt: "Why you should always use SHA-256 and AES for sensitive data. A deep dive into modern security standards.",
    date: "February 25, 2026",
    author: "Security Team",
    category: "Security"
  },
  {
    id: 3,
    title: "10 Productivity Tools Every Developer Needs",
    excerpt: "From JSON formatters to character counters, discover the tools that will save you hours of work every week.",
    date: "February 20, 2026",
    author: "Dev Lead",
    category: "Productivity"
  }
];

export default function Blog() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-[#1A1A3A]">Our Blog</h1>
        <p className="text-slate-500">Insights, tutorials, and updates from the Allinone.tools team.</p>
      </div>

      {/* Ad Placeholder: Header */}
      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-400">
        AD UNIT: HEADER (ca-pub-6718154089288859)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <motion.article 
            key={post.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-indigo-50 flex items-center justify-center">
              <span className="text-indigo-200 font-black text-4xl">BLOG</span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A3A] mb-2 hover:text-indigo-600 cursor-pointer transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-500 text-sm mb-6 flex-1">
                {post.excerpt}
              </p>
              <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all">
                Read More <ArrowRight size={16} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Ad Placeholder: In-content */}
      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-8 text-center text-xs text-slate-400">
        AD UNIT: IN-CONTENT (ca-pub-6718154089288859)
      </div>
    </div>
  );
}
