import React from 'react';

const Footer = () => {
  return (
    <div className='w-full bg-gray-500 text-whiteText '>
      <div className='w-full border-b-[1px] border-gray-500 '>
        <div className='max-w-5xl mx-auto text-gray-300 '>
          <div>
            <div className='w-full grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-6 md:place-items-center md:items-start p-4'>
              <div>
                <h3 className='font-titleFont text-white text-base font-semibold text-center mb-3'>
                  Get To Know Us
                </h3>
                <ul className='flex flex-col gap-2 font-bodyFont'>
                  <li className='footerLink'>Careers</li>
                  <li className='footerLink'> Blog</li>
                  <li className='footerLink'>About</li>
                  <li className='footerLink'>Investor</li>
                  <li className='footerLink'>Devices</li>
                </ul>
              </div>
              <div>
                <h3 className='font-titleFont text-white text-base font-semibold text-center  mb-3'>
                  Work With Us
                </h3>
                <ul className='flex flex-col gap-2 font-bodyFont'>
                  <li className='footerLink'>Sell Products</li>
                  <li className='footerLink'>Bussiness</li>
                  <li className='footerLink'>Become an Affiliate</li>
                  <li className='footerLink'>Advertise</li>
                  <li className='footerLink'>Hub</li>

                  <li className='footerLink'>Sell Apps</li>
                </ul>
              </div>
              <div>
                <h3 className='font-titleFont text-white text-base  text-end font-semibold ml-6 mb-3'>
                  Payment Products
                </h3>
                <ul className='flex flex-col gap-2 font-bodyFont'>
                  <li className='footerLink'>Bussiness Card</li>
                  <li className='footerLink'>Reward Point</li>
                  <li className='footerLink'>Reload Points</li>
                  <li className='footerLink'>Currencies</li>
                </ul>
              </div>
              <div>
                <h3 className='font-titleFont text-white text-end text-base  font-semibold -3'>
                  Let us Help
                </h3>
                <ul className='flex flex-col gap-2 font-bodyFont'>
                  <li className='footerLink'>Your Account</li>
                  <li className='footerLink'>Your Order</li>
                  <li className='footerLink'>Returns</li>
                  <li className='footerLink'>Replacement</li>
                  <li className='footerLink'>FAQ &Help</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='font-bodyFont text-white text-xs text-center flex flex-col justify-center p-3'>
        <p>Condition of use Privacy Notice</p>
        <p>© 1982-2023, Amazon.com,Inc.or.its affiliates</p>
      </div>
    </div>
  );
};

export default Footer;
