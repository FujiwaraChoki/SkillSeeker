import '@/styles/globals.css';
import 'regenerator-runtime/runtime';

import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }) {
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