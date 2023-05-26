import React from "react";

export default function NonActiveScreen() {
  return (
    <div className='bg-black flex  h-full w-full'>
      <div className='m-20'>
        <img src='logo.webp' alt='' className='w-72' />
        <h1 className='text-white font-bold text-8xl max-w-xl my-5'>
          Welcome to Alpha Lion Trucking LLC
        </h1>
        <p className='text-white max-w-xl text-lg'>
          Largest USPS carrier on the west coast, with strongest presence on the
          I-5 Corridor, from Seattle Washington To Los Angelas, California,
          servicing Arizona, Nevada.{" "}
        </p>
      </div>
    </div>
  );
}
