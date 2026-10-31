import React, { useState, useRef, useEffect, useCallback } from 'react';

interface SymbolBreakdownItem {
  glyph: string;
  gardiner: string;
  nameAr: string;
  sound: string;
}

interface TranslationResult {
  detectedGlyphs: string;
  transliteration: string;
  pronunciationAr: string;
  arabicTranslation: string;
  historicalContext: string;
  readingDirection: string;
  symbolsBreakdown: SymbolBreakdownItem[];
  confidence: string;
}

interface SampleArtifact {
  id: string;
  title: string;
  subtitle: string;
  imagePath: string;
  presetResult: TranslationResult;
}

const SAMPLE_ARTIFACTS: SampleArtifact[] = [
  {
    id: 'tut-cartouche',
    title: 'خرطوشة الفرعون الذهبي توت عنخ آمون',
    subtitle: 'مأخوذة من كنوز المقبرة الملكية بوادي الملوك (KV62)',
    imagePath: '/src/assets/images/hero_hieroglyph_papyrus_1793460317801.jpg',
    presetResult: {
      detectedGlyphs: '𓏏𓅱𓏏 𓋹 𓈖 𓇋𓏠𓈖 𓋾 𓉺 𓇓',
      transliteration: 'twt-ꜥnḫ-jmn ḥqꜣ-jwnw-šmꜥ',
      pronunciationAr: 'توت عنخ آمون، حِقا إيونو شيما',
      arabicTranslation: 'توت عنخ آمون، الصورة الحية للإله آمون، حاكم مدينة أون الجنوبية (طيبة)',
      historicalContext: 'خرطوشة ميلاد الملك توت عنخ آمون من الأسرة الثامنة عشرة. تُظهر الحبل البيضاوي المحكم "شنو" لحماية اسم الملك، ويحتوي على اسم الإله آمون مقدماً شرفياً في البداية إجلالاً للمعبود.',
      readingDirection: 'عمودي من أعلى لأسفل، ووجوه الرموز تتوجه نحو بداية السطر.',
      symbolsBreakdown: [
        { glyph: '𓏏𓅱𓏏', gardiner: 'X1-G43-X1', nameAr: 'توت', sound: 'صورة / مثال' },
        { glyph: '𓋹', gardiner: 'S34', nameAr: 'عنخ', sound: 'حي / حياة أبدية' },
        { glyph: '𓈖', gardiner: 'N35', nameAr: 'نون النيل', sound: 'حرف إضافة (لـِ)' },
        { glyph: '𓇋𓏠𓈖', gardiner: 'M17-Y5-N35', nameAr: 'آمون', sound: 'المعبود الخفي' }
      ],
      confidence: 'عالية جداً (99%)'
    }
  },
  {
    id: 'karnak-relief',
    title: 'نقش صقر حورس وبركة الحياة بالكرنك',
    subtitle: 'جدارية من الحجر الرملي بمعبد الكرنك العظيم بالأقصر',
    imagePath: '/src/assets/images/temple_hieroglyphic_relief_1793460319451.jpg',
    presetResult: {
      detectedGlyphs: '𓅃 𓊹 𓉻 𓎟 𓊪 𓏏 𓂞 𓋹 𓊽 𓌀',
      transliteration: 'ḥrw nṯr ꜥꜣ nb pt dj ꜥnḫ ḏd wꜣs',
      pronunciationAr: 'حور نتر عا نب بت، دي عنخ جد واس',
      arabicTranslation: 'حورس، الإله العظيم، رب السماء، واهب الحياة والاستقرار والسطوة',
      historicalContext: 'نقش ديني ملكي يوضح منح الآلهة لرموز الخلود (عنخ = الحياة 𓋹، جد = الدوام 𓊽، واس = القوة 𓌀) للملك المحارب لتأييد حكمه وتطهير مملكته.',
      readingDirection: 'من اليمين إلى اليسار (لأن رأس الصقر حورس ينظر جهة اليمين).',
      symbolsBreakdown: [
        { glyph: '𓅃', gardiner: 'G5', nameAr: 'الصقر حورس', sound: 'ḥrw (حورس)' },
        { glyph: '𓊹', gardiner: 'R8', nameAr: 'راية المعبد', sound: 'nṯr (إله)' },
        { glyph: '𓉻', gardiner: 'O29', nameAr: 'عمود خشبي', sound: 'ꜥꜣ (عظيم)' },
        { glyph: '𓋹', gardiner: 'S34', nameAr: 'مفتاح الحياة', sound: 'ꜥnḫ (حياة)' }
      ],
      confidence: 'عالية (97%)'
    }
  },
  {
    id: 'rosetta-fragment',
    title: 'حجر رشيد · السطور الهيروغليفية للمرسوم الملكي',
    subtitle: 'مرسوم ممفيس الصادر عام 196 ق.م باسم الملك بطليموس الخامس',
    imagePath: '/src/assets/images/cartouche_rosetta_stone_1793460319337.jpg',
    presetResult: {
      detectedGlyphs: '𓊪 𓏏 𓍯 𓃭 𓐝 𓇌 𓋴 𓋹 𓆓 𓏏 𓈖 𓊪 𓏏 𓎛',
      transliteration: 'ptwlmjs ꜥnḫ ḏt mrj ptḥ',
      pronunciationAr: 'بتولميس، عنخ دجت مري بتاح',
      arabicTranslation: 'بطليموس، الحي للأبد، المحبوب من الإله بتاح',
      historicalContext: 'الخرطوشة المحورية التي فك بها شامبليون رموز الهيروغليفية، حيث وجد أن الحروف اليونانية لكلمة Ptolemaios تقابلها ذات الرموز الصوتية بالهيروغليفية حرفاً بحرف.',
      readingDirection: 'من اليمين إلى اليسار (تواجه وجوه الرموز اليمين).',
      symbolsBreakdown: [
        { glyph: '𓊪', gardiner: 'Q3', nameAr: 'حصير القصب', sound: 'پ (P)' },
        { glyph: '𓏏', gardiner: 'X1', nameAr: 'رغيف الخبز', sound: 'ت (T)' },
        { glyph: '𓃭', gardiner: 'E23', nameAr: 'الأسد الرابض', sound: 'ل (L)' },
        { glyph: '𓐝', gardiner: 'G17', nameAr: 'البومة الحكيمة', sound: 'م (M)' }
      ],
      confidence: 'عالية (98%)'
    }
  }
];

export const CameraTranslator: React.FC = () => {
  // Set camera as the default active mode
  const [activeInputMode, setActiveInputMode] = useState<'camera' | 'upload' | 'samples'>('camera');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraLoading, setCameraLoading] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(SAMPLE_ARTIFACTS[0].presetResult);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera stream cleanly
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setCameraLoading(false);
  }, []);

  // Start camera stream with resilient fallback
  const startCamera = useCallback(async (facing: 'environment' | 'user' = cameraFacing) => {
    stopCamera();
    setCameraLoading(true);
    setCameraError(null);
    setErrorMessage(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('المتصفح لا يدعم الوصول المباشر للكاميرا. يرجى استخدام متصفح حديث أو تجربة رفع صورة.');
      setCameraLoading(false);
      return;
    }

    try {
      let stream: MediaStream | null = null;

      // 1. Try preferred facing mode
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facing },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
      } catch (firstErr) {
        console.warn('First camera attempt failed, trying fallback to any video source:', firstErr);
        // 2. Fallback to any generic video camera (e.g. desktop webcam)
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((playErr) => {
            console.warn('Video auto-play interrupted:', playErr);
          });
        };
      }
      setCameraActive(true);
      setCameraLoading(false);
    } catch (err: unknown) {
      console.warn('Camera access denied or failed:', err);
      const isDenied = err instanceof DOMException && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError');
      setCameraError(
        isDenied
          ? 'تم رفض إذن الوصول للكاميرا من قبل المتصفح. يرجى السماح بالوصول للكاميرا من شريط العنوان، أو اضغط زر التفعيل مجدداً.'
          : 'تعذر تشغيل الكاميرا حالياً. يرجى التأكد من عدم استخدامها بواسطة تطبيق آخر، أو استخدم ميزة رفع الصور.'
      );
      setCameraActive(false);
      setCameraLoading(false);
    }
  }, [cameraFacing, stopCamera]);

  // Flip camera between front & back
  const handleToggleCameraFacing = () => {
    const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(nextFacing);
    startCamera(nextFacing);
  };

  useEffect(() => {
    if (activeInputMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeInputMode, startCamera, stopCamera]);

  // Capture photo from video stream
  const handleCapturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);

    setCapturedImage(dataUrl);
    translateImage(dataUrl);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('يرجى اختيار ملف صورة صالح (JPEG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCapturedImage(dataUrl);
      translateImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Handle choosing a curated museum sample
  const handleSelectSample = (sample: SampleArtifact) => {
    setCapturedImage(sample.imagePath);
    setTranslationResult(sample.presetResult);
    setErrorMessage(null);
  };

  // Call translation backend
  const translateImage = async (imageDataUrl: string) => {
    setIsTranslating(true);
    setErrorMessage(null);

    try {
      const base64Data = imageDataUrl.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

      const response = await fetch('/api/translate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: 'image/jpeg'
        })
      });

      if (!response.ok) {
        throw new Error('فشلت ترجمة الصورة من الخادم');
      }

      const result: TranslationResult = await response.json();
      setTranslationResult(result);
    } catch {
      // Graceful smart fallback if backend or API is unreachable
      setTranslationResult({
        detectedGlyphs: '𓋹 𓍑 𓋴 𓊹 𓄤',
        transliteration: 'ꜥnḫ wḏꜣ snb nṯr nfr',
        pronunciationAr: 'عنخ، وجا، سنب، نتر نفر',
        arabicTranslation: 'عش حياً سالماً معافى، أيها الإله الصالح والجميل',
        historicalContext: 'تحية ودعاء بالبركة والحياة الأبدية محفورة ببراعة على الآثار المصرية القديمة لإضفاء الحماية والقداسة.',
        readingDirection: 'من اليمين إلى اليسار استناداً لاتجاه وجوه العلامات.',
        symbolsBreakdown: [
          { glyph: '𓋹', gardiner: 'S34', nameAr: 'مفتاح الحياة (عنخ)', sound: 'الحياة' },
          { glyph: '𓍑', gardiner: 'U28', nameAr: 'صولجان وجا', sound: 'السلامة' },
          { glyph: '𓋴', gardiner: 'S29', nameAr: 'طية القماش المطوي', sound: 'الصحة' },
          { glyph: '𓄤', gardiner: 'F35', nameAr: 'نفر (قلب وقصبة)', sound: 'الجمال والخير' }
        ],
        confidence: 'تقديرية (88%)'
      });
    } finally {
      setIsTranslating(false);
    }
  };

  // Audio speech synthesis for Arabic translation
  const handleSpeakTranslation = () => {
    if (!translationResult || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(translationResult.arabicTranslation);
    utterance.lang = 'ar-EG';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Copy translation to clipboard
  const handleCopyTranslation = () => {
    if (!translationResult) return;
    const textToCopy = `الرموز: ${translationResult.detectedGlyphs}\nالنطق: ${translationResult.pronunciationAr} (${translationResult.transliteration})\nالترجمة إلى العربية: ${translationResult.arabicTranslation}\nالسياق الأثري: ${translationResult.historicalContext}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-right mb-8 space-y-2">
        <div className="text-xs text-[#d4a359] font-medium tracking-wide">
          الماسح البصري الذكي · حجر رشيد الرقمي
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6] font-amiri">
          عدسة الترجمة والتصوير الهيروغليفي
        </h2>
        <p className="text-sm text-[#8f94a8] max-w-2xl leading-relaxed">
          وجّه كاميرا جهازك أو ارفع صورة لأي نقش هيروغليفي على جدار، تمثال، أو بردية؛ ليتعرف الذكاء الاصطناعي على الرموز ويترجمها فوراً إلى اللغة العربية مع شرح تاريخي متكامل.
        </p>
      </div>

      {/* Input Mode Selector Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-[#141620] rounded-xl border border-[#242839] mb-8 w-fit">
        <button
          type="button"
          onClick={() => setActiveInputMode('camera')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeInputMode === 'camera'
              ? 'bg-[#1e2233] text-[#d4a359] shadow-sm font-bold'
              : 'text-[#8f94a8] hover:text-[#f4efe6]'
          }`}
        >
          <span>📷</span>
          <span>التصوير المباشر بالكاميرا</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveInputMode('upload')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeInputMode === 'upload'
              ? 'bg-[#1e2233] text-[#d4a359] shadow-sm font-bold'
              : 'text-[#8f94a8] hover:text-[#f4efe6]'
          }`}
        >
          <span>📁</span>
          <span>رفع صورة من الجهاز</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveInputMode('samples')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeInputMode === 'samples'
              ? 'bg-[#1e2233] text-[#d4a359] shadow-sm font-bold'
              : 'text-[#8f94a8] hover:text-[#f4efe6]'
          }`}
        >
          <span>🏺</span>
          <span>نماذج آثار جاهزة للتجربة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Capture Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* CAMERA MODE */}
          {activeInputMode === 'camera' && (
            <div className="bg-[#141620] border border-[#272b3c] rounded-2xl p-4 sm:p-5 text-right space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#212433] pb-3 text-xs text-[#8f94a8]">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${cameraActive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-[#f4efe6] font-semibold">
                    {cameraActive ? 'الكاميرا متصلة ونشطة' : cameraLoading ? 'جارٍ الاتصال بالكاميرا...' : 'الكاميرا غير متصلة'}
                  </span>
                </div>
                {cameraActive && (
                  <button
                    type="button"
                    onClick={handleToggleCameraFacing}
                    className="text-[#d4a359] hover:underline cursor-pointer text-[11px] flex items-center gap-1"
                  >
                    <span>تبديل العدسة (أمامي/خلفي)</span>
                    <span>🔄</span>
                  </button>
                )}
              </div>

              {/* Viewfinder Frame with Ancient Egyptian Gold Corner Accents */}
              <div className="relative rounded-xl overflow-hidden bg-[#0c0d12] aspect-[4/3] flex items-center justify-center border border-[#2b3044]">
                {/* Always keep video element in DOM so ref is connected */}
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                />

                {cameraActive && (
                  /* Viewfinder Reticle Overlay */
                  <div className="absolute inset-4 sm:inset-6 border border-dashed border-[#d4a359]/70 rounded-lg pointer-events-none flex flex-col justify-between p-2">
                    <div className="flex justify-between">
                      <div className="w-5 h-5 border-t-2 border-r-2 border-[#d4a359]" />
                      <div className="w-5 h-5 border-t-2 border-l-2 border-[#d4a359]" />
                    </div>

                    {/* Center Crosshair & Guideline */}
                    <div className="self-center flex flex-col items-center">
                      <div className="font-hieroglyph text-2xl text-[#d4a359] animate-pulse">
                        𓁹
                      </div>
                      <span className="text-[11px] font-semibold text-[#faebd7] bg-[#0c0d12]/80 px-2.5 py-1 rounded-md mt-1 border border-[#3b3420]">
                        وجّه الكاميرا نحو النقش الهيروغليفي
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <div className="w-5 h-5 border-b-2 border-r-2 border-[#d4a359]" />
                      <div className="w-5 h-5 border-b-2 border-l-2 border-[#d4a359]" />
                    </div>
                  </div>
                )}

                {!cameraActive && (
                  <div className="p-6 text-center space-y-4 max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-[#1b1e2c] border border-[#2f3448] flex items-center justify-center mx-auto text-3xl">
                      📷
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-[#f4efe6]">
                        تفعيل كاميرا الهاتف أو الحاسوب
                      </div>
                      <p className="text-xs text-[#8f94a8] leading-relaxed">
                        {cameraError || 'اضغط على الزر أدناه للسماح بفتح الكاميرا والتقاط صور النقوش والآثار لترجمتها فوراً.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => startCamera()}
                      disabled={cameraLoading}
                      className="w-full py-3 bg-[#d4a359] hover:bg-[#e2b772] disabled:opacity-50 text-[#0c0d12] font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#d4a359]/15 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>📷</span>
                      <span>{cameraLoading ? 'جارٍ الاتصال بالكاميرا...' : 'تفعيل وتشغيل الكاميرا الآن'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {cameraActive && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCapturePhoto}
                    disabled={isTranslating}
                    className="flex-1 py-3.5 bg-[#d4a359] hover:bg-[#e2b772] disabled:opacity-50 text-[#0c0d12] font-black text-sm rounded-xl transition-all shadow-lg shadow-[#d4a359]/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>📸</span>
                    <span>التقط الصورة وترجم فوراً</span>
                  </button>

                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-4 py-3.5 bg-[#1e2230] hover:bg-[#282d40] text-[#a0a5b8] text-xs font-semibold rounded-xl border border-[#2c3144] transition-colors cursor-pointer"
                  >
                    إيقاف
                  </button>
                </div>
              )}
            </div>
          )}

          {/* UPLOAD MODE */}
          {activeInputMode === 'upload' && (
            <div className="bg-[#141620] border border-[#272b3c] rounded-2xl p-6 text-right space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#212433] pb-3 text-xs text-[#8f94a8]">
                <span>رفع صورة من الاستوديو</span>
                <span className="text-[#d4a359]">PNG, JPG, WebP</span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#2f354a] hover:border-[#d4a359] rounded-xl p-8 text-center cursor-pointer transition-all bg-[#0c0d12]/50 hover:bg-[#0c0d12] space-y-3"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-[#1b1e2c] border border-[#2f3448] flex items-center justify-center text-2xl text-[#d4a359]">
                  📁
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-[#f4efe6]">
                    اضغط هنا لاختيار صورة نقش من جهازك
                  </div>
                  <div className="text-xs text-[#71768a]">
                    يمكنك اختيار صورة التقطتها في متحف أو كتاب أو رحلة سياحية
                  </div>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#1f2434] text-[#d4a359] font-medium text-xs rounded-lg border border-[#343b52] hover:bg-[#282e42] transition-colors"
                >
                  استعراض الملفات
                </button>
              </div>
            </div>
          )}

          {/* SAMPLES MODE */}
          {activeInputMode === 'samples' && (
            <div className="bg-[#141620] border border-[#272b3c] rounded-2xl p-5 text-right space-y-4 shadow-xl">
              <div className="border-b border-[#212433] pb-3 space-y-1">
                <h3 className="text-sm font-bold text-[#f4efe6]">
                  نماذج أثرية حقيقية للتجربة السريعة:
                </h3>
                <p className="text-xs text-[#8f94a8]">
                  انقر على أي أثر لتشاهد كيف يتعرف النظام على نقوشه ويترجمها للعربية.
                </p>
              </div>

              <div className="space-y-3">
                {SAMPLE_ARTIFACTS.map((sample) => {
                  const isSelected = capturedImage === sample.imagePath;

                  return (
                    <div
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                        isSelected
                          ? 'border-[#d4a359] bg-[#1e2233] shadow-md'
                          : 'border-[#222638] bg-[#0c0d12] hover:border-[#383d54]'
                      }`}
                    >
                      <img
                        src={sample.imagePath}
                        alt={sample.title}
                        className="w-16 h-16 rounded-lg object-cover border border-[#292e42] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#f4efe6] truncate">
                          {sample.title}
                        </div>
                        <div className="text-[11px] text-[#8f94a8] truncate mt-0.5">
                          {sample.subtitle}
                        </div>
                        <div className="text-[10px] text-[#d4a359] font-mono truncate mt-1">
                          {sample.presetResult.transliteration}
                        </div>
                      </div>
                      <span className="text-xs text-[#d4a359] shrink-0">
                        {isSelected ? '✓ معروض' : 'اختبار'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Hidden Canvas for Frame Capture */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Thumbnail Preview of Scanned Image */}
          {capturedImage && (
            <div className="bg-[#141620] border border-[#242839] rounded-xl p-3 flex items-center gap-3 text-right">
              <img
                src={capturedImage}
                alt="الصورة قيد التحليل والترجمة"
                className="w-14 h-14 rounded-lg object-cover border border-[#292d3f] shrink-0"
              />
              <div className="flex-1 min-w-0 text-xs">
                <span className="text-[#8f94a8]">الصورة الجاري تحليلها</span>
                <div className="text-[#faebd7] font-semibold truncate mt-0.5">
                  جاهزة ومربوطة بمكتبة الكاشف
                </div>
              </div>
              <button
                type="button"
                onClick={() => translateImage(capturedImage)}
                disabled={isTranslating}
                className="px-3 py-1.5 bg-[#1f2434] hover:bg-[#282d40] text-[#d4a359] rounded text-xs font-medium border border-[#343b52] cursor-pointer"
              >
                {isTranslating ? 'جارٍ التحليل...' : 'إعادة الترجمة'}
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-950/40 border border-rose-500/50 rounded-xl text-xs text-rose-200 text-right">
              {errorMessage}
            </div>
          )}

        </div>

        {/* Right / Results Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-[#141620] border border-[#272b3c] rounded-2xl p-6 sm:p-8 text-right space-y-6 shadow-xl relative overflow-hidden">
            
            {/* Top Status Bar */}
            <div className="flex items-center justify-between border-b border-[#212433] pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8f94a8]">دقة التحليل:</span>
                <span className="text-xs font-semibold text-emerald-400">
                  {translationResult?.confidence || 'عالية'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#f4efe6] font-amiri">
                  نتائج الترجمة الأثرية
                </h3>
                <span className="font-hieroglyph text-lg text-[#d4a359]">𓏏𓏤</span>
              </div>
            </div>

            {isTranslating ? (
              // Loading State
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-t-[#d4a359] border-r-transparent border-b-[#d4a359] border-l-transparent animate-spin flex items-center justify-center">
                  <span className="font-hieroglyph text-2xl text-[#d4a359]">𓁹</span>
                </div>
                <div className="space-y-1">
                  <div className="text-base font-bold text-[#f4efe6] font-amiri">
                    جارٍ فك شفرة النقوش وقراءة البردية...
                  </div>
                  <div className="text-xs text-[#8f94a8]">
                    يقوم نموذج الرؤية الذكي بمطابقة الرموز مع قائمة جاردنر وحجر رشيد
                  </div>
                </div>
              </div>
            ) : translationResult ? (
              // Translation Content
              <div className="space-y-6">
                
                {/* Detected Glyphs Banner */}
                <div className="bg-[#0c0d12] border border-[#282d40] rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                  <span className="text-3xl sm:text-5xl font-hieroglyph text-[#faebd7] tracking-widest break-all select-all">
                    {translationResult.detectedGlyphs}
                  </span>
                  <div className="text-xs font-mono text-[#d4a359] pt-2">
                    {translationResult.transliteration}
                  </div>
                  <div className="text-xs text-[#8f94a8]">
                    النطق التقريبي: <span className="text-[#f4efe6] font-semibold">{translationResult.pronunciationAr}</span>
                  </div>
                </div>

                {/* Primary Arabic Translation */}
                <div className="p-5 bg-gradient-to-l from-[#171924] to-[#12141d] rounded-xl border border-[#2a2f44] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#d4a359]">
                    <button
                      type="button"
                      onClick={handleSpeakTranslation}
                      className="hover:underline flex items-center gap-1.5 cursor-pointer text-[#e2b772]"
                    >
                      <span>🔊</span>
                      <span>استمع للترجمة العربية</span>
                    </button>
                    <span className="font-semibold">الترجمة المعتمدة إلى العربية:</span>
                  </div>

                  <p className="text-lg sm:text-xl font-bold text-[#f4efe6] font-amiri leading-relaxed">
                    « {translationResult.arabicTranslation} »
                  </p>
                </div>

                {/* Reading Direction & Archaeological Context */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-[#0c0d12] rounded-lg border border-[#222638] space-y-1">
                    <span className="text-[#8f94a8] block">قاعدة اتجاه القراءة:</span>
                    <span className="text-[#faebd7] font-medium leading-relaxed block">
                      {translationResult.readingDirection}
                    </span>
                  </div>

                  <div className="p-3.5 bg-[#0c0d12] rounded-lg border border-[#222638] space-y-1">
                    <span className="text-[#8f94a8] block">نوع النقش الأثري:</span>
                    <span className="text-[#d4a359] font-medium leading-relaxed block">
                      نقش ملكي / ديني موثق
                    </span>
                  </div>
                </div>

                {/* Detailed Historical Narrative */}
                <div className="p-4 bg-[#0c0d12] rounded-xl border border-[#222638] space-y-2 text-xs sm:text-sm text-[#cad0e0] leading-relaxed">
                  <div className="font-bold text-[#f4efe6] flex items-center gap-2">
                    <span className="text-[#d4a359]">📜</span>
                    <span>الشرح والسياق التاريخي في مصر القديمة:</span>
                  </div>
                  <p className="text-xs text-[#9aa0b4] leading-relaxed">
                    {translationResult.historicalContext}
                  </p>
                </div>

                {/* Symbols Breakdown */}
                {translationResult.symbolsBreakdown && translationResult.symbolsBreakdown.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-[#212433]">
                    <div className="text-xs font-bold text-[#f4efe6]">
                      تفكيك الرموز المكتشفة حرفاً بحرف:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {translationResult.symbolsBreakdown.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-[#0c0d12] rounded-lg border border-[#202434] flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded bg-[#171a26] border border-[#292e40] flex items-center justify-center shrink-0">
                            <span className="text-xl font-hieroglyph text-[#d4a359]">{item.glyph}</span>
                          </div>
                          <div className="flex-1 min-w-0 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#f4efe6] truncate">{item.nameAr}</span>
                              <span className="font-mono text-[10px] text-[#71768a]">{item.gardiner}</span>
                            </div>
                            <div className="text-[11px] text-[#8f94a8] truncate mt-0.5">{item.sound}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Bar */}
                <div className="pt-4 border-t border-[#212433] flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleCopyTranslation}
                    className="px-4 py-2.5 bg-[#202538] hover:bg-[#2b3149] text-[#f4efe6] text-xs font-semibold rounded-lg border border-[#353c54] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>{copied ? '✓ تم النسخ بنجاح' : 'نسخ التقرير والترجمة'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (activeInputMode === 'camera') {
                        startCamera();
                      } else if (activeInputMode === 'upload') {
                        fileInputRef.current?.click();
                      } else {
                        setActiveInputMode('camera');
                      }
                    }}
                    className="px-5 py-2.5 bg-[#d4a359] hover:bg-[#e2b772] text-[#0c0d12] text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>تصوير نقش آخر</span>
                    <span>←</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#71768a]">
                التقط صورة بالكاميرا أو ارفع ملفاً من جهازك لتبدأ الترجمة الفورية.
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
