import React from 'react';

interface ToolLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function ToolLayout({ children, title, description }: ToolLayoutProps) {
  return (
    <div className="space-y-12">
      {/* Ad Placeholder: Header */}
      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-400">
        AD UNIT: HEADER (ca-pub-6718154089288859)
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-12">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-[#F8F9FF]">
              <h1 className="text-3xl font-black text-[#1A1A3A]">{title}</h1>
              <p className="text-slate-500 mt-2">{description}</p>
            </div>
            <div className="p-8">
              {children}
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#1A1A3A]">How {title} Works</h2>
              <div className="text-slate-600 leading-relaxed space-y-4">
                <p>
                  Our {title} tool is designed to provide a seamless and efficient experience for users looking to process their data quickly and securely. 
                  The underlying technology utilizes advanced algorithms to ensure that your input is handled with the highest degree of accuracy. 
                  Whether you are a professional developer or a casual user, the interface is intuitive enough to get your results in seconds.
                </p>
                <p>
                  To use this tool, simply enter your data into the provided input field. Our system will automatically process the information 
                  using client-side logic, meaning your data never leaves your browser. This approach not only ensures maximum privacy but also 
                  provides near-instantaneous results without the latency associated with server-side processing. Once the processing is complete, 
                  you can easily copy the result or download it directly to your device.
                </p>
                <p>
                  We have optimized the {title} for performance across all modern browsers. By leveraging the latest web standards, we ensure that 
                  the tool remains responsive even when handling large amounts of data. Our commitment to quality means we are constantly 
                  updating the logic behind our tools to incorporate user feedback and the latest industry best practices.
                </p>
              </div>
            </section>

            {/* Ad Placeholder: In-content */}
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-6 text-center text-xs text-slate-400">
              AD UNIT: IN-CONTENT (ca-pub-6718154089288859)
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#1A1A3A]">Benefits of using our {title}</h2>
              <div className="text-slate-600 leading-relaxed space-y-4">
                <p>
                  Using our {title} offers several key advantages over traditional methods. First and foremost is the speed. 
                  By eliminating the need for complex software installations or account registrations, we allow you to get straight to work. 
                  Efficiency is at the core of Allinone.tools, and this utility is no exception.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>100% Free:</strong> All our tools are available at no cost, with no hidden fees or premium tiers.</li>
                  <li><strong>Privacy Guaranteed:</strong> We process your data locally, ensuring that sensitive information is never transmitted over the network.</li>
                  <li><strong>No Registration:</strong> Start using the tool immediately without the hassle of creating an account or providing an email address.</li>
                  <li><strong>Cross-Platform:</strong> Works perfectly on desktops, tablets, and smartphones, ensuring you have access to your tools wherever you go.</li>
                </ul>
                <p>
                  Furthermore, the {title} is part of a larger ecosystem of utilities designed to simplify your digital workflow. 
                  By centralizing these tools in one place, we save you the time and effort of searching for individual solutions across the web. 
                  Our goal is to be the ultimate resource for developers, designers, and digital professionals who value their time and data security.
                </p>
                <p>
                  In addition to the immediate functional benefits, using a trusted platform like Allinone.tools gives you peace of mind. 
                  We adhere to strict quality standards and regularly audit our tools for security vulnerabilities. Our transparent approach 
                  to data handling means you can use our services with confidence, knowing that your privacy is our top priority.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar Ad */}
        <div className="hidden lg:block space-y-6">
          <div className="sticky top-24">
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl h-[600px] flex items-center justify-center text-center p-4 text-xs text-slate-400">
              AD UNIT: SIDEBAR (ca-pub-6718154089288859)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
