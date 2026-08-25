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
  ShadingType
} = require('docx');

async function createAkhilDoc() {
  const doc = new Document({
    creator: 'AKHIL Platform Product Architecture',
    title: 'أخيل | AKHIL — وثيقة تصميم المنتج والنموذج الأولي للواجهات',
    description: 'Product Requirements & UX/UI Prototype Specification for AKHIL Platform',
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: 'أخيل | AKHIL', size: 38, bold: true, color: 'D97706' }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: 'أبعد من طريق', size: 24, bold: true, color: '1E1B4B' }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: 'وثيقة تصميم المنتج والنموذج الأولي للواجهات (Product Requirements & UX/UI Prototype Specification)\nنسخة أولية مرجعية لتسليمها إلى شركة Product Design / UI-UX قبل مرحلة البرمجة',
                size: 20,
                color: '475569',
              }),
            ],
          }),

          // Section 1
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: '1. الغرض من الوثيقة ونطاقها', bold: true, size: 24, color: '1E1B4B' })],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'تصف هذه الوثيقة ما يجب أن يراه المستخدم وما يجب أن يحدث من منظور المنتج داخل أخيل، دون فرض بنية تقنية أو مزود سحابي أو لغة برمجة بعينها. الهدف هو تمكين شركة تصميم منتجات رقمية من تحويل منطق أخيل إلى User Flows وWireframes وواجهات عالية الدقة وPrototype تفاعلي قابل للاختبار والتسليم لاحقًا لأي Software House.\n' +
                      '• ليست الوثيقة مواصفات Backend نهائية، ولا تحدد AWS أو Google Cloud أو قواعد البيانات أو الـAPIs.\n' +
                      '• يجب أن تكون ملفات التصميم الأصلية وDesign System والPrototype وحقوق الاستخدام والتعديل ملكًا لأخيل.\n' +
                      '• التصميم عربي/إنجليزي، مع دعم RTL/LTR من البداية.\n' +
                      '• يجب تصميم حالات النجاح والفشل والانتظار وعدم الاتصال والإلغاء، وليس Happy Path فقط.',
                size: 20,
              }),
            ],
          }),

          // Section 2 & 3
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: '2. فلسفة المنتج وأنواع المستخدمين', bold: true, size: 24, color: '1E1B4B' })],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'أخيل منصة نقل ذكي تستهدف جعل الرحلة مفهومة وعادلة وبسيطة للعميل والكابتن، مع فصل واضح بين السعر الأساسي للرحلة والحوافز التشغيلية.\n' +
                      '• هوية التشغيل: العميل + الكابتن/البرثونة + المنصة مجتمع واحد، مع بقاء قواعد الأمان والتشغيل في يد أخيل.\n' +
                      '• لا تسعير ذروة تقليدي في النموذج الأساسي؛ السعر يظهر بوضوح قبل الطلب وفق سياسة أخيل.\n' +
                      '• من التسجيل يستطيع الكابتن تحديد مناطق التشغيل الأكثر تفضيلًا له، وتُستخدم هذه المعلومة في تجربة التشغيل والتوزيع.\n' +
                      '• الذكاء الاصطناعي طبقة مساعدة ودعم وتحليل، وليس صاحب صلاحية مالية مستقلة.\n\n' +
                      'أنواع المستخدمين:\n' +
                      '1. العميل Rider.\n' +
                      '2. الكابتن Captain.\n' +
                      '3. البرثونة Parthona: سائقة ضمن قواعد خدمة النساء المعتمدة.\n' +
                      '4. موظف الدعم/المراجعة.\n' +
                      '5. مساعد أخيل الذكي: دعم نصي/صوتي محدود الصلاحيات.',
                size: 20,
              }),
            ],
          }),

          // Section 4
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: '3. تطبيق العميل Rider Application', bold: true, size: 24, color: '1E1B4B' })],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'خدمات أخيل الـ 10:\n' +
                      'Economy | Plus | Business | Parthona (برثونة) | Time | Extra | Carry | Box | Trip | Partner of Events\n\n' +
                      'مركز حوافز العميل:\n' +
                      '• AKHIL FIRST — تجربة تستحق\n' +
                      '• AKHIL WELCOME — رصيد ترحيبي 200 جنيه\n' +
                      '• AKHIL SHARE — دعوة صديق وربح مشترك\n' +
                      '• AKHIL CASH UP — رحلة مجانية شهريًا\n' +
                      '• AKHIL YOUR PRICE — روتينك بسعرك\n' +
                      '• AKHIL SPECIAL — هدية يومك الخاص\n' +
                      '• AKHIL CREDIT — رحلتك وادفع بعدين (وفق قواعد الأهلية)\n' +
                      '• AKHIL WIN — أرباحك مستمرة\n\n' +
                      'سياسة الانتظار والتسعير:\n' +
                      '• أول دقيقتين مجانًا ثم 3 جنيه/دقيقة.\n' +
                      '• التقريب السعري إلى أعلى 5 جنيه عند التطبيق.',
                size: 20,
              }),
            ],
          }),

          // Section 5
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: '4. تطبيق الكابتن/البرثونة Driver Application', bold: true, size: 24, color: '1E1B4B' })],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'فئات التشغيل:\n' +
                      '• AKHIL GUARANTEE — أخيل ضمان مالي: يوضح الضمان الشهري، ساعات الإتاحة، والرحلات.\n' +
                      '• AKHIL FLEX — أخيل عمولة مرنة: يوضح شريحة العمولة الحالية والرحلات المتبقية.\n\n' +
                      'مركز حوافز الكابتن (أخيل طريق للأفضل):\n' +
                      '• AKHIL READY — رصيدك مقدّم\n' +
                      '• AKHIL FLEX RATE — عمولة مرنة / حافز الشهر الأول\n' +
                      '• AKHIL FREE MOBILE — موبايل هدية\n' +
                      '• AKHIL WEEKLY FLOW — أخيل أرباح أسبوعية\n' +
                      '• FREE CAR — جائزة الفئة الملكية\n' +
                      '• AKHIL LINK — مكافأة دعوتك\n' +
                      '• AKHIL SERVICES — مكافآت خدمات أخيل\n' +
                      '• AKHIL FAMILY — هدية عائلتك\n' +
                      '• برامج الدعم والحماية\n\n' +
                      'مستويات الكباتن (نقاط من 100):\n' +
                      'كابتن/برثونة ⬅️ فريق أخيل ⬅️ قادة أخيل ⬅️ نخبة أخيل ⬅️ القائد الملكي ROYAL AKHIL.\n' +
                      'حد التشغيل المعتمد 1,000 جنيه، مع تنبيه عند 200 وإيقاف عند 100.',
                size: 20,
              }),
            ],
          }),

          // Section 6 & Deliverables
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: '5. مخرجات شركة التصميم ومعايير القبول', bold: true, size: 24, color: '1E1B4B' })],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'المخرجات المطلوبة من شركة Product Design:\n' +
                      '1. Product discovery workshop ومراجعة قواعد أخيل.\n' +
                      '2. Information Architecture كاملة.\n' +
                      '3. User Journey Maps للعميل والكابتن/البرثونة.\n' +
                      '4. User Flows لكل المسارات الأساسية والاستثناءات.\n' +
                      '5. Low-fidelity Wireframes.\n' +
                      '6. High-fidelity UI بالعربي والإنجليزي.\n' +
                      '7. Design System ومكتبة Components قابلة لإعادة الاستخدام.\n' +
                      '8. Interactive Prototype للمسارات الأساسية.\n' +
                      '9. Usability Testing على عينة مستخدمين وتقرير بالمشكلات والتعديلات.\n' +
                      '10. Developer Handoff منظم: القياسات، الحالات، المكونات، Assets، وتسميات الشاشات.\n' +
                      '11. ملفات Figma الأصلية كاملة وملكية أخيل لها.\n\n' +
                      'معيار قبول التصميم (Acceptance Criterion):\n' +
                      'لا يُعتبر التصميم مكتملًا بمجرد وجود شاشات جميلة. يُقبل العمل عندما يستطيع شخص لم يشارك في بناء أخيل فتح الـPrototype وفهم رحلة العميل والكابتن، وإكمال المسارات الرئيسية دون شرح شفهي، وعندما يستطيع فريق تطوير مستقل قراءة الملفات وفهم الحالات المطلوبة دون إعادة اكتشاف المنتج من الصفر.',
                size: 20,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outDocx1 = path.join('d:', '3altayer.app', 'AKHIL_PRD_UI_UX_Prototype_Specification.docx');
  const outDocx2 = path.join('d:', '3altayer.app', 'وثيقة_تصميم_المنتج_والنموذج_الأولي_أخيل_AKHIL.docx');
  fs.writeFileSync(outDocx1, buffer);
  fs.writeFileSync(outDocx2, buffer);
  console.log(`AKHIL DOCX files created successfully at: ${outDocx1}`);
}

createAkhilDoc().catch(console.error);
