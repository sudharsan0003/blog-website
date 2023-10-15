import React from 'react';
import { Link } from 'react-router-dom';
import { FaBlog } from 'react-icons/fa';

const Header = () => {
  return (
    <div className='w-full bg-blue-700  text-whiteText flex flex-row justify-between items-center gap-5 sticky top-0 z-50'>
      <div className=' px-4 py-3 flex flex-row items-center gap-5 '>
        <Link to='/'>
          <div className='headerHover flex flex-col'>
            <FaBlog />
          </div>
        </Link>
        <Link to='/'>
          <div className='headerHover hidden mdl:inline-flex'>
            <p className='text-sm pl-2 text-lightText font-light flex flex-col'>
              Home
            </p>
          </div>
        </Link>
        <Link to='/create'>
          <div className='headerHover hidden mdl:inline-flex'>
            <p className='text-sm pl-2 text-lightText font-light flex flex-col'>
              Create
            </p>
          </div>
        </Link>
        <Link to='/about'>
          <div className='headerHover hidden mdl:inline-flex'>
            <p className='text-sm pl-2 text-lightText font-light flex flex-col'>
              About
            </p>
          </div>
        </Link>
      </div>
      <Link to='/login'>
        <div className='flex justify-center headerHover'>
          <p>Login</p>
        </div>
      </Link>
    </div>
  );
};

export default Header;
