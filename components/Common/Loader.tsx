import React from 'react';
// import styles from './Loader.module.css'; // Optional if using CSS Modules
import logoSrc from "../../public/assets/arivom-logo-latest.gif"
import Image from 'next/image';
const Loader = () => {
  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white">
       <Image src={logoSrc} alt="Arivom Logo" width={250} height={250} />
      {/* <img src {logoSrc} alt="Loading..." className="w-16 h-16 mb-4" /> */}
      <p className="text-gray-600 text-lg">Loading...</p>
    </div>
  );
};

export default Loader;
