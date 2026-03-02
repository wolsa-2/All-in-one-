import React, { useState, useRef } from 'react';
import { Download, Share2, Heart, MessageCircle, Repeat2, Check, User, Calendar } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function TweetGenerator() {
  const [name, setName] = useState('OmniTool User');
  const [handle, setHandle] = useState('omnitool_app');
  const [content, setContent] = useState('OmniTool is the best all-in-one utility hub I have ever used! 🚀 #productivity #tools');
  const [date, setDate] = useState('12:20 PM · Mar 2, 2026');
  const [stats, setStats] = useState({ replies: '1.2K', retweets: '4.5K', likes: '12.8K' });
  const [avatar, setAvatar] = useState('https://picsum.photos/seed/avatar/200/200');
  const tweetRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (tweetRef.current === null) return;
    const dataUrl = await toPng(tweetRef.current, { cacheBust: true });
    const link = document.createElement('a');
    link.download = 'omnitool-tweet.png';
    link.href = dataUrl;
    link.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Display Name</label>
            <input
              type="text"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Handle (@)</label>
            <input
              type="text"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Tweet Content</label>
          <textarea
            className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Replies</label>
            <input
              type="text"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={stats.replies}
              onChange={(e) => setStats({ ...stats, replies: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Retweets</label>
            <input
              type="text"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={stats.retweets}
              onChange={(e) => setStats({ ...stats, retweets: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Likes</label>
            <input
              type="text"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={stats.likes}
              onChange={(e) => setStats({ ...stats, likes: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Avatar Image</label>
          <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-all">
            <User size={18} className="text-slate-400" />
            <span className="text-sm text-slate-500">Choose custom avatar...</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
          </label>
        </div>

        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-3 p-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all"
        >
          <Download size={20} />
          Download Meme
        </button>
      </div>

      <div className="flex flex-col items-center justify-center bg-slate-100 rounded-3xl p-8">
        <div 
          ref={tweetRef}
          className="w-full max-w-[500px] bg-white p-6 rounded-2xl shadow-xl border border-slate-200 font-sans"
        >
          <div className="flex items-center gap-3 mb-4">
            <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-slate-900 truncate">{name}</h4>
                <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                  <Check size={10} strokeWidth={4} />
                </div>
              </div>
              <p className="text-slate-500 text-sm truncate">@{handle}</p>
            </div>
            <Share2 size={20} className="text-slate-400" />
          </div>

          <div className="text-lg text-slate-900 leading-relaxed mb-4 whitespace-pre-wrap">
            {content}
          </div>

          <div className="text-slate-500 text-sm mb-4 border-b border-slate-100 pb-4">
            {date}
          </div>

          <div className="flex justify-between text-slate-500">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 group-hover:bg-indigo-50 group-hover:text-indigo-500 rounded-full transition-all">
                <MessageCircle size={18} />
              </div>
              <span className="text-sm font-medium">{stats.replies}</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 group-hover:bg-emerald-50 group-hover:text-emerald-500 rounded-full transition-all">
                <Repeat2 size={18} />
              </div>
              <span className="text-sm font-medium">{stats.retweets}</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 group-hover:bg-rose-50 group-hover:text-rose-500 rounded-full transition-all">
                <Heart size={18} />
              </div>
              <span className="text-sm font-medium">{stats.likes}</span>
            </div>
          </div>
        </div>
        <p className="text-slate-400 text-sm font-medium mt-6">Preview (Meme format)</p>
      </div>
    </div>
  );
}
