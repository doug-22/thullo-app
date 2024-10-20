'use client';

import Header from '@/_components/Header';
import { ReactNode, useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main>
      {isClient && (
        <>
          <Header />
          <section className="h-screen-dash p-5">{children}</section>
        </>
      )}
    </main>
  );
}
