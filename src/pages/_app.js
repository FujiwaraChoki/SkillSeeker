import '@/styles/globals.css';
import 'regenerator-runtime/runtime';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <>
        <Head>
          <title>SkillSeeker - AI Recruiter</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </>
    );
  }
}