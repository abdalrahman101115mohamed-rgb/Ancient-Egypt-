import React, { useState } from 'react';
import { INTERACTIVE_LESSONS, Lesson } from '../data/hieroglyphsData';

export const InteractiveLessons: React.FC = () => {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([]);

  const activeLesson: Lesson =
    INTERACTIVE_LESSONS.find((l) => l.id === selectedLessonId) || INTERACTIVE_LESSONS[0];

  const handleSelectLesson = (id: number) => {
    setSelectedLessonId(id);
    setSelectedAnswer(null);
    setHasSubmitted(false);
  };

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setHasSubmitted(true);
    if (selectedAnswer === activeLesson.interactiveChallenge.correctIndex) {
      if (!completedLessonIds.includes(activeLesson.id)) {
        setCompletedLessonIds((prev) => [...prev, activeLesson.id]);
      }
    }
  };

  const handleNextLesson = () => {
    if (selectedLessonId < INTERACTIVE_LESSONS.length) {
      handleSelectLesson(selectedLessonId + 1);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-right mb-8 space-y-2">
        <div className="text-xs text-[#d4a359] font-medium tracking-wide">
          المنهج التدريجي · مدرسة الكَتَبَة القدماء
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6] font-amiri">
          دروس تفاعلية مبسطة لتعلم الهيروغليفية
        </h2>
        <p className="text-sm text-[#8f94a8] max-w-2xl leading-relaxed">
          خمس خطوات مدروسة تأخذك من الصفر حتى تتمكن من قراءة وفهم النقوش المصرية القديمة وأختام الملوك.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Lesson Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-[#141620] border border-[#262a3a] rounded-xl p-4 text-right space-y-2">
            <div className="text-xs font-semibold text-[#8f94a8] mb-3">
              مسار الدروس ({completedLessonIds.length} من {INTERACTIVE_LESSONS.length} مكتملة):
            </div>

            {INTERACTIVE_LESSONS.map((lesson) => {
              const isSelected = lesson.id === selectedLessonId;
              const isCompleted = completedLessonIds.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className={`w-full text-right p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-[#d4a359] bg-[#1e2233] text-[#f4efe6] shadow-sm'
                      : 'border-[#222533] bg-[#0c0d12] text-[#a0a5b8] hover:border-[#33374b]'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs font-bold truncate">
                      <span className="font-mono text-[#d4a359]">0{lesson.id}.</span>
                      <span className="truncate">{lesson.titleAr}</span>
                    </div>
                    <div className="text-[11px] text-[#71768a] truncate mt-0.5">
                      {lesson.subtitleAr}
                    </div>
                  </div>

                  <span className="shrink-0 text-xs font-medium">
                    {isCompleted ? (
                      <span className="text-emerald-400 font-bold">✓ مكتمل</span>
                    ) : (
                      <span className="text-[#71768a]">{lesson.duration}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Temple Wall Visual Callout */}
          <div className="rounded-xl overflow-hidden border border-[#272b3c] relative">
            <img
              src="/src/assets/images/temple_hieroglyphic_relief_1793460319451.jpg"
              alt="نقوش جدارية في معبد الكرنك توضح الهيروغليفية"
              className="w-full h-44 object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/50 to-transparent p-4 flex flex-col justify-end text-right">
              <span className="text-[11px] text-[#d4a359] font-medium">نقوش معبد الكرنك</span>
              <span className="text-xs text-[#f4efe6]">لاحظ اتجاه وجوه الصقور والكوبرا لقراءة السطور بدقة!</span>
            </div>
          </div>
        </div>

        {/* Lesson Content Area (8 cols) */}
        <div className="lg:col-span-8 bg-[#141620] border border-[#262a3a] rounded-xl p-6 sm:p-8 text-right space-y-6">
          
          {/* Header of Active Lesson */}
          <div className="border-b border-[#212433] pb-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8f94a8]">
              <span>الدرس 0{activeLesson.id} · المستوى: {activeLesson.level}</span>
              <span>المدة المقدرة: {activeLesson.duration}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f4efe6] font-amiri">
              {activeLesson.titleAr}
            </h3>
            <p className="text-xs sm:text-sm text-[#d4a359]">
              {activeLesson.subtitleAr}
            </p>
          </div>

          {/* Concept Summary Callout */}
          <div className="p-4 bg-[#0c0d12] border border-[#292d3f] rounded-lg">
            <div className="text-xs font-bold text-[#f4efe6] mb-1">الخلاصة المفتاحية:</div>
            <p className="text-xs sm:text-sm text-[#b2b7ca] leading-relaxed">
              {activeLesson.conceptSummary}
            </p>
          </div>

          {/* Detailed Content Sections */}
          <div className="space-y-6 text-[#cad0e0] leading-relaxed text-sm">
            {activeLesson.contentSections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-base font-bold text-[#f4efe6] font-amiri border-r-2 border-[#d4a359] pr-3">
                  {sec.heading}
                </h4>
                <p className="text-xs sm:text-sm text-[#9aa0b4] whitespace-pre-line leading-relaxed pr-3">
                  {sec.body}
                </p>

                {sec.highlightGlyphs && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 pr-3">
                    {sec.highlightGlyphs.map((h, i) => (
                      <div
                        key={i}
                        className="bg-[#0c0d12] border border-[#212536] rounded p-2 text-center"
                      >
                        <div className="text-2xl font-hieroglyph text-[#faebd7]">{h.glyph}</div>
                        <div className="text-[11px] text-[#d4a359] mt-0.5">{h.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Checkpoint / Quiz */}
          <div className="mt-8 pt-6 border-t border-[#212433] space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4a359]">
              <span className="font-hieroglyph text-base">𓁹</span>
              <span>تحدي الفهم السريع:</span>
            </div>

            <p className="text-sm font-semibold text-[#f4efe6]">
              {activeLesson.interactiveChallenge.question}
            </p>

            <div className="space-y-2">
              {activeLesson.interactiveChallenge.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === activeLesson.interactiveChallenge.correctIndex;
                let btnStyle = 'border-[#262a3a] bg-[#0c0d12] text-[#cad0e0] hover:border-[#383d54]';

                if (hasSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-300';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-[#d4a359] bg-[#d4a359]/10 text-[#faebd7] font-bold';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-right p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Submit / Feedback Button */}
            {!hasSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="w-full py-2.5 bg-[#d4a359] hover:bg-[#e2b772] disabled:opacity-50 text-[#0c0d12] font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer mt-2"
              >
                تأكيد الإجابة
              </button>
            ) : (
              <div className="space-y-4 pt-2">
                <div
                  className={`p-3 rounded-lg text-xs leading-relaxed border ${
                    selectedAnswer === activeLesson.interactiveChallenge.correctIndex
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                      : 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                  }`}
                >
                  {activeLesson.interactiveChallenge.explanation}
                </div>

                {selectedLessonId < INTERACTIVE_LESSONS.length && (
                  <button
                    type="button"
                    onClick={handleNextLesson}
                    className="w-full py-2.5 bg-[#1f2434] hover:bg-[#282e44] text-[#faebd7] border border-[#3b425e] font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>الانتقال للدرس التالي (0{selectedLessonId + 1})</span>
                    <span>←</span>
                  </button>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
