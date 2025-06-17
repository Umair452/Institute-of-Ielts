import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lalamusa Institute of IELTS - Professional IELTS Training',
  description:
    'A premier language learning center in the heart of Lalamusa, dedicated to empowering individuals with the communication skills and test preparation they need to succeed globally.',
  keywords:
    'IELTS preparation Lalamusa, IELTS training Pakistan, IELTS coaching Gujrat, Spoken English classes Lalamusa, IELTS institute Pakistan, English language training, IELTS test preparation, Life Skills courses, PTE preparation, IELTS band 7 coaching, English speaking course Pakistan',
  robots: 'index,follow',
  metadataBase: new URL('http://instituteofielts.vercel.app/'),
  openGraph: {
    title: 'Lalamusa Institute of IELTS - Professional IELTS Training',
    description:
      'Professional IELTS training and English language courses in Lalamusa. Expert instructors, proven success rates, and comprehensive test preparation for your global success.',
    url: 'http://instituteofielts.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'http://instituteofielts.vercel.app/ielts-banner.png',
        width: 1200,
        height: 630,
        alt: 'Lalamusa Institute of IELTS',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
