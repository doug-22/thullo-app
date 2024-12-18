import ClientLayout from '@/_layouts/clientLayout';
import '@coreui/coreui/dist/css/coreui.min.css';
import { Provider } from 'jotai';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Thullo App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-custom-bg-color ${roboto.className}`}>
        <Provider>
          <ClientLayout>{children}</ClientLayout>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
