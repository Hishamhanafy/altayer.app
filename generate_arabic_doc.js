const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType
} = require('docx');

async function createDoc() {
  const doc = new Document({
    creator: '3altayer Platform Architecture Team',
    title: 'دليل النموذج الأولي والمواصفات الفنية لمنظومة عالطاير للنقل الذكي',
    description: 'وثيقة المواصفات الفنية والنماذج الأولية لتطبيقي الراكب والكابتن واللوحة الإدارية لمنصة عالطاير',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 },
            children: [
              new TextRun({
                text: '🚗 منصة "عالطاير" للنقل الذكي (3altayer App) ⚡',
                size: 36,
                bold: true,
                color: 'EA580C',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: 'وثيقة النموذج الأولي والمواصفات التشغيلية الشاملة (PRD & Prototype Specification)',
                size: 24,
                bold: true,
                color: '1E293B',
              }),
            ],
          }),

          // Meta Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'إصدار الوثيقة:', bold: true, size: 20 })] })],
                  }),
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'الإصدار المؤسسي المتكامل 2.0 (Enterprise Spec)', size: 20 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'بيئة التطوير:', bold: true, size: 20 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Flutter 3.47 Mobile Apps (Android & iOS) + NestJS + Next.js', size: 20 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'نطاق التشغيل الجغرافي:', bold: true, size: 20 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'جمهورية مصر العربية 🇪🇬 (القاهرة الكبرى، الإسكندرية، محافظات القناة والدلتا)', size: 20 })] })],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 400 } }),

          // Section 1
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: '1. الملخص التنفيذي وفلسفة النظام الهجين (Executive Summary)',
                bold: true,
                size: 26,
                color: '0F172A',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'منصة "عالطاير" هي أول منظومة نقل ذكي هجينة في مصر تجمع بين قوتين رئيسيتين في قطاع التوصيل:',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({
                text: 'النموذج الحر والتفاوضي (Bidding / inDrive Model): ',
                bold: true,
                color: 'EA580C',
                size: 22,
              }),
              new TextRun({
                text: 'يتيح للراكب اقتراح السعر المناسب واستقبال عروض تنافسية من السائقين في محيطه والمفاضلة بينهم وفقاً للسعر والتقييم وموديل السيارة.',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: 'نموذج الحجز الفوري السريع (Instant / Uber Model): ',
                bold: true,
                color: '10B981',
                size: 22,
              }),
              new TextRun({
                text: 'لمن يفضل السرعة والأجرة الثابتة المباشرة مع تعيين فوري لأقرب كابتن متاح في ثوانٍ معدودة.',
                size: 22,
              }),
            ],
          }),

          // Section 2
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: '2. تفاصيل ومواصفات تطبيق الراكب (Rider Application 2.0)',
                bold: true,
                size: 26,
                color: '0F172A',
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: 'أ) الشاشة الرئيسية والخريطة التفاعلية (Home & Map View)', bold: true, size: 22, color: 'EA580C' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• خريطة ليلية حية داكنة (Cairo Live GPS Vector Map) تعرض تمركز وتحرك سيارات الكباتن اللحظي.\n' +
                      '• شريط البحث الذكي للوجهة مع اقتراحات الأماكن الأكثر زيارة (المنزل، العمل، المولات والمطار).\n' +
                      '• منتقي الفئات (Vehicle Carousel) بـ 5 خيارات:\n' +
                      '   1) عالطاير توفير (سيدان اقتصادية - الفئة الأساسية)\n' +
                      '   2) عالطاير راحة Comfort (سيارات حديثة مكيفة)\n' +
                      '   3) عالطاير VIP (سيارات فارهة)\n' +
                      '   4) سكوتر طلقة (لتفادي الزحام واختصار الوقت)\n' +
                      '   5) توك توك شعبي (للمشاوير والحارات الضيقة)',
                size: 22,
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: 'ب) رادار المزايدة والتفاوض اللحظي (Live Bidding Stream)', bold: true, size: 22, color: 'EA580C' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• مؤقت دائري ذكي 60 ثانية للبحث وتلقي العروض.\n' +
                      '• شريط أزرار لتعديل السعر المقترح بضغطة واحدة (+5ج، +10ج، -5ج).\n' +
                      '• بطاقة عرض الكابتن التفاعلية تشمل: صورة الكابتن، التقييم، عدد الرحلات، موديل ولون السيارة ورقم اللوحة المعدنية، وبعده بالكيلومترات والدقائق.\n' +
                      '• زر قبول العرض الفوري أو التخطي.',
                size: 22,
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: 'ج) منظومة الأمان أثناء الرحلة (Active In-Trip Experience)', bold: true, size: 22, color: 'EA580C' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• كود أمان المشوار الرقمي (4-Digit Safety PIN OTP): لا تبدأ الرحلة إلا بعد إعطائه للكابتن لمنع ركوب شخص خاطئ.\n' +
                      '• شات محادثة فوري مباشر مع الكابتن داخل التطبيق مع رسائل سريعة جاهزة.\n' +
                      '• اتصال هاتفي مشفر وزر الاستغاثة والطوارئ SOS.\n' +
                      '• مشاركة رابط تتبع الرحلة المباشر عبر الواتساب للأهل والأصدقاء.',
                size: 22,
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: 'د) إنهاء الرحلة والتقييم والمحفظة', bold: true, size: 22, color: 'EA580C' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• كشف حساب تفصيلي: الأجرة المتفق عليها، خصم الكوبون، وإكرامية الكابتن الاختيارية (+5ج، +10ج، +20ج).\n' +
                      '• تقييم الكابتن بـ 5 نجوم وأوسمة إشادة (سائق محترف، سيارة نظيفة، قيادة آمنة).\n' +
                      '• إدارة الكوبونات والعروض (كود ALTAYER50) وبرنامج دعوة الأصدقاء عبر واتساب.',
                size: 22,
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 300 } }),

          // Section 3
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: '3. تفاصيل ومواصفات تطبيق الكابتن المستقل (Driver Application 2.0)',
                bold: true,
                size: 26,
                color: '0F172A',
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: 'أ) تسجيل الدخول ومعالج التسجيل المتعدد (Auth & Onboarding)', bold: true, size: 22, color: '10B981' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• تسجيل الدخول برقم الهاتف المصري (+20) مع كود التحقق SMS OTP (كود تجريبي سريع 1234).\n' +
                      '• معالج تسجيل الكابتن الجديد في 3 خطوات:\n' +
                      '   1) البيانات الشخصية: الاسم الرباعي، الرقم القومي 14 رقم، المحافظة، ورقم هاتف الطوارئ.\n' +
                      '   2) بيانات وفئة المركبة: الموديل وسنة الصنع، حروف وأرقام اللوحة، واللون.\n' +
                      '   3) إعدادات استلام الأرباح: ربط عنوان InstaPay أو محفظة فودافون كاش أو الحساب البنكي.',
                size: 22,
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: 'ب) مركز التوثيق الذاتي للرخص والوثائق (KYC Certification Center)', bold: true, size: 22, color: '10B981' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• ماسح ضوئي ذكي بكاميرا الهاتف مع إطار توجيهي مخصص للبطاقات والرخص:\n' +
                      '   - بطاقة الرقم القومي (وجه وظهر).\n' +
                      '   - رخصة القيادة السارية ورخصة تسيير السيارة.\n' +
                      '   - صحيفة الحالة الجنائية (فيش وتشبيه حديث).\n' +
                      '   - صور فحص السيارة وزواياها والصالون الداخلي.\n' +
                      '   - الصورة الشخصية الرسمية للكابتن (Selfie Face ID).\n' +
                      '• لوحة متابعة حالة الاعتماد الفوري (معتمد 🟢، قيد المراجعة ⏳، مطلوب إعادة الرفع ⚠️).',
                size: 22,
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: 'ج) رادار الطلبات والمزايدة والملاحة', bold: true, size: 22, color: '10B981' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• خريطة مناطق الذروة والطلب المرتفع في القاهرة (Surge Heatmap) مع مفتاح متصل/غير متصل.\n' +
                      '• نافذة استقبال الطلب مع مؤقت 15 ثانية وتفاصيل المسار، وأزرار المزايدة الفورية (+10ج، +20ج، +30ج).\n' +
                      '• شاشة الملاحة الحية مع زر خرائط جوجل، وزر "وصلت للراكب"، وإدخال كود الأمان OTP (8492) للتحقق، وزر إنهاء المشوار وتحصيل الكاش مع حساب العمولة التلقائي.',
                size: 22,
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: 'د) المحفظة والتارجت والملف الشخصي', bold: true, size: 22, color: '10B981' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• مركز المحفظة وسداد العمولات: حد مديونية مسموح (-150 ج.م)، سداد فوري عبر إنستاباي وفودافون كاش، وسحب الأرباح.\n' +
                      '• مكافآت وبونص التارجت اليومي: بونص ساعات الذروة المسائية (+60 ج.م معفي من العمولات).\n' +
                      '• البروفايل المتكامل: شارة كابتن ذهبي 🥇، معدل القبول (96%)، محفظة الوثائق وتواريخ التجديد، وتفضيلات المشاوير.',
                size: 22,
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 300 } }),

          // Section 4
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: '4. جدول مقارنة ومصفوفة الميزات (Features Matrix)',
                bold: true,
                size: 26,
                color: '0F172A',
              }),
            ],
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: '0F172A', type: ShadingType.CLEAR },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'الميزة / الوظيفة', bold: true, color: 'FFFFFF', size: 20 })] })],
                  }),
                  new TableCell({
                    shading: { fill: '0F172A', type: ShadingType.CLEAR },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'تطبيق الراكب (Rider)', bold: true, color: 'FFFFFF', size: 20 })] })],
                  }),
                  new TableCell({
                    shading: { fill: '0F172A', type: ShadingType.CLEAR },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'تطبيق الكابتن (Driver)', bold: true, color: 'FFFFFF', size: 20 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'نوع الخريطة', bold: true, size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'خريطة تفاعلية ومسار ديناميكي', size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'خريطة حرارية للذروة (Surge)', size: 18 })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'المزايدة والتفاوض', bold: true, size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'تحديد السعر وبث عروض الكباتن', size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'أزرار مزايدة سريعة (+10، +20)', size: 18 })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'كود الأمان والتحقق', bold: true, size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'توليد كود OTP (8492)', size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'لوحة إدخال OTP للتحقق وبدء الرحلة', size: 18 })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'التوثيق والـ KYC', bold: true, size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'توثيق رقم الهاتف', size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'تصوير الرخص والبطاقة والفيش بالكاميرا', size: 18 })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'وسائل الدفع والتحويل', bold: true, size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'كاش، كوبونات خصم، محفظة', size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'إنستاباي، فودافون كاش، وسحب الأرباح', size: 18 })] })] }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 400 } }),

          // Footer
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'تم إعداد هذه الوثيقة آلياً لمنصة عالطاير للنقل الذكي • جميع الحقوق محفوظة 2026 ©',
                size: 18,
                color: '64748B',
                italics: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join('d:', '3altayer.app', 'دليل_النموذج_الأولي_لمنظومة_عالطاير_3altayer_PRD.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document created successfully at: ${outputPath}`);
}

createDoc().catch(err => {
  console.error('Error generating document:', err);
});
