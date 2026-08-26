import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'أخيل | لوحة التحكم والعمليات المركزية (AKHIL Super Admin Hub)',
  description: 'Operations Radar, Pricing Management & Analytics Dashboard for AKHIL (أخيل — أبعد من طريق)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
