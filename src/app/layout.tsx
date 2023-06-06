import { Inter, Lexend } from 'next/font/google';
import './globals.css';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-lexend',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata = {
  title: 'MotorShop',
  description: 'O aplicativo que torna a compra e venda de carros mais fácil do que nunca.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${lexend.variable} ${inter.variable} antialiased font-lexend`}>{children}</body>
    </html>
  );
}
