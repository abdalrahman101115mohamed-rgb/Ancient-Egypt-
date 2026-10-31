import React, { useState } from 'react';
import {
  SACRED_SYMBOLS,
  EGYPTIAN_NUMERALS,
  FAMOUS_CARTOUCHES,
  EVERYDAY_PHRASES,
  SacredSymbol
} from '../data/hieroglyphsData';

export const SacredDictionary: React.FC = () => {
  const [subTab, setSubTab] = useState<'symbols' | 'numbers' | 'phrases' | 'cartouches'>('symbols');
  const [selectedSymbol, setSelectedSymbol] = useState<SacredSymbol | null>(null);

  // Number builder state
  const [userNumber, setUserNumber] = useState<number>(2026);

  // Convert modern number into Egyptian hieroglyphic glyphs string
  const getEgyptianNumeralString = (num: number): { glyphs: string; breakdown: string[] } => {
    if (isNaN(num) || num <= 0) return { glyphs: '', breakdown: [] };
    const safeNum = Math.min(num, 9999999);

    let remaining = safeNum;
    const millions = Math.floor(remaining / 1000000);
    remaining %= 1000000;
    const hundredThousands = Math.floor(remaining / 100000);
    remaining %= 100000;
    const tenThousands = Math.floor(remaining / 10000);
    remaining %= 10000;
    const thousands = Math.floor(remaining / 1000);
    remaining %= 1000;
    const hundreds = Math.floor(remaining / 100);
    remaining %= 100;
    const tens = Math.floor(remaining / 10);
    remaining %= 10;
    const ones = remaining;

    const glyphParts: string[] = [];
    const breakdownList: string[] = [];

    if (millions > 0) {
      glyphParts.push('𓁨'.repeat(millions));
      breakdownList.push(`${millions} × مليون (الإله حح 𓁨)`);
    }
    if (hundredThousands > 0) {
      glyphParts.push('𓆐'.repeat(hundredThousands));
      breakdownList.push(`${hundredThousands} × مائة ألف (الضفدع 𓆐)`);
    }
    if (tenThousands > 0) {
      glyphParts.push('𓂭'.repeat(tenThousands));
      breakdownList.push(`${tenThousands} × عشرة آلاف (الإصبع 𓂭)`);
    }
    if (thousands > 0) {
      glyphParts.push('𓆼'.repeat(thousands));
      breakdownList.push(`${thousands} × ألف (زهرة اللوتس 𓆼)`);
    }
    if (hundreds > 0) {
      glyphParts.push('𓍢'.repeat(hundreds));
      breakdownList.push(`${hundreds} × مائة (لفة الحبل 𓍢)`);
    }
    if (tens > 0) {
      glyphParts.push('𓎆'.repeat(tens));
      breakdownList.push(`${tens} × عشرة (القوس 𓎆)`);
    }
    if (ones > 0) {
      glyphParts.push('𓏤'.repeat(ones));
      breakdownList.push(`${ones} × واحد (الشرطة 𓏤)`);
    }

    return {
      glyphs: glyphParts.join(' '),
      breakdown: breakdownList
    };
  };

  const numeralResult = getEgyptianNumeralString(userNumber);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-right">
        <div>
          <div className="text-xs text-[#d4a359] font-medium tracking-wide">
            الموسوعة الأثرية · الرموز والأرقام
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6] font-amiri">
            قاموس الرموز المقدسة والأرقام وخراطيش الفراعنة
          </h2>
          <p className="text-sm text-[#8f94a8] mt-1 max-w-2xl leading-relaxed">
            استكشف أعمق الرموز الدلالية عند قدماء المصريين، وحوّل أي رقم إلى رموزه الهيروغليفية، وتعرف على أشهر الخراطيش.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-1 p-1 bg-[#141620] rounded-lg border border-[#242839] self-start sm:self-end text-xs">
          <button
            type="button"
            onClick={() => setSubTab('symbols')}
            className={`px-3 py-2 rounded-md font-semibold transition-colors cursor-pointer ${
              subTab === 'symbols' ? 'bg-[#1e2233] text-[#d4a359]' : 'text-[#8f94a8] hover:text-[#f4efe6]'
            }`}
          >
            الرموز والتمائم
          </button>
          <button
            type="button"
            onClick={() => setSubTab('numbers')}
            className={`px-3 py-2 rounded-md font-semibold transition-colors cursor-pointer ${
              subTab === 'numbers' ? 'bg-[#1e2233] text-[#d4a359]' : 'text-[#8f94a8] hover:text-[#f4efe6]'
            }`}
          >
            حاسبة الأرقام
          </button>
          <button
            type="button"
            onClick={() => setSubTab('cartouches')}
            className={`px-3 py-2 rounded-md font-semibold transition-colors cursor-pointer ${
              subTab === 'cartouches' ? 'bg-[#1e2233] text-[#d4a359]' : 'text-[#8f94a8] hover:text-[#f4efe6]'
            }`}
          >
            خراطيش الملوك
          </button>
          <button
            type="button"
            onClick={() => setSubTab('phrases')}
            className={`px-3 py-2 rounded-md font-semibold transition-colors cursor-pointer ${
              subTab === 'phrases' ? 'bg-[#1e2233] text-[#d4a359]' : 'text-[#8f94a8] hover:text-[#f4efe6]'
            }`}
          >
            عبارات شائعة
          </button>
        </div>
      </div>

      {/* 1. SYMBOLS VIEW */}
      {subTab === 'symbols' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SACRED_SYMBOLS.map((sym) => (
              <div
                key={sym.id}
                onClick={() => setSelectedSymbol(sym)}
                className="bg-[#141620] hover:bg-[#1a1e2d] border border-[#242839] hover:border-[#d4a359]/60 rounded-xl p-5 text-right transition-all cursor-pointer group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#71768a]">{sym.gardiner}</span>
                  <span className="text-3xl font-hieroglyph text-[#d4a359] group-hover:scale-120 transition-transform">
                    {sym.glyph}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#f4efe6] font-amiri">
                    {sym.nameAr}
                  </h3>
                  <div className="text-xs text-[#d4a359] font-mono mt-0.5">
                    النطق: {sym.transliteration}
                  </div>
                </div>

                <p className="text-xs text-[#a0a5b8] line-clamp-2 leading-relaxed">
                  {sym.meaningAr}
                </p>

                <div className="pt-2 border-t border-[#1e2232] text-[11px] text-[#71768a] flex items-center justify-between">
                  <span>معلومة أثرية</span>
                  <span className="text-[#d4a359]">تفاصيل أكثر ←</span>
                </div>
              </div>
            ))}
          </div>

          {/* Rosetta Stone Visual Callout */}
          <div className="rounded-2xl border border-[#292e42] bg-[#141620] p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 rounded-xl overflow-hidden border border-[#2f354c]">
              <img
                src="/src/assets/images/cartouche_rosetta_stone_1793460319337.jpg"
                alt="حجر رشيد التاريخي المحفوظ في المتحف"
                className="w-full h-48 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:col-span-8 text-right space-y-2">
              <span className="text-xs text-[#d4a359] font-semibold">حجر رشيد عام 1799</span>
              <h3 className="text-lg font-bold text-[#f4efe6] font-amiri">
                المفتاح الذي جعل الهيروغليفية تتحدث بعد قرون من الصمت
              </h3>
              <p className="text-xs text-[#a0a5b8] leading-relaxed">
                كُتب حجر رشيد بثلاثة خطوط: الهيروغليفية، والديموطيقية، واليونانية القديمة.
                بفضل هذا الحجر، استطاع العالم الفرنسي الشاب جان فرانسوا شامبليون سنة 1822 فك شفرة اللغة المصرية القديمة بعد مقارنة أسماء الملوك المحاطة بالخراطيش.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. NUMBERS VIEW */}
      {subTab === 'numbers' && (
        <div className="space-y-8">
          {/* Reference Numerals Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {EGYPTIAN_NUMERALS.map((item) => (
              <div
                key={item.value}
                className="bg-[#141620] border border-[#242839] rounded-xl p-4 text-center space-y-2"
              >
                <div className="text-3xl font-hieroglyph text-[#faebd7] py-2">
                  {item.glyph}
                </div>
                <div className="text-base font-bold text-[#d4a359] font-mono tabular-nums">
                  {item.value.toLocaleString('ar-EG')}
                </div>
                <div className="text-xs text-[#f4efe6] font-semibold">
                  {item.nameAr}
                </div>
                <div className="text-[10px] text-[#71768a] leading-tight">
                  {item.representationAr}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Number Converter Sandbox */}
          <div className="bg-[#141620] border border-[#2b3042] rounded-2xl p-6 sm:p-8 text-right space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#f4efe6] font-amiri">
                محول الأرقام الهيروغليفية التفاعلي
              </h3>
              <p className="text-xs text-[#8f94a8]">
                اكتب أي رقم حسابي وشاهد كيف كان يمثله المحاسب والكاتب الفرعوني بدقة!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="number"
                min="1"
                max="9999999"
                value={userNumber}
                onChange={(e) => setUserNumber(Number(e.target.value))}
                className="w-full sm:w-60 bg-[#0c0d12] border border-[#30364c] rounded-lg px-4 py-2.5 text-base font-mono tabular-nums text-[#faebd7] focus:outline-none focus:border-[#d4a359]"
              />
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#71768a]">أرقام شهيرة:</span>
                {[2026, 365, 1342, 55, 7, 100000].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => setUserNumber(sample)}
                    className="px-2.5 py-1 bg-[#1a1d2b] hover:bg-[#252a3d] text-[#c59b27] rounded text-xs transition-colors cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Rendered Egyptian Number Result */}
            <div className="bg-[#0c0d12] border border-[#242839] rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="text-4xl sm:text-6xl font-hieroglyph text-[#faebd7] tracking-widest break-all">
                {numeralResult.glyphs || '𓏤'}
              </div>
              <div className="text-xs text-[#8f94a8]">
                القيمة بالرموز الهيروغليفية المتكررة:
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {numeralResult.breakdown.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#161824] border border-[#2b3044] rounded text-xs text-[#d4a359]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FAMOUS CARTOUCHES VIEW */}
      {subTab === 'cartouches' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAMOUS_CARTOUCHES.map((cartouche) => (
              <div
                key={cartouche.id}
                className="bg-[#141620] border border-[#262a3a] rounded-xl p-6 text-right space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#212433] pb-3">
                  <span className="text-xs text-[#71768a]">{cartouche.dynastyAr}</span>
                  <h3 className="text-lg font-bold text-[#f4efe6] font-amiri">
                    {cartouche.pharaohNameAr}
                  </h3>
                </div>

                {/* Cartouche Visual */}
                <div className="bg-[#0c0d12] rounded-xl p-6 border border-[#242839] flex flex-col items-center justify-center">
                  <div className="border-3 border-[#d4a359] rounded-full px-6 py-3 bg-[#171924]/80 flex items-center justify-center gap-2 shadow-md">
                    <span className="text-3xl sm:text-4xl font-hieroglyph text-[#faebd7]">
                      {cartouche.glyphs}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#d4a359] mt-3">
                    {cartouche.transliteration}
                  </div>
                </div>

                <div className="text-xs text-[#b2b7ca] space-y-1">
                  <div className="font-semibold text-[#f4efe6]">معنى الاسم الملكي:</div>
                  <p className="text-xs text-[#a0a5b8] leading-relaxed">
                    {cartouche.meaningAr}
                  </p>
                </div>

                {/* Breakdown */}
                <div className="space-y-1.5 pt-2 border-t border-[#1e2230]">
                  <div className="text-[11px] text-[#71768a] font-semibold">تفصيل مقاطع الاسم:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {cartouche.breakdown.map((part, idx) => (
                      <div key={idx} className="p-2 bg-[#0c0d12] rounded border border-[#1e2230] flex items-center gap-2">
                        <span className="text-lg font-hieroglyph text-[#d4a359]">{part.glyph}</span>
                        <div>
                          <div className="font-semibold text-[#f4efe6]">{part.sound}</div>
                          <div className="text-[10px] text-[#71768a]">{part.meaning}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. EVERYDAY PHRASES VIEW */}
      {subTab === 'phrases' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EVERYDAY_PHRASES.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#141620] border border-[#262a3a] rounded-xl p-5 text-right space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#212433] pb-2">
                  <span className="text-xs font-mono text-[#d4a359]">{item.transliteration}</span>
                  <h3 className="text-base font-bold text-[#f4efe6] font-amiri">
                    {item.phraseAr}
                  </h3>
                </div>

                <div className="bg-[#0c0d12] p-4 rounded-lg border border-[#222536] text-center">
                  <span className="text-3xl sm:text-4xl font-hieroglyph text-[#faebd7]">
                    {item.hieroglyphs}
                  </span>
                </div>

                <div className="text-xs text-[#cad0e0]">
                  <span className="font-bold text-[#d4a359]">المعنى:</span> {item.meaningAr}
                </div>

                <div className="text-[11px] text-[#71768a] leading-relaxed">
                  {item.contextAr}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Symbol Detail Modal */}
      {selectedSymbol && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-symbol-title"
          className="fixed inset-0 z-50 bg-[#0c0d12]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedSymbol(null)}
        >
          <div
            className="bg-[#141622] border border-[#353b52] rounded-2xl max-w-lg w-full p-6 text-right space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#24283b] pb-4">
              <button
                type="button"
                onClick={() => setSelectedSymbol(null)}
                aria-label="إغلاق تفاصيل الرمز"
                className="w-8 h-8 rounded-full bg-[#1e2233] text-[#8f94a8] hover:text-[#f4efe6] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
              <div>
                <span className="text-xs text-[#d4a359] font-mono">{selectedSymbol.gardiner}</span>
                <h3 id="modal-symbol-title" className="text-xl font-bold text-[#f4efe6] font-amiri">
                  {selectedSymbol.nameAr}
                </h3>
              </div>
            </div>

            <div className="bg-[#0c0d12] border border-[#252a3c] rounded-xl p-8 flex flex-col items-center justify-center">
              <span className="text-8xl font-hieroglyph text-[#faebd7]">
                {selectedSymbol.glyph}
              </span>
              <div className="mt-3 text-xs text-[#d4a359] font-mono">
                {selectedSymbol.transliteration}
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#cad0e0]">
              <div className="p-3 bg-[#191c2b] rounded-lg border border-[#262b3d]">
                <div className="font-semibold text-[#f4efe6] mb-1">دلالة الرمز في مصر القديمة:</div>
                <p className="text-xs text-[#8f94a8] leading-relaxed">
                  {selectedSymbol.meaningAr}
                </p>
              </div>

              <div className="p-3 bg-[#191c2b] rounded-lg border border-[#262b3d]">
                <div className="font-semibold text-[#d4a359] mb-1">معلومة أثرية ممتعة:</div>
                <p className="text-xs text-[#f4efe6] leading-relaxed">
                  {selectedSymbol.funFactAr}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(selectedSymbol.glyph);
                  setSelectedSymbol(null);
                }}
                className="px-5 py-2.5 bg-[#d4a359] hover:bg-[#e2b772] text-[#0c0d12] font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                نسخ الرمز للحافظة
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
