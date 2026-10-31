export interface HieroglyphLetter {
  id: string;
  glyph: string;
  gardiner: string;
  nameAr: string;
  nameEn: string;
  soundAr: string;
  soundEn: string;
  transliteration: string;
  objectDescriptionAr: string;
  objectDescriptionEn: string;
  mnemonicAr: string;
  category: 'uniliteral';
  audioPronunciation: string;
}

export interface SacredSymbol {
  id: string;
  glyph: string;
  gardiner: string;
  nameAr: string;
  nameEn: string;
  meaningAr: string;
  transliteration: string;
  category: 'sacred' | 'biliteral' | 'triliteral';
  funFactAr: string;
}

export interface EgyptianNumber {
  value: number;
  glyph: string;
  gardiner: string;
  nameAr: string;
  representationAr: string;
}

export interface RoyalCartouche {
  id: string;
  pharaohNameAr: string;
  pharaohNameEn: string;
  glyphs: string;
  transliteration: string;
  meaningAr: string;
  dynastyAr: string;
  imageHint?: string;
  breakdown: Array<{ glyph: string; sound: string; meaning: string }>;
}

export interface Lesson {
  id: number;
  titleAr: string;
  subtitleAr: string;
  duration: string;
  level: string;
  conceptSummary: string;
  contentSections: Array<{
    heading: string;
    body: string;
    highlightGlyphs?: Array<{ glyph: string; label: string }>;
  }>;
  interactiveChallenge: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 24 Uniliteral Egyptian Signs (الأبجدية الهيروغليفية الأحادية الصوتية)
export const UNILITERAL_ALPHABET: HieroglyphLetter[] = [
  {
    id: 'aleph',
    glyph: '𓄿',
    gardiner: 'G1',
    nameAr: 'أليف / عقاب مصري',
    nameEn: 'Egyptian Vulture',
    soundAr: 'أ (الألف الممدودة)',
    soundEn: '3 (glottal stop / aa)',
    transliteration: 'ꜣ',
    objectDescriptionAr: 'طائر العقاب المصري الجارح وهو واقف باعتدال',
    objectDescriptionEn: 'Egyptian vulture standing',
    mnemonicAr: 'تذكر طائر العقاب الذي يبدأ صوته بنقاء أفق السماء كالهمزة أو الألف.',
    category: 'uniliteral',
    audioPronunciation: 'آه / Aa'
  },
  {
    id: 'reed',
    glyph: '𓇋',
    gardiner: 'M17',
    nameAr: 'عشبة القصب المورقة',
    nameEn: 'Flowering Reed',
    soundAr: 'ي / إي (الياء المكسورة أو الهمزة الخفيفة)',
    soundEn: 'i / y',
    transliteration: 'j',
    objectDescriptionAr: 'ساق نبات القصب النيلي مع زهرته في الأعلى',
    objectDescriptionEn: 'Single flowering reed',
    mnemonicAr: 'القصبة النحيلة تشبه حرف الألف أو الياء الرأسية النضرة.',
    category: 'uniliteral',
    audioPronunciation: 'إي / ee'
  },
  {
    id: 'double-reed',
    glyph: '𓇌',
    gardiner: 'M17A',
    nameAr: 'قَصَبتان مورقتان',
    nameEn: 'Two Flowering Reeds',
    soundAr: 'ي (ياء ممدودة صافية)',
    soundEn: 'y / ii',
    transliteration: 'y',
    objectDescriptionAr: 'قصبتا قصب بجوار بعضهما للدلالة على الياء الصريحة',
    objectDescriptionEn: 'Two flowering reeds',
    mnemonicAr: 'قصبة وقصبة تساوي ياء مدّ قوية مثل "علي" أو "سمير".',
    category: 'uniliteral',
    audioPronunciation: 'يا / Yaa'
  },
  {
    id: 'ayin',
    glyph: '𓂝',
    gardiner: 'D36',
    nameAr: 'الذراع والساعد',
    nameEn: 'Forearm',
    soundAr: 'ع (صوت العين العميقة)',
    soundEn: 'ꜥ (pharyngeal Ayin)',
    transliteration: 'ꜥ',
    objectDescriptionAr: 'ساعد بشري ممدود وباطن الكف للأعلى',
    objectDescriptionEn: 'Forearm with palm upward',
    mnemonicAr: 'الساعد الممدود من عضلات الجسم يمثل حرف العين.',
    category: 'uniliteral',
    audioPronunciation: 'عَ / Ayin'
  },
  {
    id: 'quail',
    glyph: '𓅱',
    gardiner: 'G43',
    nameAr: 'فرخ السمان',
    nameEn: 'Quail Chick',
    soundAr: 'و (الواو المضمومة أو صوت W/U)',
    soundEn: 'w / oo',
    transliteration: 'w',
    objectDescriptionAr: 'فرخ طائر السمان الصغير الممتلئ',
    objectDescriptionEn: 'Quail chick',
    mnemonicAr: 'فرخ السمان الصغير يصدر صوتاً يشبه "ووو" كالواو.',
    category: 'uniliteral',
    audioPronunciation: 'وو / Woo'
  },
  {
    id: 'foot',
    glyph: '𓃀',
    gardiner: 'D58',
    nameAr: 'الساق والقدم',
    nameEn: 'Foot and Leg',
    soundAr: 'ب (الباء الصريحة)',
    soundEn: 'b',
    transliteration: 'b',
    objectDescriptionAr: 'قدم وساق بشرية حتى الركبة',
    objectDescriptionEn: 'Leg and foot',
    mnemonicAr: 'الساق التي تخطو بها تمثل حرف الباء (باء - بالقدم).',
    category: 'uniliteral',
    audioPronunciation: 'بَ / Ba'
  },
  {
    id: 'mat',
    glyph: '𓊪',
    gardiner: 'Q3',
    nameAr: 'حصير القصب ومقعد',
    nameEn: 'Reed Mat or Stool',
    soundAr: 'پ / ب مخففة (صوت P)',
    soundEn: 'p',
    transliteration: 'p',
    objectDescriptionAr: 'حصير مجدول من ألياف البردي يُتخذ كمقعد مستطيل',
    objectDescriptionEn: 'Stool of reed matting',
    mnemonicAr: 'الحصير مستطيل القاعدة يمثل صوت الـ P/پ في الأسماء.',
    category: 'uniliteral',
    audioPronunciation: 'پـَ / Pa'
  },
  {
    id: 'viper',
    glyph: '𓆑',
    gardiner: 'I9',
    nameAr: 'الحية ذات القرنين',
    nameEn: 'Horned Viper',
    soundAr: 'ف (الفاء الصريحة)',
    soundEn: 'f',
    transliteration: 'f',
    objectDescriptionAr: 'أفعى صحراوية صغيرة بقرنين فوق رأسها',
    objectDescriptionEn: 'Horned viper',
    mnemonicAr: 'فحيح الأفعى يشبه صوت الفاء تماماً (ففففف).',
    category: 'uniliteral',
    audioPronunciation: 'فَ / Fa'
  },
  {
    id: 'owl',
    glyph: '𓅓',
    gardiner: 'G17',
    nameAr: 'البومة الحكيمة',
    nameEn: 'Owl',
    soundAr: 'م (الميم الصريحة)',
    soundEn: 'm',
    transliteration: 'm',
    objectDescriptionAr: 'بومة ناظرة للأمام بعينيها الواسعتين وجسمها جانبي',
    objectDescriptionEn: 'Owl facing forward',
    mnemonicAr: 'البومة من أشهر الرموز في مصر القديمة وصوتها هو الميم الصافية.',
    category: 'uniliteral',
    audioPronunciation: 'مَ / Ma'
  },
  {
    id: 'water',
    glyph: '𓈖',
    gardiner: 'N35',
    nameAr: 'تموجات مياه النيل',
    nameEn: 'Water Ripple',
    soundAr: 'ن (النون الصريحة)',
    soundEn: 'n',
    transliteration: 'n',
    objectDescriptionAr: 'سطح الماء المتموج في نهر النيل الخالد',
    objectDescriptionEn: 'Ripple of water',
    mnemonicAr: 'موج النيل الخالد يبدأ بحرف النون (نهر، نيل).',
    category: 'uniliteral',
    audioPronunciation: 'نَ / Na'
  },
  {
    id: 'mouth',
    glyph: '𓂋',
    gardiner: 'D21',
    nameAr: 'الفم البشري',
    nameEn: 'Mouth',
    soundAr: 'ر (الراء الصريحة)',
    soundEn: 'r',
    transliteration: 'r',
    objectDescriptionAr: 'فم بشري مع شفتين متطابقتين بوضوح',
    objectDescriptionEn: 'Mouth',
    mnemonicAr: 'الفم يخرج منه الكلام والراء رنانة (رأس، رغبة).',
    category: 'uniliteral',
    audioPronunciation: 'رَ / Ra'
  },
  {
    id: 'shelter',
    glyph: '𓉔',
    gardiner: 'O4',
    nameAr: 'كوخ القصب أو المأوى',
    nameEn: 'Reed Shelter',
    soundAr: 'هـ (الهاء الخفيفة)',
    soundEn: 'h',
    transliteration: 'h',
    objectDescriptionAr: 'مخطط مسقط أفقي لكوخ أو حظيرة من القصب ذات مدخل',
    objectDescriptionEn: 'Reed shelter in fields',
    mnemonicAr: 'المأوى المفتوح يمر منه الهواء بنفحة الهاء الهادئة.',
    category: 'uniliteral',
    audioPronunciation: 'هَ / Ha'
  },
  {
    id: 'flax',
    glyph: '𓎛',
    gardiner: 'V28',
    nameAr: 'حبل الكتان المجدول',
    nameEn: 'Twisted Flax',
    soundAr: 'ح (الحاء الصريحة الحلقية)',
    soundEn: 'ḥ (pharyngeal H)',
    transliteration: 'ḥ',
    objectDescriptionAr: 'ضفيرة أو حبل مصنوع من ألياف الكتان المفتولة',
    objectDescriptionEn: 'Wick of twisted flax',
    mnemonicAr: 'الحبل المجدول بحرص يمثل حرف الحاء (حبل - حـ).',
    category: 'uniliteral',
    audioPronunciation: 'حَ / Hha'
  },
  {
    id: 'placenta',
    glyph: '𓐍',
    gardiner: 'Aa1',
    nameAr: 'قرص المشيمة أو الغربال',
    nameEn: 'Placenta or Sieve',
    soundAr: 'خ (الخاء الصريحة)',
    soundEn: 'ḫ (velar fricative Kh)',
    transliteration: 'ḫ',
    objectDescriptionAr: 'قرص دائري مخطط بخطوط متقاطعة',
    objectDescriptionEn: 'Placenta or patterned sieve',
    mnemonicAr: 'القرص الدائري المخطط يمثل صوت الخاء القوي.',
    category: 'uniliteral',
    audioPronunciation: 'خَ / Kha'
  },
  {
    id: 'belly',
    glyph: '𓄡',
    gardiner: 'F32',
    nameAr: 'بطن الحيوان وذيله',
    nameEn: 'Animal Belly and Teats',
    soundAr: 'خـ خفيفة / ش ألمانية (ẖ)',
    soundEn: 'ẖ (ich-laut)',
    transliteration: 'ẖ',
    objectDescriptionAr: 'بطن حيوان ثديي مع الحلمات والذيل المتدلي',
    objectDescriptionEn: 'Belly of mammal with tail',
    mnemonicAr: 'صوت بين الخاء والشين، يشبه نطق كلمة ich الألمانية.',
    category: 'uniliteral',
    audioPronunciation: 'خـِش / Khee'
  },
  {
    id: 'cloth',
    glyph: '𓋴',
    gardiner: 'S29',
    nameAr: 'طية القماش المطوي',
    nameEn: 'Folded Cloth',
    soundAr: 'س (السين الصريحة)',
    soundEn: 's',
    transliteration: 's',
    objectDescriptionAr: 'قطعة قماش كتاني مطوية ومعلقة بعناية',
    objectDescriptionEn: 'Folded linen cloth',
    mnemonicAr: 'النسيج المطوي الأملس يعبر عن السين السلسة والناعمة.',
    category: 'uniliteral',
    audioPronunciation: 'سَ / Sa'
  },
  {
    id: 'bolt',
    glyph: '𓊃',
    gardiner: 'O34',
    nameAr: 'مزلاج الباب الخشبي',
    nameEn: 'Door Bolt',
    soundAr: 'ز / س (صوت الزاي)',
    soundEn: 'z',
    transliteration: 'z',
    objectDescriptionAr: 'مزلاج خشبي لتأمين أبواب المنازل والمعابد',
    objectDescriptionEn: 'Door bolt',
    mnemonicAr: 'صوت مزلاج الباب عند غلقه يصدر أزيز الزاي.',
    category: 'uniliteral',
    audioPronunciation: 'زَ / Za'
  },
  {
    id: 'pool',
    glyph: '𓈙',
    gardiner: 'N37',
    nameAr: 'بركة الماء المستطيلة',
    nameEn: 'Water Pool',
    soundAr: 'ش (الشين الصريحة)',
    soundEn: 'š (sh)',
    transliteration: 'š',
    objectDescriptionAr: 'حوض أو بركة ماء مستطيلة هندسية في الحدائق',
    objectDescriptionEn: 'Garden water basin',
    mnemonicAr: 'الشمس تنعكس على شاطئ البركة، فيخرج صوت الشين.',
    category: 'uniliteral',
    audioPronunciation: 'شَ / Sha'
  },
  {
    id: 'hill',
    glyph: '𓈎',
    gardiner: 'N29',
    nameAr: 'التل أو منحدر الرمل',
    nameEn: 'Hill Slope',
    soundAr: 'ق (القاف المفخمة العميقة)',
    soundEn: 'q / ḳ',
    transliteration: 'q',
    objectDescriptionAr: 'تل رملي أو جرف حجري متدرج في الصحراء',
    objectDescriptionEn: 'Slope of hill',
    mnemonicAr: 'قمة التل الشاهقة تبدأ بصوت القاف المفخم الرنان.',
    category: 'uniliteral',
    audioPronunciation: 'قَ / Qa'
  },
  {
    id: 'basket',
    glyph: '𓎡',
    gardiner: 'V31',
    nameAr: 'السلة ذات المقبض',
    nameEn: 'Basket with Handle',
    soundAr: 'ك (الكاف الصريحة)',
    soundEn: 'k',
    transliteration: 'k',
    objectDescriptionAr: 'سلة قصبية دائرية بمقبض جانبي لحمل البذور',
    objectDescriptionEn: 'Basket with handle',
    mnemonicAr: 'السلة بشكلها المقوس تشبه مقبض الكوب (كاف - سلة).',
    category: 'uniliteral',
    audioPronunciation: 'كَ / Ka'
  },
  {
    id: 'jar-stand',
    glyph: '𓎼',
    gardiner: 'W11',
    nameAr: 'قاعدة الإناء الحجرية',
    nameEn: 'Jar Stand',
    soundAr: 'جـ (الجيم القاهرية الصامتة / G)',
    soundEn: 'g (hard g as in go)',
    transliteration: 'g',
    objectDescriptionAr: 'قاعدة حجرية مستديرة لتثبيت أواني المياه الفخارية',
    objectDescriptionEn: 'Ring stand for jars',
    mnemonicAr: 'القاعدة تسند الإناء بقوة كصوت الجيم الصريحة الصلبة.',
    category: 'uniliteral',
    audioPronunciation: 'گـَ / Ga'
  },
  {
    id: 'loaf',
    glyph: '𓏏',
    gardiner: 'X1',
    nameAr: 'رغيف الخبز المقبب',
    nameEn: 'Bread Loaf',
    soundAr: 'ت (التاء وتُستعمل أيضاً للتأنيث)',
    soundEn: 't',
    transliteration: 't',
    objectDescriptionAr: 'رغيف خبز نصف دائري، وهو علامة التأنيث الدائمة',
    objectDescriptionEn: 'Loaf of bread',
    mnemonicAr: 'رغيف الخبز الدائري هو تاء التأنيث في كل الكلمات المؤنثة!',
    category: 'uniliteral',
    audioPronunciation: 'تَ / Ta'
  },
  {
    id: 'hobble',
    glyph: '𓍿',
    gardiner: 'V13',
    nameAr: 'قيد الحبل للماشية',
    nameEn: 'Tethering Rope',
    soundAr: 'ث / تش (صوت T-sh أو Th)',
    soundEn: 'ṯ (tj / ch)',
    transliteration: 'ṯ',
    objectDescriptionAr: 'حبل مربوط بعقدتين لتقييد حركة الماشية في الحقل',
    objectDescriptionEn: 'Tethering rope',
    mnemonicAr: 'الحبل المشدود يمثل الثاء أو صوت "تش".',
    category: 'uniliteral',
    audioPronunciation: 'ثـَ / Tha'
  },
  {
    id: 'hand',
    glyph: '𓂧',
    gardiner: 'D46',
    nameAr: 'الكف واليد البشري',
    nameEn: 'Hand',
    soundAr: 'د (الدال الصريحة)',
    soundEn: 'd',
    transliteration: 'd',
    objectDescriptionAr: 'كف يد ممدودة بأصابع متلاصقة وإبهام منفصل',
    objectDescriptionEn: 'Hand',
    mnemonicAr: 'اليد المعطاءة تعبر عن حرف الدال الصادق (يد، دال).',
    category: 'uniliteral',
    audioPronunciation: 'دَ / Da'
  },
  {
    id: 'snake',
    glyph: '𓆓',
    gardiner: 'I10',
    nameAr: 'حية الكوبرا الملكية',
    nameEn: 'Cobra',
    soundAr: 'ج / دج (الجيم المعطشة كالإنجليزية Dj)',
    soundEn: 'ḏ (dj / j)',
    transliteration: 'ḏ',
    objectDescriptionAr: 'أفعى الكوبرا في وضع التأهب والانتصاب',
    objectDescriptionEn: 'Cobra at rest or rearing',
    mnemonicAr: 'الكوبرا الملكية ذات الهيبة تمثل الجيم المعطشة "دج".',
    category: 'uniliteral',
    audioPronunciation: 'دجـَ / Dja'
  }
];

// Sacred Symbols & Famous Ideograms (الرموز المقدسة والكلمات البارزة)
export const SACRED_SYMBOLS: SacredSymbol[] = [
  {
    id: 'ankh',
    glyph: '𓋹',
    gardiner: 'S34',
    nameAr: 'عنخ (مفتاح الحياة)',
    nameEn: 'Ankh (Key of Life)',
    meaningAr: 'الحياة والخلود واستمرار النبض في الوجود',
    transliteration: 'ꜥnḫ',
    category: 'sacred',
    funFactAr: 'يمثل عقدة رباط الصندل أو رمز تجدد الخصوبة الأبدية، ويحمله الآلهة لمنح الحياة للملوك.'
  },
  {
    id: 'wedjat',
    glyph: '𓂀',
    gardiner: 'D10',
    nameAr: 'عين حورس (الوجات)',
    nameEn: 'Eye of Horus (Wedjat)',
    meaningAr: 'الحماية والشفاء والكمال والعدالة الكونية',
    transliteration: 'wḏꜣt',
    category: 'sacred',
    funFactAr: 'أجزاء عين حورس استخدمت في مصر القديمة ككسور رياضية دقيقة في المقاييس والصيدلة!'
  },
  {
    id: 'djed',
    glyph: '𓊽',
    gardiner: 'R11',
    nameAr: 'عمود الجد',
    nameEn: 'Djed Pillar',
    meaningAr: 'الدوام، الاستقرار، الثبات وقوة الظهر',
    transliteration: 'ḏd',
    category: 'sacred',
    funFactAr: 'يرمز لعمود الإله أوزوريس الفقري، وعلامة على الصلابة التي لا تتزعزع في مواجهة العواصف.'
  },
  {
    id: 'was',
    glyph: '𓌀',
    gardiner: 'S40',
    nameAr: 'صولجان الواس',
    nameEn: 'Was Sceptre',
    meaningAr: 'السلطة، القوة والسيادة الإلهية',
    transliteration: 'wꜣs',
    category: 'sacred',
    funFactAr: 'عصا برأس حيوان الصحراء (ست أو الكلب) وشوكة في الأسفل لطرد قوى الفوضى.'
  },
  {
    id: 'scarab',
    glyph: '𓆣',
    gardiner: 'L1',
    nameAr: 'الجعران المقدس (خبري)',
    nameEn: 'Scarab Beetle (Khepri)',
    meaningAr: 'التجدد، البعث، التحول والشروق اليومي',
    transliteration: 'ḫpr',
    category: 'sacred',
    funFactAr: 'دحرجة الجعران لكرات الروث شبّهها المصري القديم بدحرجة إله الشمس لقرص النور عبر السماء.'
  },
  {
    id: 'shen',
    glyph: '𓍶',
    gardiner: 'V9',
    nameAr: 'حلقة الشن (الخلود)',
    nameEn: 'Shen Ring',
    meaningAr: 'الإحاطة والحماية الأبدية، وأصل شكل الخرطوشة',
    transliteration: 'šn',
    category: 'sacred',
    funFactAr: 'حبل حلقي معقود لا نهاية له، عندما يتمدد يتسع ليحمل اسم الملك ليصبح "الخرطوشة"!'
  },
  {
    id: 'hotep',
    glyph: '𓊵',
    gardiner: 'R4',
    nameAr: 'حتب',
    nameEn: 'Hotep',
    meaningAr: 'السلام، الرضا، والقرابين الطيبة',
    transliteration: 'ḥtp',
    category: 'biliteral',
    funFactAr: 'يمثل رغيف خبز مستقر على حصير قصب نقي، دليلاً على الكفاية والسكينة.'
  },
  {
    id: 'nefer',
    glyph: '𓄤',
    gardiner: 'F35',
    nameAr: 'نفر',
    nameEn: 'Nefer',
    meaningAr: 'الجمال، الكمال، والخير والصفاء',
    transliteration: 'nfr',
    category: 'triliteral',
    funFactAr: 'الرسم يمثل القصبة الهوائية والقلب، وهو جذر أسماء شهيرة مثل نفرتيتي ونفرتاري.'
  },
  {
    id: 'maat',
    glyph: '𓌳',
    gardiner: 'U1',
    nameAr: 'ريشة ماعت',
    nameEn: 'Maat Feather',
    meaningAr: 'الحق، الصدق، العدل والنظام الكوني',
    transliteration: 'mꜣꜥ',
    category: 'sacred',
    funFactAr: 'توزن ضد قلب المتوفى في محكمة الموتى، فإن تساوت مع قلبه كان من الفائزين بالأبدية.'
  }
];

// Ancient Egyptian Numerals (الأرقام في مصر القديمة)
export const EGYPTIAN_NUMERALS: EgyptianNumber[] = [
  {
    value: 1,
    glyph: '𓏤',
    gardiner: 'Z1',
    nameAr: 'واحد (وا)',
    representationAr: 'شرطة عمودية واحدة تمثل عصا خشبية بسيطة'
  },
  {
    value: 10,
    glyph: '𓎆',
    gardiner: 'V20',
    nameAr: 'عشرة (مِدج)',
    representationAr: 'قوس منسوج أو حبل مربوط على شكل حدوة مقوسة'
  },
  {
    value: 100,
    glyph: '𓍢',
    gardiner: 'V1',
    nameAr: 'مائة (شعت)',
    representationAr: 'لفة حبل لولبية أو بكرة حبل طويلة ملفوفة'
  },
  {
    value: 1000,
    glyph: '𓆼',
    gardiner: 'M12',
    nameAr: 'ألف (خا)',
    representationAr: 'زهرة اللوتس النضرة مع ساقها وجذورها'
  },
  {
    value: 10000,
    glyph: '𓂭',
    gardiner: 'D50',
    nameAr: 'عشرة آلاف (دِبا)',
    representationAr: 'إصبع بشري ممدود يشير نحو الأفق'
  },
  {
    value: 100000,
    glyph: '𓆐',
    gardiner: 'I8',
    nameAr: 'مائة ألف (حفن)',
    representationAr: 'شرغوف ضفدع صغير (أبو ذنيبة) يسبح بكثرة بعد فيضان النيل'
  },
  {
    value: 1000000,
    glyph: '𓁨',
    gardiner: 'C11',
    nameAr: 'مليون / الأبدية (حِح)',
    representationAr: 'الإله حح راكعاً ورافعاً ذراعيه نحو السماء في ذهول من المالانهاية'
  }
];

// Famous Royal Cartouches Deciphered (خراطيش الملوك)
export const FAMOUS_CARTOUCHES: RoyalCartouche[] = [
  {
    id: 'tutankhamun',
    pharaohNameAr: 'توت عنخ آمون',
    pharaohNameEn: 'Tutankhamun',
    glyphs: '𓏏𓅱𓏏𓋹𓈖𓇋𓏠𓈖',
    transliteration: 'twt-ꜥnḫ-jmn',
    meaningAr: 'الصورة الحية للإله آمون (توت = صورة، عنخ = حية، آمون = الإله الخفي)',
    dynastyAr: 'الأسرة الثامنة عشرة (الدولة الحديثة)',
    breakdown: [
      { glyph: '𓏏𓅱𓏏', sound: 'توت (twt)', meaning: 'صورة / مثال' },
      { glyph: '𓋹', sound: 'عنخ (ꜥnḫ)', meaning: 'حي / حياة' },
      { glyph: '𓈖', sound: 'إن (n)', meaning: 'حرف إضافة (لـِ)' },
      { glyph: '𓇋𓏠𓈖', sound: 'آمون (jmn)', meaning: 'الإله آمون الخفي' }
    ]
  },
  {
    id: 'cleopatra',
    pharaohNameAr: 'كليوباترا السابعة',
    pharaohNameEn: 'Cleopatra VII',
    glyphs: '𓈎𓃭𓇋𓍯𓊪𓂧𓂋𓏏',
    transliteration: 'q-l-i-w-p-d-r-t',
    meaningAr: 'مجد أبيها (باليونانية الأصلية: كليو = مجد، باترا = الأب)',
    dynastyAr: 'العصر البطلمي (المفتاح الذهبي الذي استخدمه شامبليون لفك الهيروغليفية)',
    breakdown: [
      { glyph: '𓈎', sound: 'ق / K', meaning: 'صوت القاف' },
      { glyph: '𓃭', sound: 'ل / L', meaning: 'الأسد الرابض لصوت اللام' },
      { glyph: '𓇋', sound: 'ي / I', meaning: 'القصبة المورقة' },
      { glyph: '𓍯', sound: 'و / O', meaning: 'الحبل الملفوف' },
      { glyph: '𓊪', sound: 'پ / P', meaning: 'حصير القصب' },
      { glyph: '𓂧', sound: 'د / T/D', meaning: 'الكف' },
      { glyph: '𓂋', sound: 'ر / R', meaning: 'الفم' },
      { glyph: '𓏏', sound: 'ت / A', meaning: 'رغيف الخبز' }
    ]
  },
  {
    id: 'ramesses',
    pharaohNameAr: 'رمسيس الثاني',
    pharaohNameEn: 'Ramesses II',
    glyphs: '𓂋𓂝𓄟𓋴𓋴',
    transliteration: 'rꜥ-ms-sw',
    meaningAr: 'وُلِد من الإله رع (رع = إله الشمس، مس = وُلِد، سو = هو)',
    dynastyAr: 'الأسرة التاسعة عشرة (أعظم بناة المعابد في مصر القديمة)',
    breakdown: [
      { glyph: '𓇳', sound: 'رع (rꜥ)', meaning: 'قرص الشمس' },
      { glyph: '𓄟', sound: 'مس (ms)', meaning: 'ولادة / وُلِد من' },
      { glyph: '𓋴𓋴', sound: 'سو (sw)', meaning: 'ضمير الغائب' }
    ]
  },
  {
    id: 'hatshepsut',
    pharaohNameAr: 'حتشبسوت',
    pharaohNameEn: 'Hatshepsut',
    glyphs: '𓄡𓏏𓈙𓊪𓋴𓅱𓏏',
    transliteration: 'ḥꜣt-šps.wt',
    meaningAr: 'أولى النبيلات وأشرفهن (حات = مقدمة/أول، شبسوت = النبيلات)',
    dynastyAr: 'الأسرة الثامنة عشرة (ملكة الدير البحري العظيمة)',
    breakdown: [
      { glyph: '𓄡', sound: 'حات (ḥꜣt)', meaning: 'المقدمة / الصدارة' },
      { glyph: '𓏏', sound: 'ت (t)', meaning: 'تاء التأنيث' },
      { glyph: '𓈙𓊪𓋴', sound: 'شبس (šps)', meaning: 'النبيل / الجليل' },
      { glyph: '𓅱𓏏', sound: 'ووت (wt)', meaning: 'جمع المؤنث' }
    ]
  }
];

// Everyday Egyptian Phrases (عبارات شائعة في مصر القديمة)
export const EVERYDAY_PHRASES = [
  {
    phraseAr: 'عنخ، وجا، سنب',
    transliteration: 'ꜥnḫ, wḏꜣ, snb',
    hieroglyphs: '𓋹 𓍑 𓋴',
    meaningAr: 'عش حياً، سالماً، معافى (التحية والتمني الأقدس للملوك والنبلاء)',
    contextAr: 'كانت تُكتب دائماً بعد ذكر أسماء الفراعنة كدعاء بالحفظ والصحة الدائمة.'
  },
  {
    phraseAr: 'إي إم حتب',
    transliteration: 'jy j-m ḥtp',
    hieroglyphs: '𓇍 𓅓 𓊵',
    meaningAr: 'أهلاً وسهلاً / أتيت في سلام وأمان',
    contextAr: 'التحية المصرية الكلاسيكية لاستقبال الضيوف والأصدقاء بحفاوة ومحبة.'
  },
  {
    phraseAr: 'بر عا',
    transliteration: 'pr-ꜥꜣ',
    hieroglyphs: '𓉐 𓉻',
    meaningAr: 'البيت الكبير / القصر العالي (أصل كلمة فرعون عالمياً)',
    contextAr: 'كانت تُطلق في الأصل على القصر الملكي، ثم أصبحت لقباً لساكنه الملك.'
  },
  {
    phraseAr: 'سا رع',
    transliteration: 'sꜣ-rꜥ',
    hieroglyphs: '𓅭 𓇳',
    meaningAr: 'ابن رع (ابن إله الشمس)',
    contextAr: 'أحد الألقاب الخمسة الرسمية لكل ملك فرعوني يسبق اسمه في الخرطوشة.'
  },
  {
    phraseAr: 'مري إمن',
    transliteration: 'mry-jmn',
    hieroglyphs: '𓌸 𓇋𓏠𓈖',
    meaningAr: 'محبوب الإله آمون',
    contextAr: 'لقب شرفي ديني حمله معظم ملوك الدولة الحديثة لإظهار بركتهم.'
  }
];

// Interactive Guided Lessons (الدروس التفاعلية الـ 5)
export const INTERACTIVE_LESSONS: Lesson[] = [
  {
    id: 1,
    titleAr: 'سحر الرموز: كيف نفهم الهيروغليفية؟',
    subtitleAr: 'اكتشف الفرق بين الصوت والرسم والمعنى',
    duration: '٥ دقائق',
    level: 'مبتدئ جداً',
    conceptSummary: 'الهيروغليفية ليست شفرة سرية غامضة، بل نظام لغوي متكامل يجمع بين الحروف الصوتية والرسوم الدلالية المحددة للمعنى.',
    contentSections: [
      {
        heading: 'ماذا تعني كلمة "هيروغليفي"؟',
        body: 'الكلمة من أصل يوناني تعني "النقش المقدس". أما المصريون القدماء فكانوا يطلقون عليها "مدو نتر" (Medu Netjer) أي "كلام الآلهة"، وكانوا ينظرون للكتابة كفعل مقدس يعطي الخلود لكل ما يُنقش على الحجر.'
      },
      {
        heading: 'الأنواع الثلاثة للرموز:',
        body: 'لكي تقرأ أي نص مصري قديم، عليك معرفة أن كل رمز يقع ضمن واحدة من 3 فئات رئيسية:\n١. رموز صوتية (Phonograms): تعطي صوتاً فقط مثل حروفنا الهجائية (مثل رسم البومة 𓅓 لتعطي صوت الميم).\n٢. رموز تصويرية (Ideograms): تعني الشيء المرسوم نفسه (مثل رسم الشمس 𓇳 لتعني الشمس أو النهار).\n٣. مخصصات (Determinatives): رموز تأتي في نهاية الكلمة لا تُنطق، ولكن تحدد نوع المعنى (مثل رسم رجل 𓀀 بعد كلمة رجل أو كاتب).'
      }
    ],
    interactiveChallenge: {
      question: 'إذا رأيت رمز البومة 𓅓 في كلمة، ما هو الصوت الذي تمثله؟',
      options: ['صوت النون (N)', 'صوت الميم (M)', 'صوت الراء (R)', 'صوت الشين (Sh)'],
      correctIndex: 1,
      explanation: 'أحسنت! البومة في الهيروغليفية تمثل صوت الميم (M) الصافي في الأبجدية الأحادية.'
    }
  },
  {
    id: 2,
    titleAr: 'الأبجدية الأحادية: كيف تكتب اسمك؟',
    subtitleAr: 'الـ ٢٤ صوتاً الأساسية لكتابة أي اسم بالهيروغليفية',
    duration: '٧ دقائق',
    level: 'مبتدئ',
    conceptSummary: 'المصريون القدماء اخترعوا ٢٤ صوتاً أحادياً (حرفاً بحرف) تسمح بتهجئة أي اسم أجنبي أو كلمة غير مألوفة، وهي تماماً مثل حروف الأبجدية التي نعرفها اليوم!',
    contentSections: [
      {
        heading: 'عالم الأصوات الطبيعي',
        body: 'اختار الكاتب المصري رموزه من بيئته الجميلة المحيطة به على ضفاف النيل: الطيور، الساق البشرية، الماء، وحبال الكتان. لكل كائن صوت مميز يرمز إليه.'
      },
      {
        heading: 'أمثلة شهيرة للأصوات',
        body: '• الساق 𓃀 = حرف الباء (B)\n• تموجات النيل 𓈖 = حرف النون (N)\n• الفم 𓂋 = حرف الراء (R)\n• فرخ السمان 𓅱 = حرف الواو (W/U)\n• القصبة المورقة 𓇋 = حرف الياء (I/Y)',
        highlightGlyphs: [
          { glyph: '𓃀', label: 'باء' },
          { glyph: '𓈖', label: 'نون' },
          { glyph: '𓂋', label: 'راء' },
          { glyph: '𓅱', label: 'واو' }
        ]
      }
    ],
    interactiveChallenge: {
      question: 'أي من الرموز التالية يمثل حرف "النون" ومستوحى من مياه النيل؟',
      options: ['الساق 𓃀', 'الفم 𓂋', 'تموجات الماء 𓈖', 'البومة 𓅓'],
      correctIndex: 2,
      explanation: 'ممتاز! تموجات مياه نهر النيل 𓈖 تمثل حرف النون (N) في الأبجدية الأحادية.'
    }
  },
  {
    id: 3,
    titleAr: 'سر اتجاه القراءة: من أين نبدأ؟',
    subtitleAr: 'قاعدة النظر في أعين الطيور والحيوانات',
    duration: '٤ دقائق',
    level: 'متوسط خفيف',
    conceptSummary: 'كان المصري القديم يكتب من اليمين لليسار، أو من اليسار لليمين، أو من أعلى لأسفل! لكن كيف نعرف من أين نقرأ؟ السر في وجوه الكائنات المرسومة.',
    contentSections: [
      {
        heading: 'القاعدة الذهبية: انظر إلى وجوه الطيور!',
        body: 'الكائنات والطيور والحيوانات تنظر دائماً نحو "بداية السطر". أي أنك عندما تقرأ النص، يجب أن تسير "في مواجهة" وجوه الحيوانات والطيور وجهاً لوجه.\nفإذا كانت البومة أو الصقر ينظران إلى جهة اليمين، فإن القراءة تبدأ من اليمين إلى اليسار (وهي الحالة الأكثر شيوعاً).'
      },
      {
        heading: 'الأعمدة والجمال البصري',
        body: 'إذا كان النص مكتوباً في أعمدة رأسية (مثل جدران المعابد والأعمدة)، فنقرأ العمود من الأعلى إلى الأسفل، ثم ننتقل للعمود التالي حسب اتجاه وجوه الرموز أيضاً.'
      }
    ],
    interactiveChallenge: {
      question: 'إذا كانت وجوه الطيور والأشخاص في نقش جداري تنظر نحو اليمين، كيف تقرأ السطر؟',
      options: ['من اليسار إلى اليمين', 'من اليمين إلى اليسار', 'من المنتصف إلى الخارج', 'لا يوجد اتجاه محدد'],
      correctIndex: 1,
      explanation: 'صحيح تماماً! نحن نقرأ دائماً باتجاه مواجهة وجوه الكائنات؛ فإذا نظرت لليمين نقرأ من اليمين لليسار.'
    }
  },
  {
    id: 4,
    titleAr: 'الخرطوشة الملكية: سحر الخلود وحماية الاسم',
    subtitleAr: 'كيف تفرّق بين أسماء الفراعنة وباقي النصوص',
    duration: '٦ دقائق',
    level: 'متوسط',
    conceptSummary: 'الخرطوشة الملكية هي الإطار البيضاوي الشهير المعقود بحبل في قاعدته، وكانت السر الذي مكّن شامبليون من حل لغز حجر رشيد.',
    contentSections: [
      {
        heading: 'أصل الخرطوشة: حلقة الشن (Shen)',
        body: 'الخرطوشة (بالهيروغليفية "شنو" Shenu) مشتقة من رمز حلقة الشن 𓍶، وهو حبل لا نهائي يرمز للدائرة المحيطة بالكون. قام الكاتب بمطه ليتسع لاسم الملك، ليكون الاسم محمياً بقوة سحرية تطرد عنه الحسد والشرور في كل أرجاء الكون.'
      },
      {
        heading: 'مفتاح شامبليون الذهبي',
        body: 'عندما لاحظ العالم الفرنسي شامبليون أن أسماء الملوك فقط هي التي تحاط بهذا الإطار البيضاوي، قام بمقارنة حروف خرطوشة "بطليموس" وخرطوشة "كليوباترا" واكتشف الحروف المشتركة (P, T, O, L) لينفتح له باب قراءة التاريخ المصري القديم بعد ألف عام من الصمت!'
      }
    ],
    interactiveChallenge: {
      question: 'ما هو الرمز الذي اشتُقت منه الخرطوشة الملكية للدلالة على الإحاطة والخلود؟',
      options: ['مفتاح الحياة (عنخ) 𓋹', 'حلقة الحبل المعقود (شن) 𓍶', 'صولجان الواس 𓌀', 'عمود الجد 𓊽'],
      correctIndex: 1,
      explanation: 'إجابة عبقرية! الخرطوشة مستوحاة من حلقة الشن (Shen) المعقودة بحبل لحماية اسم الملك.'
    }
  },
  {
    id: 5,
    titleAr: 'الأرقام عند الفراعنة: الحساب حتى المليون!',
    subtitleAr: 'نظام عشري عبقري بدون صفر ولكن بمنتهى الدقة',
    duration: '٥ دقائق',
    level: 'متقدم ممتع',
    conceptSummary: 'بنى المصريون الأهرامات وحسبوا مساحات الأراضي بعد فيضان النيل بنظام عدّ عشري رائع يمثل الآحاد بالعصي، والمئات بلفات الحبل، والملايين برمز الإله حح.',
    contentSections: [
      {
        heading: 'رموز الأعداد المصرية',
        body: '• الشرطة 𓏤 = ١\n• حدوة الحصان / قوس الكتان 𓎆 = ١٠\n• لفة الحبل 𓍢 = ١٠٠\n• زهرة اللوتس 𓆼 = ١٠٠٠\n• الإصبع المشير 𓂭 = ١٠,٠٠٠\n• الضفدع 𓆐 = ١٠٠,٠٠٠\n• الإله حح رافع اليدين 𓁨 = ١,٠٠٠,٠٠٠'
      },
      {
        heading: 'كيف يُكتب الرقم المركب؟',
        body: 'لكتابة رقم مثل 34: نضع 3 أقواس من فئة العشرة (30) وبجانبها 4 شرطات من فئة الآحاد (4) بكل سهولة ووضوح!'
      }
    ],
    interactiveChallenge: {
      question: 'أي رمز استخدمه المصري القديم لتمثيل الرقم 1000 (ألف)؟',
      options: ['لفة الحبل 𓍢', 'زهرة اللوتس 𓆼', 'الشرطة 𓏤', 'الإصبع المشير 𓂭'],
      correctIndex: 1,
      explanation: 'صحيح مائة بالمائة! زهرة اللوتس الجميلة 𓆼 كانت رمزاً للرقم 1,000 في الرياضيات المصرية القديمة.'
    }
  }
];

// Interactive Quiz Questions Pool (بنك الأسئلة والمسابقات)
export interface QuizQuestion {
  id: number;
  question: string;
  glyph: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  type: 'glyph-to-sound' | 'sound-to-glyph' | 'symbol-meaning' | 'trivia';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'ما هو الصوت الذي يمثله رمز الساق والقدم 𓃀 في الأبجدية الهيروغليفية؟',
    glyph: '𓃀',
    options: ['حرف الباء (B)', 'حرف الدال (D)', 'حرف الفاء (F)', 'حرف الراء (R)'],
    correctAnswerIndex: 0,
    explanation: 'الساق والقدم 𓃀 تمثل حرف الباء (B) في قائمة العلامات الصوتية الأحادية.',
    type: 'glyph-to-sound'
  },
  {
    id: 2,
    question: 'ما هو معنى الرمز المقدس "عنخ" 𓋹 الشهير؟',
    glyph: '𓋹',
    options: ['القوة والسلطان', 'الحياة والخلود', 'العدالة والحق', 'الذهب والغنى'],
    correctAnswerIndex: 1,
    explanation: 'العنخ 𓋹 هو مفتاح الحياة ورمز الخلود والبقاء الأبدي في العقيدة المصرية القديمة.',
    type: 'symbol-meaning'
  },
  {
    id: 3,
    question: 'أي من الرموز التالية يمثل حرف "الميم" (M)؟',
    glyph: '؟',
    options: ['البومة 𓅓', 'الفم 𓂋', 'الكف 𓂧', 'الحبل المجدول 𓎛'],
    correctAnswerIndex: 0,
    explanation: 'البومة 𓅓 هي الرمز الأشهر لصوت الميم (M) في الكتابة المصرية القديمة.',
    type: 'sound-to-glyph'
  },
  {
    id: 4,
    question: 'ما الذي يمثله رمز عين حورس 𓂀 (الوجات)؟',
    glyph: '𓂀',
    options: ['الحرب والهجوم', 'الحماية والشفاء والكمال', 'الظلام والغموض', 'السفر والترحال'],
    correctAnswerIndex: 1,
    explanation: 'عين حورس (الوجات) 𓂀 هي تعويذة الحماية والشفاء وسلامة الجسد والروح.',
    type: 'symbol-meaning'
  },
  {
    id: 5,
    question: 'ماذا يمثل الرمز 𓆑 (الحية ذات القرنين) صوتياً؟',
    glyph: '𓆑',
    options: ['حرف السين (S)', 'حرف الفاء (F)', 'حرف الشين (Sh)', 'حرف الهاء (H)'],
    correctAnswerIndex: 1,
    explanation: 'الحية ذات القرنين 𓆑 تمثل صوت الفاء (F) المستوحى من صوت فحيحها.',
    type: 'glyph-to-sound'
  },
  {
    id: 6,
    question: 'أي حجر تاريخي ساعد على فك رموز اللغة الهيروغليفية عام 1822؟',
    glyph: '𓊪𓏏𓍯𓃭𓐝𓇌𓋴',
    options: ['حجر باليرمو', 'حجر رشيد', 'لوحة نارمر', 'مسلة حتشبسوت'],
    correctAnswerIndex: 1,
    explanation: 'حجر رشيد، بنقوشه الثلاثية (هيروغليفي وديموطيقي ويوناني)، كان مفتاح فك الشفرة على يد شامبليون.',
    type: 'trivia'
  },
  {
    id: 7,
    question: 'ما هو الصوت المقابل لرمز الفم البشري 𓂋؟',
    glyph: '𓂋',
    options: ['حرف الراء (R)', 'حرف الميم (M)', 'حرف الواو (W)', 'حرف القاف (Q)'],
    correctAnswerIndex: 0,
    explanation: 'الفم 𓂋 يمثل حرف الراء (R) الصريح في الهيروغليفية.',
    type: 'glyph-to-sound'
  },
  {
    id: 8,
    question: 'كم تبلغ قيمة رمز زهرة اللوتس 𓆼 في نظام الأرقام المصري القديم؟',
    glyph: '𓆼',
    options: ['10', '100', '1,000', '10,000'],
    correctAnswerIndex: 2,
    explanation: 'زهرة اللوتس 𓆼 تعبر عن الرقم 1,000 (ألف) في الحساب المصري القديم.',
    type: 'trivia'
  }
];
