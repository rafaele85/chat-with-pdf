import {GlobeIcon, ZapIcon,} from 'lucide-react';
import Link from 'next/link';
import {Button,} from '@/components/ui/button';
import Image from 'next/image';
import profilePic from '../../public/images/VciRSTI.jpeg';

const features = [
  {
    name: 'Store your PDF Documents',
    description: 'Keep all your important PDF files securely stored and easily accessible anytime anywhere.',
    icon: GlobeIcon,
  },
  {
    name: 'Blazing fast responses',
    description: 'Experience lightning-fast answers to your queries, ensuring you get the information you need instantly.',
    icon: ZapIcon,
  },
];

export default function Home () {
  return (
    <main className={'bg-gradient-to-bl from-white to-indigo-600 flex-1 overflow-scroll p-[8px]'}>
      <h1>Under construction app: Query PDF</h1>
      <div className={'bg-[white] py-24 sm:py-32 rounded-md drop-shadow-xl'}>
        <div className={'flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8'}>
          <div className={'mx-auto max-w-[672px] sm:text-center'}>
            <h2 className={'text-base font-semibold leading-[28px] text-indigo-[rgb(79 70 229 1)]'}>
              Your interactive document companion
            </h2>
            <p className={'mt-2 text-3xl font-bold tracking-tight text-gray-[rgb(17 24 39 1)] sm:text-6xl'}>
              Transform your PDFs into Interactive Conversations
            </p>
            <p className={'mt-6 text-lg leading-[32px] text-gray-600'}>
              Introducing{' '}
              <span className={'font-bold text-indigo-600'}> Chat with PDF. </span>
              <br/>
              <br/>
              Upload your document, and our chatbot will answer questions, summarize content, and answer your Qs.
              Ideal for everyone, <span className={'font-bold text-indigo-600'}>Chat with PDF</span>
            </p>
            {' '}
            turns static documents into {' '}
            <span className={'font-bold'}>dynamic conversations</span>, enhancing productivity 10x fold effortlessly.
          </div>
          <Button asChild className={'mt-10'}>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
        <div className={'overflow-hidden pt-[64px]'}>
          <div className={'mx-auto max-w-7xl'}>
            <Image
              src={profilePic}
              alt={'App screenshot'}
              width={2432}
              height={1442}
              className={'mb-[-0%] rounded-xl shadow-2xl ring-1 ring-gray-900/10'}
            />
            <div aria-hidden={true} className={''}>
              <div className={'--inset-x-32 bg-gradient-to-t from-white/95 pt-[5%] text-black text-3xl'}/>
            </div>
          </div>
        </div>
        <div>
          <dl>
            {features.map((item) => (
              <div key={item.name}>
                <dt className={'inline font-semibold text-gray-900'}>
                  <item.icon
                    aria-hidden={true}
                    className={'text-indigo-600'}
                  />
                </dt>
                <dd>
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
