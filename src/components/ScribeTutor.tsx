import React, { useState, useRef, useEffect, useId } from 'react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'scribe';
  text: string;
  timestamp: string;
}

export const ScribeTutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'scribe',
      text: 'سلامٌ عليك يا باحث الحكمة. أنا "حكيم الكَتَبَة"، مستعدٌ للإجابة عن أي تساؤل يدور في ذهنك حول لغة أجدادنا الفراعنة (مدو نتر)، وتفسير الرموز، أو مساعدتك في كتابة وقراءة أي كلمة مصرية قديمة.',
      timestamp: 'الآن'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scribeInputId = useId();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/scribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text })
      });

      if (!response.ok) {
        throw new Error('فشل الاتصال بمكتبة الكاتب');
      }

      const data = await response.json();
      const scribeMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'scribe',
        text: data.reply || 'لقد دوّنت سؤالك، لكن البرديات تحتاج إعادة نظر.',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, scribeMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'scribe',
        text: 'في الكتابة الهيروغليفية، كل رمز يحمل روحاً ومعنى. الرموز تنقسم إلى أحرف صوتية (مثل 𓅓 للميم و𓂋 للراء) ومخصصات دلالية في نهاية الكلمة. جرّب الاستفسار عن رمز محدد كالعنخ أو الخرطوشة!',
        timestamp: 'الآن'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    'كيف أعرف اتجاه قراءة السطر الهيروغليفي؟',
    'ما هي فكرة الخرطوشة الملكية وكيف تحمي الاسم؟',
    'ما الفرق بين الرمز الصوتي والمخصص؟',
    'كيف فك شامبليون لغز حجر رشيد؟'
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-right mb-8 space-y-2">
        <div className="text-xs text-[#d4a359] font-medium tracking-wide">
          معلم الذكاء الاصطناعي · دار الحياة Per Ankh
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6] font-amiri">
          حكيم الكَتَبَة الذكي
        </h2>
        <p className="text-sm text-[#8f94a8] max-w-2xl leading-relaxed">
          اسأل عن أي رمز، أو استفسر عن كيفية تهجئة أي كلمة، أو استكشف التاريخ الممتد لخمسة آلاف عام.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Scribe Thoth Portrait & Tips Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#141620] border border-[#272b3c] rounded-2xl overflow-hidden shadow-xl">
            <div className="h-48 relative overflow-hidden bg-[#0c0d12]">
              <img
                src="/src/assets/images/scribe_thoth_ancient_art_1793460318959.jpg"
                alt="لوحة حكيم الكَتَبَة مستوحاة من الإله تحوت راعي العلم والكتابة"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-transparent" />
            </div>

            <div className="p-5 text-right space-y-3">
              <div>
                <h3 className="text-base font-bold text-[#f4efe6] font-amiri">
                  تحوت · راعي الكَتَبَة والحكمة
                </h3>
                <div className="text-xs text-[#d4a359]">
                  مستشار المعرفة واللغة المصرية القديمة
                </div>
              </div>

              <p className="text-xs text-[#9aa0b4] leading-relaxed">
                في مصر القديمة، كان الكاتب يحتل أرفع مكانة اجتماعية في البلاط؛ لأن القلم والمداد كانا يصنعان الخلود ويحفظان أمجاد الملوك والعلوم الطبية والفلكية.
              </p>

              <div className="pt-2 border-t border-[#1e2232] space-y-1.5 text-xs text-[#8f94a8]">
                <div className="font-semibold text-[#f4efe6]">أسئلة شائعة يمكنك طرحها:</div>
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="w-full text-right p-2 rounded bg-[#0c0d12] hover:bg-[#1a1d2c] text-[11px] text-[#cad0e0] transition-colors cursor-pointer block border border-[#202434]"
                  >
                    • {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Window Column (8 cols) */}
        <div className="lg:col-span-8 bg-[#141620] border border-[#262a3a] rounded-2xl flex flex-col h-[600px] overflow-hidden shadow-xl">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-[#212433] bg-[#0f1118] flex items-center justify-between text-right">
            <span className="text-xs text-[#8f94a8]">جلسة مباشرة مع حكيم الكَتَبَة</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#f4efe6] font-amiri">دار الكَتَبَة</span>
              <span className="font-hieroglyph text-[#d4a359]">𓏞</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-right">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#d4a359] text-[#0c0d12] font-medium rounded-br-none shadow-md'
                      : 'bg-[#0c0d12] text-[#e0e3ed] border border-[#262a3b] rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[10px] text-[#5e6377] mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-end">
                <div className="bg-[#0c0d12] border border-[#262a3b] rounded-2xl rounded-bl-none p-3 text-xs text-[#d4a359] flex items-center gap-2">
                  <span className="font-hieroglyph animate-pulse text-lg">𓏞</span>
                  <span>حكيم الكَتَبَة يراجع البرديات القديمة للإجابة...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 border-t border-[#212433] bg-[#0f1118]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-5 py-2.5 bg-[#d4a359] hover:bg-[#e2b772] disabled:opacity-40 text-[#0c0d12] font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shrink-0"
              >
                إرسال السؤال
              </button>
              <input
                id={scribeInputId}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="اسأل الحكيم عن أي حرف، رمز، أو معنى..."
                className="flex-1 bg-[#0c0d12] border border-[#282d3f] rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#f4efe6] placeholder-[#5f657a] focus:outline-none focus:border-[#d4a359] text-right"
              />
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
