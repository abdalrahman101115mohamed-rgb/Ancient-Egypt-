import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK if API key exists
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI();
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback knowledge base for ancient Egyptian scribal tutoring in Arabic
const egyptologyCuratedQA: Array<{ keywords: string[]; answer: string; hieroglyphs: string }> = [
  {
    keywords: ['خرطوش', 'خرطوشة', 'اسم', 'ملوك'],
    answer: 'الخرطوشة الملكية (بالهيروغليفية "شنو" Shenu) كانت حلقة حبل دائرية تمتد لتصبح بيضاوية لحماية اسم الفرعون الملكي وسحره من أي مكروه. كانت تخصص فقط لأسماء الملوك مثل اسم التتويج واسم الولادة.',
    hieroglyphs: '𓍶 𓇳𓏠𓆣'
  },
  {
    keywords: ['عنخ', 'مفتاح الحياة', 'حياة'],
    answer: 'رمز "العنخ" 𓋹 يمثل "الحياة" والخلود. يُعتقد أنه يمثل عقدة صندل أو حزام الرحم كرمز لبداية النسل واستمرار الوجود. كان الفراعنة والآلهة يمسكونه في أيديهم كإشارة لمنح الحياة الأبدية.',
    hieroglyphs: '𓋹'
  },
  {
    keywords: ['اتجاه', 'يمين', 'يسار', 'اقرأ', 'قراءة'],
    answer: 'قاعدة اتجاه القراءة الهيروغليفية بسيطة ومدهشة: انظر إلى وجوه الطيور والحيوانات والأشخاص في السطر! الاتجاه الذي تنظر إليه الكائنات هو الذي تبدأ القراءة منه، فإذا كانت تنظر لليمين نقرأ من اليمين إلى اليسار (وهو الأكثر شيوعاً في مصر القديمة).',
    hieroglyphs: '𓅃 𓃀 𓆑'
  },
  {
    keywords: ['حجر رشيد', 'شامبليون', 'فك', 'حل'],
    answer: 'اكتشف حجر رشيد عام 1799 بمدينة رشيد في دلتا النيل. كُتب بثلاثة خطوط: الهيروغليفية (لرجال الدين)، والديموطيقية (الخط الشعبي)، واليونانية القديمة. استطاع جان فرانسوا شامبليون عام 1822 فك شفرته بمقارنة أسماء الملوك المحاطة بالخراطيش (مثل بطليموس وكليوباترا).',
    hieroglyphs: '𓊪𓏏𓍯𓃭𓐝𓇌𓋴'
  },
  {
    keywords: ['أرقام', 'عد', 'حساب', 'رياضيات'],
    answer: 'استخدم المصري القديم نظاماً عشرياً عبقرياً: شرطة رأسية 𓏤 للواحد، حدوة أو حبل مقوس 𓎆 للعشرة، لفة حبل 𓍢 للمائة، زهرة لوتس 𓆼 للألف، إصبع مشير 𓂭 لعشرة آلاف، ضفدع أو أبو ذنيبة 𓆐 لمائة ألف، والإله حح 𓁨 رافعاً ذراعيه دهشة للمليون!',
    hieroglyphs: '𓏤 𓎆 𓍢 𓆼 𓂭 𓆐 𓁨'
  }
];

// Scribe AI tutor endpoint
app.post('/api/scribe', async (req, res) => {
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'يرجى تقديم سؤال صالح' });
  }

  const trimmed = question.trim().toLowerCase();

  // If Gemini API Key is available, use Gemini 2.5 Flash for authentic, scholarly Arabic explanation
  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const systemInstruction = `أنت "حكيم الكَتَبَة" (The Scribe Sage) - معلم خبير متخصص في اللغة الهيروغليفية المصرية القديمة وتاريخها (مدو نتر Medu Netjer).
مهمتك:
1. الإجابة باللغة العربية الفصحى السهلة والمبسطة والمشوقة.
2. توضيح الرموز الهيروغليفية مع رموز اليونيكود المقابلة (مثل 𓋹, 𓊵, 𓄤, 𓈖, 𓂋) عند ذكرها.
3. شرح المعنى الصوتي (Phonogram) والمعنى التصويري (Ideogram) والمخصص (Determinative) بشكل مبسط لمن يتعلم لأول مرة.
4. إذا سأل المستخدم كيف يكتب اسمه أو كلمة، اشرح له الرموز التي تمثل أصوات الحروف وكيف تُنطق بالصوت المصري القديم.
5. حافظ على أسلوب مشجع وأنيق ومفعم بروح الحضارة المصرية العريقة وبدون إطالة مملة (فقرتين إلى ثلاث فقرات غنية وواضحة).`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: trimmed,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || 'عذراً، لم أستطع العثور على الإجابة في برديات الكَتَبَة حالياً.';
      return res.json({ reply });
    } catch (error) {
      console.error('Gemini API call error in /api/scribe:', error);
      // Fallback gracefully below
    }
  }

  // Graceful curated scholarly fallback
  const matched = egyptologyCuratedQA.find(item =>
    item.keywords.some(kw => trimmed.includes(kw))
  );

  if (matched) {
    return res.json({
      reply: `${matched.answer}\n\nرموز مرتبطة: ${matched.hieroglyphs}`
    });
  }

  return res.json({
    reply: `مرحباً بك يا طالب علم الكَتَبَة العريق. سؤالك حول "${question}" يعبر عن شغف حقيقي بالهيروغليفية ("مدو نتر" أي كلام الإلهة).

في الكتابة المصرية القديمة، تنقسم الرموز إلى ثلاثة أنواع أساسية:
1. رموز صوتية (حرف واحد، حرفان، أو ثلاثة حروف).
2. رموز دلالية (تعبر عن الشيء نفسه مثل رسم شمس 𓇳 لتعني الشمس).
3. مخصصات في نهاية الكلمة توضح معناها (مثل رسم رجل 𓀀 بعد أسماء الأشخاص والوظائف).

يمكنك استكشاف قسم "الأبجدية" أو "الدروس" في التطبيق لتتعلم كيف تتهجى أي اسم بسهولة تامة!`
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hieroglyphics Learning Platform server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
