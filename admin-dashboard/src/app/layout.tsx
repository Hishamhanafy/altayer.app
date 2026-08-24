import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3altayer Admin (لوحة تحكم عالطاير)',
  description: 'Operations Radar & Management Dashboard for 3altayer.app',
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
