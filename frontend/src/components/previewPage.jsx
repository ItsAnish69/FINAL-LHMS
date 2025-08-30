import React, { useEffect } from 'react'
import Navbar from './navbar';
import Banner from './Banner2';
import Footer from './footer';

const PreviewPage = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <Navbar />
      <Banner />
      <Footer />
    </>
  )
} 

export default PreviewPage;
