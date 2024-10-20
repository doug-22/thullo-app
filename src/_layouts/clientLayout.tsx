'use client';

import { modalAtom } from '@/_atoms/modal-atom';
import BackgroundModal from '@/_components/BackgroundModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const modal = useAtomValue(modalAtom);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {children} {modal.title && <BackgroundModal />}
      </div>
    </QueryClientProvider>
  );
}
