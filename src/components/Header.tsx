import Link from 'next/link';
import React from 'react';
import {SignedIn, UserButton,} from '@clerk/nextjs';
import {Button,} from '@/components/ui/button';
import {FilePlus2,} from 'lucide-react';

export const Header = () => {
  return (
    <div className={'flex justify-between bg-white shadow-sm p-5 border-b'}>
      <Link href={'/dashboard'} className={'text-xl2'}>
          Chat to <span className={'text-indigo-600'}>PDF</span>
      </Link>
      <SignedIn>
        <div className={'flex'}>
          <Button asChild variant={'link'} className={'hidden md:flex'}>
            <Link href={'/dashboard/upgrade'}>Pricing</Link>
          </Button>
          <Button asChild variant={'outline'} className={'hidden md:flex'}>
            <Link href={'/dashboard'}>My Documents</Link>
          </Button>
          <Button asChild variant={'outline'} className={'hidden md:flex'}>
            <FilePlus2 className="text-gray-400" />
          </Button>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};