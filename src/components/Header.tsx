import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0c0d12]/95 backdrop-blur-md border-b border-[#262836] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 single-line nav links) — Zone 3 (1 primary action) */}
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('hero')}
            className="flex items-center gap-3 text-right group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a359]"
          >
            <span className="text-2xl font-hieroglyph text-[#d4a359] group-hover:scale-110 transition-transform">
              𓊹
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#f4efe6] whitespace-nowrap font-amiri group-hover:text-[#d4a359] transition-colors">
                مَـدُو نِـتْـر
              </span>
              <span className="text-xs text-[#8f94a8] whitespace-nowrap">
                مدرسة الهيروغليفية المبسطة
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#a0a5b8]">
            <button
              onClick={() => setActiveTab('cartouche')}
              className={`whitespace-nowrap cursor-pointer transition-colors hover:text-[#f4efe6] py-1 ${
                activeTab === 'cartouche' ? 'text-[#d4a359] border-b-2 border-[#d4a359]' : ''
              }`}
            >
              صانع الخراطيش الملكية
            </button>
            <button
              onClick={() => setActiveTab('alphabet')}
              className={`whitespace-nowrap cursor-pointer transition-colors hover:text-[#f4efe6] py-1 ${
                activeTab === 'alphabet' ? 'text-[#d4a359] border-b-2 border-[#d4a359]' : ''
              }`}
            >
              الأبجدية الـ 24
            </button>
            <button
              onClick={() => setActiveTab('lessons')}
              className={`whitespace-nowrap cursor-pointer transition-colors hover:text-[#f4efe6] py-1 ${
                activeTab === 'lessons' ? 'text-[#d4a359] border-b-2 border-[#d4a359]' : ''
              }`}
            >
              الدروس التفاعلية
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`whitespace-nowrap cursor-pointer transition-colors hover:text-[#f4efe6] py-1 ${
                activeTab === 'quiz' ? 'text-[#d4a359] border-b-2 border-[#d4a359]' : ''
              }`}
            >
              الاختبارات والبطاقات
            </button>
            <button
              onClick={() => setActiveTab('dictionary')}
              className={`whitespace-nowrap cursor-pointer transition-colors hover:text-[#f4efe6] py-1 ${
                activeTab === 'dictionary' ? 'text-[#d4a359] border-b-2 border-[#d4a359]' : ''
              }`}
            >
              الرموز والأرقام
            </button>
            <button
              onClick={() => setActiveTab('scribe')}
              className={`whitespace-nowrap cursor-pointer transition-colors hover:text-[#f4efe6] py-1 ${
                activeTab === 'scribe' ? 'text-[#d4a359] border-b-2 border-[#d4a359]' : ''
              }`}
            >
              حكيم الكَتَبَة الذكي
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('cartouche')}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#0c0d12] bg-[#d4a359] hover:bg-[#e2b772] transition-colors rounded-lg shadow-sm whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <span className="font-hieroglyph text-base">𓍶</span>
              <span>اكتب اسمك كملك فرعوني</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar for seamless scrolling on smaller viewports */}
        <div className="lg:hidden flex items-center gap-3 overflow-x-auto py-2.5 border-t border-[#1e202d] text-xs font-medium no-scrollbar">
          <button
            onClick={() => setActiveTab('cartouche')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'cartouche' ? 'bg-[#d4a359]/20 text-[#d4a359]' : 'text-[#a0a5b8]'
            }`}
          >
            صانع الخراطيش
          </button>
          <button
            onClick={() => setActiveTab('alphabet')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'alphabet' ? 'bg-[#d4a359]/20 text-[#d4a359]' : 'text-[#a0a5b8]'
            }`}
          >
            الأبجدية الـ 24
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'lessons' ? 'bg-[#d4a359]/20 text-[#d4a359]' : 'text-[#a0a5b8]'
            }`}
          >
            الدروس
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'quiz' ? 'bg-[#d4a359]/20 text-[#d4a359]' : 'text-[#a0a5b8]'
            }`}
          >
            الاختبار
          </button>
          <button
            onClick={() => setActiveTab('dictionary')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'dictionary' ? 'bg-[#d4a359]/20 text-[#d4a359]' : 'text-[#a0a5b8]'
            }`}
          >
            الرموز والأرقام
          </button>
          <button
            onClick={() => setActiveTab('scribe')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'scribe' ? 'bg-[#d4a359]/20 text-[#d4a359]' : 'text-[#a0a5b8]'
            }`}
          >
            حكيم الكَتَبَة
          </button>
        </div>

      </div>
    </header>
  );
};
