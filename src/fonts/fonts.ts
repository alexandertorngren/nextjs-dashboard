import {
  Inter,
  Lusitana,
  Geist,
  Geist_Mono,
  Noto_Sans,
  Roboto,
  Funnel_Sans,
  Tauri,
  Oxygen,
} from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
});

export const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const funnelSans = Funnel_Sans({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-funnel-sans',
});

export const tauri = Tauri({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
});

export const oxygen = Oxygen({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-oxygen',
});
