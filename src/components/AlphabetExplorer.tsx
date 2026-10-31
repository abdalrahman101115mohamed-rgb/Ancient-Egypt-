import React, { useState } from 'react';
import { UNILITERAL_ALPHABET, HieroglyphLetter } from '../data/hieroglyphsData';

export const AlphabetExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<HieroglyphLetter | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  const filteredLetters = UNILITERAL_ALPHABET.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.nameAr.toLowerCase().includes(q) ||
      item.soundAr.toLowerCase().includes(q) ||
      item.soundEn.toLowerCase().includes(q) ||
      item.gardiner.toLowerCase().includes(q) ||
      item.objectDescriptionAr.toLowerCase().includes(q)
    );
  });

  const handlePlaySound = (letter: HieroglyphLetter, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAudioId(letter.id);

    // Use Web Speech API if supported for phonetic pronunciation
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(letter.soundAr.split(' ')[0]);
      utterance.lang = 'ar-EG';
      utterance.rate = 0.85;
      utterance.onend = () => setActiveAudioId(null);
      utterance.onerror = () => setActiveAudioId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setActiveAudioId(null), 800);
    }
  };

  const handleCopyGlyph = (letter: HieroglyphLetter, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(letter.glyph);
    setCopiedId(letter.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Title Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-right">
        <div>
          <div className="text-xs text-[#d4a359] font-medium tracking-wide">
            الأبجدية الأحادية · الحروف الـ 24
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6] font-amiri">
            الأبجدية الهيروغليفية الصوتية
          </h2>
          <p className="text-sm text-[#8f94a8] mt-1 max-w-2xl leading-relaxed">
            اخترع المصريون القدماء هذه الـ ٢٤ علامة صوتية (توازي تماماً حروف الأبجدية المعاصرة).
            كل رمز مستوحى من كائن أو أداة حقيقية في بيئة وادي النيل وصحراء مصر.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالحرف، الصوت، أو الكائن..."
            className="w-full bg-[#141620] border border-[#2a2e40] rounded-lg px-4 py-2.5 text-xs text-[#f4efe6] placeholder-[#656b82] focus:outline-none focus:border-[#d4a359]"
          />
        </div>
      </div>

      {/* 24 Letters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {filteredLetters.map((letter) => (
          <div
            key={letter.id}
            onClick={() => setSelectedLetter(letter)}
            className="bg-[#141620] hover:bg-[#1a1d2b] border border-[#232737] hover:border-[#d4a359]/50 rounded-xl p-4 text-center cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            {/* Top metadata */}
            <div className="flex items-center justify-between text-[11px] text-[#71768a] mb-2">
              <span className="font-mono text-[#8f94a8]">{letter.gardiner}</span>
              <span className="text-[#d4a359] font-semibold">{letter.soundAr.split(' ')[0]}</span>
            </div>

            {/* Glyph Symbol */}
            <div className="py-3 flex items-center justify-center">
              <span className="text-5xl font-hieroglyph text-[#faebd7] group-hover:scale-115 transition-transform">
                {letter.glyph}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-1 pt-2 border-t border-[#1e2230]">
              <div className="text-xs font-bold text-[#f4efe6] truncate">{letter.nameAr}</div>
              <div className="text-[11px] text-[#8f94a8] truncate">{letter.objectDescriptionAr}</div>
            </div>

            {/* Quick action bar */}
            <div className="mt-3 pt-2 flex items-center justify-center gap-2 border-t border-[#191c28]">
              <button
                type="button"
                onClick={(e) => handlePlaySound(letter, e)}
                title="استمع لنطق الصوت"
                aria-label={`استمع لنطق صوت حرف ${letter.nameAr}`}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  activeAudioId === letter.id ? 'bg-[#d4a359] text-[#0c0d12]' : 'text-[#8f94a8] hover:text-[#d4a359]'
                }`}
              >
                🔊
              </button>
              <button
                type="button"
                onClick={(e) => handleCopyGlyph(letter, e)}
                title="نسخ الرمز"
                aria-label={`نسخ رمز ${letter.nameAr}`}
                className="p-1.5 rounded text-xs text-[#8f94a8] hover:text-[#d4a359] transition-colors cursor-pointer"
              >
                {copiedId === letter.id ? '✓' : 'نسخ'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLetters.length === 0 && (
        <div className="p-12 text-center text-sm text-[#71768a] bg-[#141620] rounded-xl border border-[#232737]">
          لم يتم العثور على رموز تطابق بحثك "{searchQuery}". جرّب كتابة اسم الحرف مثل "بومة" أو "ميم" أو كود "G17".
        </div>
      )}

      {/* Selected Letter Detail Modal / Drawer */}
      {selectedLetter && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-letter-title"
          className="fixed inset-0 z-50 bg-[#0c0d12]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedLetter(null)}
        >
          <div
            className="bg-[#141622] border border-[#353b52] rounded-2xl max-w-lg w-full p-6 text-right space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#24283b] pb-4">
              <button
                type="button"
                onClick={() => setSelectedLetter(null)}
                aria-label="إغلاق تفاصيل الرمز"
                className="w-8 h-8 rounded-full bg-[#1e2233] text-[#8f94a8] hover:text-[#f4efe6] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
              <div>
                <span className="text-xs text-[#d4a359] font-mono">{selectedLetter.gardiner}</span>
                <h3 id="modal-letter-title" className="text-xl font-bold text-[#f4efe6] font-amiri">
                  {selectedLetter.nameAr}
                </h3>
              </div>
            </div>

            {/* Giant Glyph Showcase */}
            <div className="bg-[#0c0d12] border border-[#252a3c] rounded-xl p-8 flex flex-col items-center justify-center relative">
              <span className="text-7xl sm:text-8xl font-hieroglyph text-[#faebd7]">
                {selectedLetter.glyph}
              </span>
              <div className="mt-4 flex items-center gap-3 text-xs">
                <span className="text-[#8f94a8]">الصوت الصوتي:</span>
                <span className="text-[#d4a359] font-bold text-sm">{selectedLetter.soundAr}</span>
                <span className="text-[#71768a] font-mono">({selectedLetter.transliteration})</span>
              </div>
            </div>

            {/* Curatorial Details */}
            <div className="space-y-3 text-xs sm:text-sm text-[#b2b7ca]">
              <div className="p-3 bg-[#191c2b] rounded-lg border border-[#262b3d]">
                <div className="font-semibold text-[#f4efe6] mb-1">ماذا يمثل هذا الرمز في الأصل؟</div>
                <p className="text-xs text-[#8f94a8] leading-relaxed">
                  {selectedLetter.objectDescriptionAr} ({selectedLetter.objectDescriptionEn}).
                </p>
              </div>

              <div className="p-3 bg-[#191c2b] rounded-lg border border-[#262b3d]">
                <div className="font-semibold text-[#d4a359] mb-1">💡 حيلة ذهنية للحفظ السريع:</div>
                <p className="text-xs text-[#f4efe6] leading-relaxed">
                  {selectedLetter.mnemonicAr}
                </p>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={(e) => handlePlaySound(selectedLetter, e)}
                className="px-4 py-2 bg-[#202538] hover:bg-[#2b3149] text-[#f4efe6] text-xs font-semibold rounded-lg border border-[#343a50] transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>استمع للنطق</span>
                <span>🔊</span>
              </button>

              <button
                type="button"
                onClick={(e) => handleCopyGlyph(selectedLetter, e)}
                className="px-4 py-2 bg-[#d4a359] hover:bg-[#e2b772] text-[#0c0d12] text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                {copiedId === selectedLetter.id ? '✓ تم النسخ' : 'نسخ الرمز للحافظة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
