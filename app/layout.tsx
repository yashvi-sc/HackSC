import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import ThemeProvider from '@/providers/theme-provider';
import { Navbar } from '@/components/shared/navbar';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/shared/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nextjs fullstack Authentication',
  description: 'Sign-Up and Sign-In with Nextjs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html suppressHydrationWarning lang="en">
        <body className={inter.className}>
          <div
            className="absolute inset-0 -z-10 h-full w-full"
            style={{
              backgroundImage: 'url(/bg.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top center',
              backgroundSize: 'cover',
            }}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="min-h-screen pt-16">
              {session ? (
                <SidebarProvider>
                  <AppSidebar />
                  <main
                    className="w-full mx-auto overflow-y-hidden "
                    style={{
                      backgroundImage: 'url(/bg.jpg)',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'top center',
                      backgroundSize: 'cover',
                    }}
                  >
                    {children}
                  </main>
                </SidebarProvider>
              ) : (
                <main
                  className="w-full mx-auto overflow-y-hidden "
                  style={{
                    backgroundImage: 'url(/bg.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top center',
                    backgroundSize: 'cover',
                  }}
                >
                  {children}
                </main>
              )}
            </div>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
