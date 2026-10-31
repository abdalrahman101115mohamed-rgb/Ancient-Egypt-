import React, { useState, useId } from 'react';
import { generateCartoucheFromName, CartoucheGlyphItem } from '../utils/cartoucheGenerator';
import { FAMOUS_CARTOUCHES } from '../data/hieroglyphsData';

export const CartoucheStudio: React.FC = () => {
  const [inputName, setInputName] = useState<string>('محمد');
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [theme, setTheme] = useState<'gold' | 'lapis' | 'stone'>('gold');
  const [prefix, setPrefix] = useState<string>('none');
  const [suffix, setSuffix] = useState<string>('man');
  const [copied, setCopied] = useState(false);
  const nameInputId = useId();

  const generated = generateCartoucheFromName(inputName);

  // Suffix determinatives
  const suffixGlyphs: Record<string, string> = {
    man: '𓀀',
    woman: '𓁐',
    king: '𓇓',
    none: ''
  };

  // Prefix royal titles
  const prefixGlyphs: Record<string, { glyph: string; title: string }> = {
    sara: { glyph: '𓅭𓇳', title: 'سا رع (ابن الشمس)' },
    nesut: { glyph: '𓇓𓆤', title: 'ني سوت بيتي (ملك مصر)' },
    ankh: { glyph: '𓋹', title: 'عنخ (المُعطى الحياة)' },
    none: { glyph: '', title: '' }
  };

  const activePrefix = prefixGlyphs[prefix];
  const activeSuffixGlyph = suffixGlyphs[suffix];

  const fullDisplayString = `${activePrefix.glyph ? activePrefix.glyph + ' ' : ''}${generated.fullGlyphString}${activeSuffixGlyph ? ' ' + activeSuffixGlyph : ''}`;

  const handleCopy = () => {
    if (!fullDisplayString.trim()) return;
    navigator.clipboard.writeText(fullDisplayString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSelectPreset = (name: string) => {
    setInputName(name);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-right mb-10 space-y-2">
        <div className="text-xs text-[#d4a359] font-medium tracking-wide">
          المرسم الملكي · شـنـو Shenu
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6] font-amiri">
          صانع الخرطوشة الملكية التفاعلي
        </h2>
        <p className="text-sm text-[#8f94a8] max-w-2xl leading-relaxed">
          اكتب اسمك بالعربية أو بالإنجليزية، وشاهد كيف كان سيكتبه كبار كَتَبَة الفراعنة داخل خرطوشة بيضاوية مقدسة تحمي الاسم وتمنحه الخلود.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 bg-[#141620] border border-[#262a3a] rounded-xl p-6 space-y-6 text-right">
          
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor={nameInputId} className="block text-xs font-semibold text-[#c7cbd9]">
              اكتب اسمك أو أي كلمة (بالعربية أو الإنجليزية):
            </label>
            <div className="relative">
              <input
                id={nameInputId}
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="مثال: أحمد، سارة، نور، عمر، كريم..."
                className="w-full bg-[#0c0d12] border border-[#2b2f42] rounded-lg px-4 py-3 text-[#f4efe6] placeholder-[#5c6177] focus:outline-none focus:border-[#d4a359] text-base"
                maxLength={30}
              />
              {inputName && (
                <button
                  type="button"
                  onClick={() => setInputName('')}
                  aria-label="مسح حقل الاسم"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#71768a] hover:text-[#f4efe6] cursor-pointer"
                >
                  مسح
                </button>
              )}
            </div>

            {/* Quick preset buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[#71768a]">أسماء شائعة للتجربة:</span>
              {['أحمد', 'مريم', 'سارة', 'علي', 'ياسمين', 'توت', 'كليوباترا'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="px-2 py-1 bg-[#1a1c27] hover:bg-[#252838] text-[#c59b27] rounded text-[11px] transition-colors cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Orientation Selector */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-[#c7cbd9]">
              شكل الخرطوشة:
            </span>
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#0c0d12] rounded-lg border border-[#262939]">
              <button
                type="button"
                onClick={() => setOrientation('vertical')}
                className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  orientation === 'vertical'
                    ? 'bg-[#1e2230] text-[#d4a359] shadow-sm font-bold'
                    : 'text-[#8f94a8] hover:text-[#f4efe6]'
                }`}
              >
                رأسي (أعمدة المعابد)
              </button>
              <button
                type="button"
                onClick={() => setOrientation('horizontal')}
                className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  orientation === 'horizontal'
                    ? 'bg-[#1e2230] text-[#d4a359] shadow-sm font-bold'
                    : 'text-[#8f94a8] hover:text-[#f4efe6]'
                }`}
              >
                أفقي (الجداريات واللوحات)
              </button>
            </div>
          </div>

          {/* Theme Selector */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-[#c7cbd9]">
              طراز الذهب والزخرفة:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTheme('gold')}
                className={`p-2.5 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                  theme === 'gold'
                    ? 'border-[#d4a359] bg-[#d4a359]/10 text-[#d4a359]'
                    : 'border-[#262939] bg-[#0c0d12] text-[#8f94a8] hover:border-[#3d4257]'
                }`}
              >
                ذهب فرعوني
              </button>
              <button
                type="button"
                onClick={() => setTheme('lapis')}
                className={`p-2.5 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                  theme === 'lapis'
                    ? 'border-[#38bdf8] bg-[#38bdf8]/10 text-[#38bdf8]'
                    : 'border-[#262939] bg-[#0c0d12] text-[#8f94a8] hover:border-[#3d4257]'
                }`}
              >
                حجر اللازورد
              </button>
              <button
                type="button"
                onClick={() => setTheme('stone')}
                className={`p-2.5 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                  theme === 'stone'
                    ? 'border-[#e2b772] bg-[#e2b772]/10 text-[#faebd7]'
                    : 'border-[#262939] bg-[#0c0d12] text-[#8f94a8] hover:border-[#3d4257]'
                }`}
              >
                حجر رملي معبدي
              </button>
            </div>
          </div>

          {/* Suffix / Determinative */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-[#c7cbd9]">
              المخصص الفرعوني (في نهاية الاسم):
            </span>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSuffix('man')}
                className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                  suffix === 'man' ? 'border-[#d4a359] bg-[#d4a359]/15 text-[#d4a359]' : 'border-[#262939] bg-[#0c0d12] text-[#8f94a8]'
                }`}
              >
                <div className="font-hieroglyph text-lg">𓀀</div>
                <div className="text-[10px] mt-0.5">رجل</div>
              </button>
              <button
                type="button"
                onClick={() => setSuffix('woman')}
                className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                  suffix === 'woman' ? 'border-[#d4a359] bg-[#d4a359]/15 text-[#d4a359]' : 'border-[#262939] bg-[#0c0d12] text-[#8f94a8]'
                }`}
              >
                <div className="font-hieroglyph text-lg">𓁐</div>
                <div className="text-[10px] mt-0.5">سيدة</div>
              </button>
              <button
                type="button"
                onClick={() => setSuffix('king')}
                className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                  suffix === 'king' ? 'border-[#d4a359] bg-[#d4a359]/15 text-[#d4a359]' : 'border-[#262939] bg-[#0c0d12] text-[#8f94a8]'
                }`}
              >
                <div className="font-hieroglyph text-lg">𓇓</div>
                <div className="text-[10px] mt-0.5">ملك</div>
              </button>
              <button
                type="button"
                onClick={() => setSuffix('none')}
                className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                  suffix === 'none' ? 'border-[#d4a359] bg-[#d4a359]/15 text-[#d4a359]' : 'border-[#262939] bg-[#0c0d12] text-[#8f94a8]'
                }`}
              >
                <div className="text-base">-</div>
                <div className="text-[10px] mt-0.5">بدون</div>
              </button>
            </div>
          </div>

          {/* Royal Prefix */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-[#c7cbd9]">
              اللقب الملكي (يسبق الخرطوشة):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPrefix('sara')}
                className={`p-2 rounded border text-right transition-colors cursor-pointer ${
                  prefix === 'sara' ? 'border-[#d4a359] bg-[#d4a359]/10 text-[#d4a359]' : 'border-[#262939] bg-[#0c0d12] text-[#8f94a8]'
                }`}
              >
                <div className="font-bold">ابن الشمس (سا رع)</div>
                <div className="font-hieroglyph text-sm">𓅭𓇳</div>
              </button>
              <button
                type="button"
                onClick={() => setPrefix('none')}
                className={`p-2 rounded border text-right transition-colors cursor-pointer ${
                  prefix === 'none' ? 'border-[#d4a359] bg-[#d4a359]/10 text-[#d4a359]' : 'border-[#262939] bg-[#0c0d12] text-[#8f94a8]'
                }`}
              >
                <div className="font-bold">بدون لقب</div>
                <div className="text-[11px] text-[#71768a]">الخرطوشة فقط</div>
              </button>
            </div>
          </div>

        </div>

        {/* Display Canvas & Result Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cartouche Card */}
          <div
            className={`rounded-2xl border p-8 flex flex-col items-center justify-center min-h-[380px] relative transition-all ${
              theme === 'gold'
                ? 'bg-gradient-to-b from-[#141620] to-[#0c0d12] border-[#443b22]'
                : theme === 'lapis'
                ? 'bg-gradient-to-b from-[#0e1726] to-[#0a0e17] border-[#1e3a8a]'
                : 'bg-gradient-to-b from-[#1c1815] to-[#12100e] border-[#4a3928]'
            }`}
          >
            {/* Royal Title Header */}
            {activePrefix.title && (
              <div className="mb-4 text-xs font-medium text-[#d4a359] flex items-center gap-2">
                <span className="font-hieroglyph text-lg">{activePrefix.glyph}</span>
                <span>{activePrefix.title}</span>
              </div>
            )}

            {/* Cartouche Geometry */}
            {orientation === 'vertical' ? (
              // Vertical Cartouche (Columns)
              <div className="relative flex flex-col items-center my-4 group">
                {/* Oval Loop */}
                <div
                  className={`border-4 rounded-full px-8 py-10 flex flex-col items-center justify-center gap-3 min-h-[220px] min-w-[130px] shadow-2xl relative transition-all ${
                    theme === 'gold'
                      ? 'border-[#d4a359] bg-[#171924]/80 shadow-[0_0_30px_rgba(212,163,89,0.2)]'
                      : theme === 'lapis'
                      ? 'border-[#38bdf8] bg-[#0f172a]/90 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
                      : 'border-[#c59b27] bg-[#1c1814]/90 shadow-[0_0_30px_rgba(197,155,39,0.2)]'
                  }`}
                >
                  {generated.items.length === 0 ? (
                    <span className="text-xs text-[#71768a]">اكتب اسماً ليظهر هنا</span>
                  ) : (
                    generated.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-4xl sm:text-5xl font-hieroglyph text-[#faebd7] hover:scale-125 transition-transform cursor-pointer select-all"
                        title={`${item.char}: ${item.nameAr} (${item.sound})`}
                      >
                        {item.glyph}
                      </span>
                    ))
                  )}

                  {activeSuffixGlyph && (
                    <span className="text-3xl sm:text-4xl font-hieroglyph text-[#d4a359] border-t border-[#3a3f55] pt-2">
                      {activeSuffixGlyph}
                    </span>
                  )}
                </div>

                {/* Base Knot / Shen Bar */}
                <div
                  className={`w-24 h-3.5 mt-[-2px] rounded-sm relative shadow-md ${
                    theme === 'gold' ? 'bg-[#d4a359]' : theme === 'lapis' ? 'bg-[#38bdf8]' : 'bg-[#c59b27]'
                  }`}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-16 h-1 bg-[#0c0d12]/30 rounded-full" />
                </div>
              </div>
            ) : (
              // Horizontal Cartouche (Row)
              <div className="relative flex items-center my-4">
                <div
                  className={`border-4 rounded-full px-12 py-5 flex items-center justify-center gap-4 min-h-[90px] shadow-2xl relative ${
                    theme === 'gold'
                      ? 'border-[#d4a359] bg-[#171924]/80 shadow-[0_0_30px_rgba(212,163,89,0.2)]'
                      : theme === 'lapis'
                      ? 'border-[#38bdf8] bg-[#0f172a]/90 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
                      : 'border-[#c59b27] bg-[#1c1814]/90 shadow-[0_0_30px_rgba(197,155,39,0.2)]'
                  }`}
                >
                  {generated.items.length === 0 ? (
                    <span className="text-xs text-[#71768a]">اكتب اسماً ليظهر هنا</span>
                  ) : (
                    generated.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-4xl sm:text-5xl font-hieroglyph text-[#faebd7] hover:scale-125 transition-transform cursor-pointer select-all"
                        title={`${item.char}: ${item.nameAr} (${item.sound})`}
                      >
                        {item.glyph}
                      </span>
                    ))
                  )}

                  {activeSuffixGlyph && (
                    <span className="text-3xl font-hieroglyph text-[#d4a359] border-r border-[#3a3f55] pr-2">
                      {activeSuffixGlyph}
                    </span>
                  )}

                  {/* Knot on the side */}
                  <div
                    className={`absolute right-[-4px] top-1/2 -translate-y-1/2 w-3.5 h-16 rounded-sm shadow-md ${
                      theme === 'gold' ? 'bg-[#d4a359]' : theme === 'lapis' ? 'bg-[#38bdf8]' : 'bg-[#c59b27]'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Name label */}
            <div className="mt-5 text-center space-y-1">
              <div className="text-lg font-bold text-[#f4efe6] font-amiri tracking-wide">
                الفرعون: {generated.cleanedName || 'اسمك الكريم'}
              </div>
              <div className="text-xs text-[#8f94a8]">
                مكتوب بالرموز الصوتية لمصر القديمة (مدو نتر)
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!fullDisplayString.trim()}
                className="px-4 py-2 bg-[#202434] hover:bg-[#2b3046] text-[#f4efe6] text-xs font-semibold rounded-lg border border-[#373c54] transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>{copied ? '✓ تم نسخ الرموز بنجاح!' : 'نسخ رموز اليونيكود'}</span>
                <span className="font-hieroglyph text-sm">𓏏𓏤</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-[#d4a359] hover:bg-[#e2b772] text-[#0c0d12] text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>طباعة / حفظ شهادة الخرطوشة</span>
              </button>
            </div>

          </div>

          {/* Phonetic Breakdown Table */}
          <div className="bg-[#141620] border border-[#262a3a] rounded-xl p-5 text-right space-y-3">
            <div className="flex items-center justify-between border-b border-[#212433] pb-2">
              <h3 className="text-sm font-bold text-[#f4efe6]">
                تحليل كل حرف في اسمك ورمزه الفرعوني:
              </h3>
              <span className="text-xs text-[#8f94a8]">
                {generated.items.length} أحرف صوتية
              </span>
            </div>

            {generated.items.length === 0 ? (
              <p className="text-xs text-[#71768a] py-4 text-center">
                أدخل اسماً بالأعلى لتشاهد التفسير التفصيلي لكل رمز وكود جاردنر الخاص به.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                {generated.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[#0c0d12] rounded-lg border border-[#202332] flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-md bg-[#191c28] border border-[#2c3042] flex items-center justify-center shrink-0">
                      <span className="text-2xl font-hieroglyph text-[#d4a359]">{item.glyph}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#f4efe6]">{item.char}</span>
                        <span className="text-[10px] font-mono text-[#8f94a8]">{item.gardiner}</span>
                      </div>
                      <div className="text-xs text-[#d4a359] truncate">{item.nameAr}</div>
                      <div className="text-[11px] text-[#71768a] truncate">{item.objectDescriptionAr}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
