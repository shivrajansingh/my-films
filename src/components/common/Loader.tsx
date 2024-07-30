import React from 'react';
import Image from './Image';
const Loader: React.FC = () => {
  return (
    <div className="loader text-center">
        <Image src="/assets/images/loader.svg" alt="Loading..." />
    </div> 

  );
};

export default Loader;
