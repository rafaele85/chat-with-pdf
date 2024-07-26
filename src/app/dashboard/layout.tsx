import React from 'react';
import {ClerkLoaded,} from '@clerk/nextjs';
import {Header,} from '@/components/Header';

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({children,}) => {
  return (
    <ClerkLoaded>
      <div className={'flex-1 flex flex-col h-screen '}>
        <Header />
        <main className={'flex-1 overflow-auto'}>
          {children}
        </main>
      </div>
    </ClerkLoaded>
  );
};


export default Layout;