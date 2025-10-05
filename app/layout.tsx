import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/header';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Spellbound',
	description: 'A word game.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1500px] mx-auto`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
