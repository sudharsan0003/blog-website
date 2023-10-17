import React from 'react';
import { Link } from 'react-router-dom';
import { FaBlog } from 'react-icons/fa';

const Header = ({ active, setActive, handleLogout, user }) => {
  const userId = user?.uid;

  // const handleLogout = () => {
  //   signOut(auth).then(() => {
  //     setUser(null);
  //     setActive('login');
  //     navigate('/login');
  //   });
  // };

  return (
    <div className='w-full h-14 bg-blue-700  text-whiteText flex flex-row justify-between items-center gap-5 sticky top-0 z-50'>
      <div className=' px-4  flex flex-row items-center gap-5 '>
        <Link to='/'>
          <div className='headerHover flex flex-col text-white'>
            <FaBlog />
          </div>
        </Link>
        <Link to='/'>
          <div className='headerHover  mdl:inline-flex'>
            <p className='text-sm  text-white font-light flex flex-col'>Home</p>
          </div>
        </Link>
        <Link to='/create'>
          <div className='headerHover  mdl:inline-flex'>
            <p className='text-sm pl-2 text-white font-light flex flex-col'>
              Create
            </p>
          </div>
        </Link>
        <Link to='/about'>
          <div className='headerHover  mdl:inline-flex'>
            <p className='text-sm pl-2 text-white font-light flex flex-col'>
              About
            </p>
          </div>
        </Link>
      </div>
      <div className=' px-4  flex flex-row items-center justify-center gap-5 '>
        {userId ? (
          <>
            <div>
              <img
                className='w-[30px] h-[30px] rounded  flex justify-center items-center '
                src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                alt='logo'
              />
            </div>
            <p className='mt-[10px] -ml-[40px] text-m text-white flex justify-center items-center'>
              {user?.displayName}
            </p>
            <Link to='./login'>
              <p
                className='flex justify-center text-white headerHover no-underline'
                onClick={handleLogout}
              >
                Logout
              </p>
            </Link>
          </>
        ) : (
          <Link to='/login'>
            <div className='flex justify-center text-white headerHover'>
              <p>Login</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
