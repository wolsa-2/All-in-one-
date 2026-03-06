import React from 'react';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  style?: React.CSSProperties;
}

const AdUnit: React.FC<AdUnitProps> = ({ slot, format = 'auto', className, style }) => {
  return (
    <div className={`ad-container my-8 flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl overflow-hidden min-h-[100px] ${className}`} style={style}>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Advertisement</div>
      {/* 
          In a real AdSense implementation, you would use the following:
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-6718154089288859"
               data-ad-slot={slot}
               data-ad-format={format}
               data-full-width-responsive="true"></ins>
          <script>
               (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
      */}
      <div className="w-full h-full flex items-center justify-center text-slate-300 italic text-sm">
        AdSense Ad Space
      </div>
    </div>
  );
};

export default AdUnit;
