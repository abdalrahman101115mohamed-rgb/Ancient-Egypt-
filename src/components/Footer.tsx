import React from 'react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#090a0e] border-t border-[#1c1e2b] py-12 px-4 sm:px-6 lg:px-8 text-right text-xs text-[#71768a]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-hieroglyph text-xl text-[#d4a359]">𓊹</span>
              <span className="text-base font-bold text-[#f4efe6] font-amiri">
                مَـدُو نِـتْـر · مدرسة الهيروغليفية المبسطة
              </span>
            </div>
            <p className="text-[#8f94a8] leading-relaxed max-w-md text-xs">
              منصة تعليمية عربية تفاعلية تهدف لإعادة إحياء الشغف باللغة المصرية القديمة بطريقة سهلة، ممتعة، ومبنية على التصنيف الصوتي المعتمد دولياً لقائمة السير آلان جاردنر، مع ميزة المسح الضوئي وترجمة النقوش بالكاميرا والصور.
            </p>
          </div>

          {/* Quick Sections */}
          <div className="space-y-2">
            <div className="font-semibold text-[#f4efe6]">أقسام المنصة:</div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('camera')}
                  className="hover:text-[#d4a359] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>📷</span>
                  <span>الترجمة بالكاميرا والصور</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('cartouche')}
                  className="hover:text-[#d4a359] transition-colors cursor-pointer"
                >
                  صانع الخراطيش الملكية
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('alphabet')}
                  className="hover:text-[#d4a359] transition-colors cursor-pointer"
                >
                  الأبجدية الـ 24 الأحادية
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('lessons')}
                  className="hover:text-[#d4a359] transition-colors cursor-pointer"
                >
                  الدروس التفاعلية الخمسة
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('quiz')}
                  className="hover:text-[#d4a359] transition-colors cursor-pointer"
                >
                  البطاقات الذكية والمسابقة
                </button>
              </li>
            </ul>
          </div>

          {/* Cultural references */}
          <div className="space-y-2">
            <div className="font-semibold text-[#f4efe6]">المراجع العلمية والذكاء الاصطناعي:</div>
            <ul className="space-y-1 text-xs text-[#8f94a8]">
              <li>تحليل بصري للنقوش مدعوم بـ Gemini Multimodal Vision</li>
              <li>قائمة جاردنر للعلامات المصرية (Gardiner's Sign List)</li>
              <li>حجر رشيد ونصوص فك الشفرة (1822)</li>
              <li>الترميز العالمي الموحد لليونيكود (U+13000–U+1342F)</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#171924] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#5e6377]">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} مَـدُو نِـتْـر · إحياء التراث المصري القديم
          </div>
          <div className="flex items-center gap-4 text-[#8f94a8]">
            <span>عنخ، وجا، سنب (𓋹 𓍑 𓋴)</span>
            <span aria-hidden="true">·</span>
            <span>عش حياً سالماً معافى</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
