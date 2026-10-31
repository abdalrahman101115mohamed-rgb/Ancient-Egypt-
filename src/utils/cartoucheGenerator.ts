export interface CartoucheGlyphItem {
  char: string;
  glyph: string;
  gardiner: string;
  nameAr: string;
  nameEn: string;
  sound: string;
  objectDescriptionAr: string;
}

// Arabic to Hieroglyphic mapping table
const ARABIC_MAPPING: Record<string, { glyph: string; gardiner: string; nameAr: string; sound: string; objectDescriptionAr: string }> = {
  'ا': { glyph: '𓄿', gardiner: 'G1', nameAr: 'عقاب مصري', sound: 'ألف / A', objectDescriptionAr: 'طائر العقاب المصري' },
  'أ': { glyph: '𓄿', gardiner: 'G1', nameAr: 'عقاب مصري', sound: 'ألف / A', objectDescriptionAr: 'طائر العقاب المصري' },
  'إ': { glyph: '𓇋', gardiner: 'M17', nameAr: 'قصبة مورقة', sound: 'إي / I', objectDescriptionAr: 'نبات القصب المورق' },
  'آ': { glyph: '𓄿', gardiner: 'G1', nameAr: 'عقاب مصري', sound: 'آ / Aa', objectDescriptionAr: 'طائر العقاب المصري' },
  'ء': { glyph: '𓄿', gardiner: 'G1', nameAr: 'عقاب مصري', sound: 'همزة / Glottal stop', objectDescriptionAr: 'طائر العقاب المصري' },
  'ب': { glyph: '𓃀', gardiner: 'D58', nameAr: 'ساق وقدم', sound: 'باء / B', objectDescriptionAr: 'قدم وساق بشرية' },
  'ت': { glyph: '𓏏', gardiner: 'X1', nameAr: 'رغيف خبز', sound: 'تاء / T', objectDescriptionAr: 'رغيف خبز نصف دائري' },
  'ة': { glyph: '𓏏', gardiner: 'X1', nameAr: 'رغيف خبز (تاء التأنيث)', sound: 'تاء مربوطة / T', objectDescriptionAr: 'رغيف خبز نصف دائري' },
  'ث': { glyph: '𓍿', gardiner: 'V13', nameAr: 'قيد الحبل', sound: 'ثاء / Th', objectDescriptionAr: 'حبل تقييد الماشية' },
  'ج': { glyph: '𓆓', gardiner: 'I10', nameAr: 'حية الكوبرا', sound: 'جيم معطشة / Dj', objectDescriptionAr: 'حية الكوبرا الملكية' },
  'ح': { glyph: '𓎛', gardiner: 'V28', nameAr: 'حبل كتان مفتول', sound: 'حاء / Ḥ', objectDescriptionAr: 'ضفيرة من ألياف الكتان' },
  'خ': { glyph: '𓐍', gardiner: 'Aa1', nameAr: 'قرص المشيمة أو الغربال', sound: 'خاء / Kh', objectDescriptionAr: 'قرص دائري مخطط' },
  'د': { glyph: '𓂧', gardiner: 'D46', nameAr: 'كف اليد', sound: 'دال / D', objectDescriptionAr: 'كف يد ممدودة' },
  'ذ': { glyph: '𓍿', gardiner: 'V13', nameAr: 'قيد الحبل', sound: 'ذال / Th', objectDescriptionAr: 'حبل تقييد الماشية' },
  'ر': { glyph: '𓂋', gardiner: 'D21', nameAr: 'الفم البشري', sound: 'راء / R', objectDescriptionAr: 'فم بشري بشفتين متطابقتين' },
  'ز': { glyph: '𓊃', gardiner: 'O34', nameAr: 'مزلاج الباب', sound: 'زاي / Z', objectDescriptionAr: 'مزلاج باب خشبي' },
  'س': { glyph: '𓋴', gardiner: 'S29', nameAr: 'طية القماش المطوي', sound: 'سين / S', objectDescriptionAr: 'قطعة نسيج مطوية' },
  'ش': { glyph: '𓈙', gardiner: 'N37', nameAr: 'بركة الماء', sound: 'شين / Sh', objectDescriptionAr: 'حوض ماء مستطيل' },
  'ص': { glyph: '𓋴', gardiner: 'S29', nameAr: 'طية القماش', sound: 'صوت الصاد / S', objectDescriptionAr: 'قطعة نسيج كتاني' },
  'ض': { glyph: '𓂧', gardiner: 'D46', nameAr: 'كف اليد', sound: 'صوت الضاد / D', objectDescriptionAr: 'كف يد ممدودة' },
  'ط': { glyph: '𓏏', gardiner: 'X1', nameAr: 'رغيف الخبز', sound: 'صوت الطاء / T', objectDescriptionAr: 'رغيف خبز مقبب' },
  'ظ': { glyph: '𓍿', gardiner: 'V13', nameAr: 'قيد الحبل', sound: 'صوت الظاء / Th', objectDescriptionAr: 'حبل تقييد الماشية' },
  'ع': { glyph: '𓂝', gardiner: 'D36', nameAr: 'الساعد البشري', sound: 'عين / Ayin', objectDescriptionAr: 'ساعد يد ممدودة' },
  'غ': { glyph: '𓎼', gardiner: 'W11', nameAr: 'قاعدة الإناء', sound: 'غين / G', objectDescriptionAr: 'قاعدة إناء مستديرة' },
  'ف': { glyph: '𓆑', gardiner: 'I9', nameAr: 'الحية ذات القرنين', sound: 'فاء / F', objectDescriptionAr: 'أفعى صحراوية بقرنين' },
  'ق': { glyph: '𓈎', gardiner: 'N29', nameAr: 'التل أو منحدر الرمل', sound: 'قاف / Q', objectDescriptionAr: 'منحدر تل رملي' },
  'ك': { glyph: '𓎡', gardiner: 'V31', nameAr: 'السلة ذات المقبض', sound: 'كاف / K', objectDescriptionAr: 'سلة قصبية بمقبض' },
  'ل': { glyph: '𓃭', gardiner: 'E23', nameAr: 'الأسد الرابض', sound: 'لام / L', objectDescriptionAr: 'أسد رابض في هيبة ووقار' },
  'م': { glyph: '𓅓', gardiner: 'G17', nameAr: 'البومة الحكيمة', sound: 'ميم / M', objectDescriptionAr: 'طائر بومة ناظر للأمام' },
  'ن': { glyph: '𓈖', gardiner: 'N35', nameAr: 'موجات مياه النيل', sound: 'نون / N', objectDescriptionAr: 'تموجات ماء النيل' },
  'ه': { glyph: '𓉔', gardiner: 'O4', nameAr: 'كوخ القصب أو المأوى', sound: 'هاء / H', objectDescriptionAr: 'مخطط كوخ أو مأوى قصب' },
  'هـ': { glyph: '𓉔', gardiner: 'O4', nameAr: 'كوخ القصب أو المأوى', sound: 'هاء / H', objectDescriptionAr: 'مخطط كوخ أو مأوى قصب' },
  'و': { glyph: '𓅱', gardiner: 'G43', nameAr: 'فرخ السمان', sound: 'واو / W / O / U', objectDescriptionAr: 'فرخ طائر السمان' },
  'ي': { glyph: '𓇌', gardiner: 'M17A', nameAr: 'قَصَبتان مورقتان', sound: 'ياء / Y / I', objectDescriptionAr: 'قصبتا قصب متجاورتان' },
  'ى': { glyph: '𓄿', gardiner: 'G1', nameAr: 'عقاب مصري (ألف مقصورة)', sound: 'ألف مقصورة / A', objectDescriptionAr: 'طائر العقاب المصري' },
};

// Latin to Hieroglyphic mapping table
const LATIN_MAPPING: Record<string, { glyph: string; gardiner: string; nameAr: string; sound: string; objectDescriptionAr: string }> = {
  'a': { glyph: '𓄿', gardiner: 'G1', nameAr: 'عقاب مصري', sound: 'A', objectDescriptionAr: 'طائر العقاب المصري' },
  'b': { glyph: '𓃀', gardiner: 'D58', nameAr: 'ساق وقدم', sound: 'B', objectDescriptionAr: 'قدم وساق بشرية' },
  'c': { glyph: '𓎡', gardiner: 'V31', nameAr: 'السلة ذات المقبض', sound: 'K/C', objectDescriptionAr: 'سلة قصبية بمقبض' },
  'd': { glyph: '𓂧', gardiner: 'D46', nameAr: 'كف اليد', sound: 'D', objectDescriptionAr: 'كف يد ممدودة' },
  'e': { glyph: '𓇋', gardiner: 'M17', nameAr: 'قصبة مورقة', sound: 'E / I', objectDescriptionAr: 'نبات القصب المورق' },
  'f': { glyph: '𓆑', gardiner: 'I9', nameAr: 'الحية ذات القرنين', sound: 'F', objectDescriptionAr: 'أفعى صحراوية بقرنين' },
  'g': { glyph: '𓎼', gardiner: 'W11', nameAr: 'قاعدة الإناء', sound: 'G', objectDescriptionAr: 'قاعدة إناء مستديرة' },
  'h': { glyph: '𓉔', gardiner: 'O4', nameAr: 'مأوى القصب', sound: 'H', objectDescriptionAr: 'مخطط كوخ من القصب' },
  'i': { glyph: '𓇋', gardiner: 'M17', nameAr: 'قصبة مورقة', sound: 'I', objectDescriptionAr: 'نبات القصب المورق' },
  'j': { glyph: '𓆓', gardiner: 'I10', nameAr: 'حية الكوبرا', sound: 'J / Dj', objectDescriptionAr: 'حية الكوبرا الملكية' },
  'k': { glyph: '𓎡', gardiner: 'V31', nameAr: 'السلة ذات المقبض', sound: 'K', objectDescriptionAr: 'سلة قصبية بمقبض' },
  'l': { glyph: '𓃭', gardiner: 'E23', nameAr: 'الأسد الرابض', sound: 'L', objectDescriptionAr: 'أسد رابض' },
  'm': { glyph: '𓅓', gardiner: 'G17', nameAr: 'البومة الحكيمة', sound: 'M', objectDescriptionAr: 'طائر بومة ناظر للأمام' },
  'n': { glyph: '𓈖', gardiner: 'N35', nameAr: 'موجات مياه النيل', sound: 'N', objectDescriptionAr: 'تموجات ماء النيل' },
  'o': { glyph: '𓅱', gardiner: 'G43', nameAr: 'فرخ السمان', sound: 'O / W', objectDescriptionAr: 'فرخ طائر السمان' },
  'p': { glyph: '𓊪', gardiner: 'Q3', nameAr: 'حصير القصب', sound: 'P', objectDescriptionAr: 'حصير مستطيل مجدول' },
  'q': { glyph: '𓈎', gardiner: 'N29', nameAr: 'التل الرملي', sound: 'Q', objectDescriptionAr: 'منحدر تل رملي' },
  'r': { glyph: '𓂋', gardiner: 'D21', nameAr: 'الفم البشري', sound: 'R', objectDescriptionAr: 'فم بشري بشفتين' },
  's': { glyph: '𓋴', gardiner: 'S29', nameAr: 'طية القماش', sound: 'S', objectDescriptionAr: 'قطعة نسيج مطوية' },
  't': { glyph: '𓏏', gardiner: 'X1', nameAr: 'رغيف الخبز', sound: 'T', objectDescriptionAr: 'رغيف خبز نصف دائري' },
  'u': { glyph: '𓅱', gardiner: 'G43', nameAr: 'فرخ السمان', sound: 'U', objectDescriptionAr: 'فرخ طائر السمان' },
  'v': { glyph: '𓆑', gardiner: 'I9', nameAr: 'الحية ذات القرنين', sound: 'V / F', objectDescriptionAr: 'أفعى صحراوية بقرنين' },
  'w': { glyph: '𓅱', gardiner: 'G43', nameAr: 'فرخ السمان', sound: 'W', objectDescriptionAr: 'فرخ طائر السمان' },
  'x': { glyph: '𓎡𓋴', gardiner: 'V31+S29', nameAr: 'سلة + قماش', sound: 'X (KS)', objectDescriptionAr: 'مركب من الكاف والسين' },
  'y': { glyph: '𓇌', gardiner: 'M17A', nameAr: 'قَصَبتان مورقتان', sound: 'Y', objectDescriptionAr: 'قصبتا قصب متجاورتان' },
  'z': { glyph: '𓊃', gardiner: 'O34', nameAr: 'مزلاج الباب', sound: 'Z', objectDescriptionAr: 'مزلاج باب خشبي' },
};

export function generateCartoucheFromName(inputName: string): {
  items: CartoucheGlyphItem[];
  fullGlyphString: string;
  cleanedName: string;
} {
  const trimmed = inputName.trim();
  if (!trimmed) {
    return { items: [], fullGlyphString: '', cleanedName: '' };
  }

  const items: CartoucheGlyphItem[] = [];

  // Remove diacritics / tashkeel
  const normalized = trimmed.replace(/[\u064B-\u065F\u0670]/g, '');

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    if (char === ' ') {
      continue; // Spaces are skipped in hieroglyphic cartouches
    }

    const lowerChar = char.toLowerCase();

    // Check Arabic first
    if (ARABIC_MAPPING[char]) {
      const match = ARABIC_MAPPING[char];
      items.push({
        char,
        glyph: match.glyph,
        gardiner: match.gardiner,
        nameAr: match.nameAr,
        nameEn: match.sound,
        sound: match.sound,
        objectDescriptionAr: match.objectDescriptionAr
      });
      continue;
    }

    // Check Latin
    if (LATIN_MAPPING[lowerChar]) {
      const match = LATIN_MAPPING[lowerChar];
      items.push({
        char,
        glyph: match.glyph,
        gardiner: match.gardiner,
        nameAr: match.nameAr,
        nameEn: match.sound,
        sound: match.sound,
        objectDescriptionAr: match.objectDescriptionAr
      });
      continue;
    }

    // Fallback unknown character
    items.push({
      char,
      glyph: '𓄿',
      gardiner: 'G1',
      nameAr: 'رمز بديل (عقاب)',
      nameEn: 'A',
      sound: char,
      objectDescriptionAr: 'رمز صوتي بديل'
    });
  }

  const fullGlyphString = items.map(item => item.glyph).join('');

  return {
    items,
    fullGlyphString,
    cleanedName: trimmed
  };
}
