import React from "react";

export default function Footer() {
  return (
    <footer className='mt-2 py-6 dark:bg-gray-100 dark:text-gray-900 bg-black text-white'>
      <div className='container px-6 mx-auto space-y-6 divide-y dark:divide-gray-600 md:space-y-12 divide-opacity-50'>
        <div className='grid justify-center pt-6 lg:justify-between'>
          <div className='flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6'>
            <span>©2025 All rights reserved</span>
            <a rel='noopener noreferrer' to='#'>
              <span>Privacy policy</span>
            </a>
            <a rel='noopener noreferrer' to='#'>
              <span>Terms of service</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
