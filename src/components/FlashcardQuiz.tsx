import React, { useState } from 'react';
import { UNILITERAL_ALPHABET, QUIZ_QUESTIONS, QuizQuestion } from '../data/hieroglyphsData';

export const FlashcardQuiz: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'flashcards' | 'quiz'>('flashcards');

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = UNILITERAL_ALPHABET[cardIndex];

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuizQuestion: QuizQuestion = QUIZ_QUESTIONS[quizIndex];

  // Flashcard controls
  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % UNILITERAL_ALPHABET.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + UNILITERAL_ALPHABET.length) % UNILITERAL_ALPHABET.length);
  };

  // Quiz controls
  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQuizQuestion.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-right">
        <div>
          <div className="text-xs text-[#d4a359] font-medium tracking-wide">
            التدريب والممارسة · ترسيخ المعرفة
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6] font-amiri">
            البطاقات الذكية والاختبار التفاعلي
          </h2>
          <p className="text-sm text-[#8f94a8] mt-1 max-w-2xl leading-relaxed">
            اختبر سرعة استدعائك للرموز الهيروغليفية وأصواتها ومعانيها من خلال البطاقات الدوارة أو خض المسابقة الحية.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#141620] rounded-lg border border-[#242839] self-start sm:self-end">
          <button
            type="button"
            onClick={() => setActiveMode('flashcards')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeMode === 'flashcards'
                ? 'bg-[#1e2233] text-[#d4a359] shadow-sm'
                : 'text-[#8f94a8] hover:text-[#f4efe6]'
            }`}
          >
            البطاقات الذكية
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('quiz')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeMode === 'quiz'
                ? 'bg-[#1e2233] text-[#d4a359] shadow-sm'
                : 'text-[#8f94a8] hover:text-[#f4efe6]'
            }`}
          >
            المسابقة السريعة ({QUIZ_QUESTIONS.length} أسئلة)
          </button>
        </div>
      </div>

      {activeMode === 'flashcards' ? (
        // FLASHCARDS VIEW
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-[#8f94a8]">
            <span>البطاقة {cardIndex + 1} من {UNILITERAL_ALPHABET.length}</span>
            <span>انقر على البطاقة لقلبها واكتشاف المعنى</span>
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-80 rounded-2xl bg-[#141620] border border-[#2b3044] hover:border-[#d4a359]/60 transition-all cursor-pointer shadow-xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden select-none"
          >
            <div className="absolute top-4 right-4 text-xs font-mono text-[#71768a]">
              {currentCard.gardiner}
            </div>

            {!isFlipped ? (
              // Front: Giant Glyph
              <div className="space-y-4">
                <span className="text-8xl font-hieroglyph text-[#faebd7]">
                  {currentCard.glyph}
                </span>
                <div className="text-xs text-[#8f94a8]">
                  اضغط لمعرفة الصوت والمعنى في مصر القديمة
                </div>
              </div>
            ) : (
              // Back: Meaning and Phonetic
              <div className="space-y-3 text-right w-full">
                <div className="text-center pb-2 border-b border-[#24283a]">
                  <span className="text-3xl font-hieroglyph text-[#d4a359]">
                    {currentCard.glyph}
                  </span>
                  <div className="text-xl font-bold text-[#f4efe6] font-amiri mt-1">
                    {currentCard.nameAr}
                  </div>
                  <div className="text-xs text-[#d4a359] font-semibold">
                    الصوت الصوتي: {currentCard.soundAr} ({currentCard.transliteration})
                  </div>
                </div>

                <div className="text-xs text-[#a0a5b8] space-y-1 pt-1">
                  <div>
                    <span className="text-[#f4efe6] font-medium">ماذا يمثل الرمز:</span>{' '}
                    {currentCard.objectDescriptionAr}
                  </div>
                  <div className="text-[#e2b772]">
                    <span className="font-medium">سر الحفظ:</span> {currentCard.mnemonicAr}
                  </div>
                </div>
              </div>
            )}

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-[#5e6377]">
              {isFlipped ? 'انقر للعودة لوجه الرمز' : 'انقر لقلب البطاقة'}
            </div>
          </div>

          {/* Flashcard Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevCard}
              className="px-5 py-2.5 bg-[#171924] hover:bg-[#202332] text-[#f4efe6] text-xs font-semibold rounded-lg border border-[#2b2f42] transition-colors cursor-pointer"
            >
              ← السابق
            </button>

            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2 bg-[#222738] hover:bg-[#2b3147] text-[#d4a359] text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              قلب البطاقة 🔄
            </button>

            <button
              type="button"
              onClick={handleNextCard}
              className="px-5 py-2.5 bg-[#d4a359] hover:bg-[#e2b772] text-[#0c0d12] text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              التالي →
            </button>
          </div>
        </div>
      ) : (
        // QUIZ VIEW
        <div className="max-w-xl mx-auto space-y-6">
          {!quizFinished ? (
            <div className="bg-[#141620] border border-[#262a3a] rounded-xl p-6 sm:p-8 text-right space-y-6">
              
              {/* Question Header */}
              <div className="flex items-center justify-between text-xs text-[#8f94a8] border-b border-[#212433] pb-3">
                <span>السؤال {quizIndex + 1} من {QUIZ_QUESTIONS.length}</span>
                <span className="font-mono text-[#d4a359]">النتيجة: {score} نقاط</span>
              </div>

              {/* Glyph showcase if applicable */}
              {currentQuizQuestion.glyph !== '؟' && (
                <div className="bg-[#0c0d12] rounded-xl p-6 border border-[#24283a] flex items-center justify-center">
                  <span className="text-6xl font-hieroglyph text-[#faebd7]">
                    {currentQuizQuestion.glyph}
                  </span>
                </div>
              )}

              {/* Question text */}
              <h3 className="text-base sm:text-lg font-bold text-[#f4efe6] font-amiri leading-relaxed">
                {currentQuizQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuizQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuizQuestion.correctAnswerIndex;
                  let style = 'border-[#262a3a] bg-[#0c0d12] text-[#cad0e0] hover:border-[#3a4056]';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      style = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      style = 'border-rose-500 bg-rose-950/40 text-rose-300';
                    }
                  } else if (isSelected) {
                    style = 'border-[#d4a359] bg-[#d4a359]/15 text-[#faebd7] font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-right p-3.5 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer ${style}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Submit or Next Question */}
              {!isAnswerSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="w-full py-3 bg-[#d4a359] hover:bg-[#e2b772] disabled:opacity-50 text-[#0c0d12] font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
                >
                  تأكيد الإجابة
                </button>
              ) : (
                <div className="space-y-4 pt-2">
                  <div
                    className={`p-3 rounded-lg text-xs leading-relaxed border ${
                      selectedOption === currentQuizQuestion.correctAnswerIndex
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                    }`}
                  >
                    {currentQuizQuestion.explanation}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextQuizQuestion}
                    className="w-full py-3 bg-[#1e2334] hover:bg-[#282e44] text-[#faebd7] border border-[#373e57] font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
                  >
                    {quizIndex < QUIZ_QUESTIONS.length - 1 ? 'السؤال التالي ←' : 'عرض النتيجة النهائية'}
                  </button>
                </div>
              )}

            </div>
          ) : (
            // QUIZ RESULT SUMMARY
            <div className="bg-[#141620] border border-[#262a3a] rounded-xl p-8 text-center space-y-6">
              <span className="text-6xl font-hieroglyph text-[#d4a359]">𓋹</span>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#f4efe6] font-amiri">
                  اكتمل الاختبار بنجاح!
                </h3>
                <p className="text-sm text-[#8f94a8]">
                  حصلت على <span className="text-lg font-bold text-[#d4a359]">{score}</span> من{' '}
                  <span className="text-lg font-bold text-[#f4efe6]">{QUIZ_QUESTIONS.length}</span>
                </p>
              </div>

              <div className="p-4 bg-[#0c0d12] rounded-lg border border-[#242839] text-xs text-[#cad0e0] leading-relaxed">
                {score >= 6
                  ? 'رائع جداً! لديك بصيرة الكاتب المصري العظيم. استمر في التدرب وصمم خراطيش أصدقائك!'
                  : 'بداية طيبة ومبشرة! يمكنك مراجعة الأبجدية والدروس وإعادة الاختبار لتثبيت الرموز أكثر.'}
              </div>

              <button
                type="button"
                onClick={handleRestartQuiz}
                className="px-6 py-2.5 bg-[#d4a359] hover:bg-[#e2b772] text-[#0c0d12] font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
              >
                إعادة المحاولة من جديد
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
