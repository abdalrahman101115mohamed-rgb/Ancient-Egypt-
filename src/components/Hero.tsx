import React from 'react';

interface HeroProps {
  onStartCamera: () => void;
  onStartCartouche: () => void;
  onExploreAlphabet: () => void;
  onStartLessons: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartCamera,
  onStartCartouche,
  onExploreAlphabet,
  onStartLessons,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-[#262836] bg-[#0e1017]">
      {/* Background with measured contrast scrim */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <img
          src="/src/assets/images/hero_hieroglyph_papyrus_1793460317801.jpg"
          alt="بردية مصرية قديمة تضم نقوشاً هيروغليفية وخرطوشة ملكية"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Clean unboxed metadata separator */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#d4a359] font-medium">
              <span>مدو نتر · كلام الآلهة</span>
              <span aria-hidden="true">·</span>
              <span>عدسة الترجمة بالكاميرا</span>
              <span aria-hidden="true">·</span>
              <span>تعلم تفاعلي مبسط</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#f4efe6] tracking-tight leading-[1.25] text-balance font-amiri">
              تعلّم وترجم اللغة الهيروغليفية{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#d4a359] to-[#faebd7]">
                بالتصوير والكاميرا
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#b2b7ca] leading-relaxed max-w-2xl">
              وجّه كاميرا هاتفك لأي نقش فرعوني على تمثال أو معبد أو صورة، واقرأ الترجمة الفورية باللغة العربية مع نطقها وسياقها التاريخي، أو اكتب اسمك في خرطوشة ملكية وتعلم الأبجدية بسهولة.
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartCamera}
                className="px-6 py-3.5 bg-[#d4a359] hover:bg-[#e2b772] text-[#0c0d12] font-bold rounded-lg text-sm sm:text-base transition-colors shadow-lg shadow-[#d4a359]/10 cursor-pointer flex items-center gap-2"
              >
                <span>📷</span>
                <span>ترجم صورة أو نقش بالكاميرا</span>
              </button>

              <button
                onClick={onStartCartouche}
                className="px-6 py-3.5 bg-[#171924] hover:bg-[#202332] text-[#f4efe6] border border-[#2c3042] font-semibold rounded-lg text-sm sm:text-base transition-colors cursor-pointer flex items-center gap-2"
              >
                <span className="font-hieroglyph text-lg">𓍶</span>
                <span>صانع الخراطيش الملكية</span>
              </button>

              <button
                onClick={onExploreAlphabet}
                className="px-5 py-3.5 text-[#d4a359] hover:text-[#faebd7] font-semibold text-sm transition-colors cursor-pointer"
              >
                الأبجدية الـ 24 ←
              </button>
            </div>

            {/* Quick trust / curriculum metric strip - clean unboxed */}
            <div className="pt-6 border-t border-[#1e202d] grid grid-cols-3 gap-4 text-right">
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-[#d4a359]">AI 📷</div>
                <div className="text-xs text-[#8f94a8] mt-1">كشف وترجمة فورية بالرؤية</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-[#38bdf8]">24</div>
                <div className="text-xs text-[#8f94a8] mt-1">حرفاً أحادياً لكتابة أي اسم</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-[#4ade80]">100%</div>
                <div className="text-xs text-[#8f94a8] mt-1">شرح صوتي وتاريخي متكامل</div>
              </div>
            </div>

          </div>

          {/* Interactive Visual Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#141620] border border-[#272b3c] rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4 border-b border-[#212433] pb-3 text-xs text-[#8f94a8]">
                <span>المترجم البصري المباشر</span>
                <span className="font-hieroglyph text-[#d4a359] text-sm">𓁹 𓏞</span>
              </div>

              {/* Sample Royal Cartouche Showcase */}
              <div className="bg-[#0e1017] p-5 rounded-xl border border-[#222638] flex flex-col items-center justify-center py-8">
                <div className="relative border-4 border-[#d4a359] rounded-full px-8 py-5 bg-[#171924]/80 shadow-[0_0_20px_rgba(212,163,89,0.15)] flex items-center justify-center gap-3">
                  <span className="text-4xl sm:text-5xl font-hieroglyph text-[#faebd7] tracking-wider select-all">
                    𓏏𓅱𓏏𓋹𓈖𓇋𓏠𓈖
                  </span>
                  <div className="absolute -bottom-2 right-1/2 translate-x-1/2 w-8 h-2 bg-[#d4a359] rounded-sm" />
                </div>

                <div className="text-center mt-6 space-y-1">
                  <div className="text-base font-bold text-[#f4efe6]">توت عنخ آمون (Tutankhamun)</div>
                  <div className="text-xs text-[#d4a359]">الصورة الحية للمعبود آمون في الأرض</div>
                  <div className="text-[11px] text-[#71768a] font-mono mt-1">twt - ꜥnḫ - jmn</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#a0a5b8] pt-2">
                <span>جرّب تصوير أي نقش الآن لترجمته</span>
                <button
                  onClick={onStartCamera}
                  className="text-[#d4a359] font-medium hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>فتح الكاميرا</span>
                  <span>←</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
