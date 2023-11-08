import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Barlow_Condensed, Lato } from "next/font/google";

import { DefaultLayout } from '@/layouts';
 
import './globals.css'

const barlow_condensed = Barlow_Condensed({
  weight: ['100', '300', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow-condensed'
});

const lato = Lato({
  weight: ['100', '300', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato'
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
 
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ??
    ((page) => <DefaultLayout>{page}</DefaultLayout>);
 
  return (
    <UserProvider>
      {getLayout(
        <main className={`${barlow_condensed.variable} ${lato.variable}`}>
          <Component {...pageProps} />
        </main>
      )}
    </UserProvider>
  );
}
