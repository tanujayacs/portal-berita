import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke atas setiap kali pathname berubah
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Bisa diganti 'auto' untuk scroll instant
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;