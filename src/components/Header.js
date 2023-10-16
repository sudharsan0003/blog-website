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
    <div className='w-full bg-blue-700  text-whiteText flex flex-row justify-between items-center gap-5 sticky top-0 z-50'>
      <div className=' px-4 py-3 flex flex-row items-center gap-5 '>
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
      <div>
        {userId ? (
          <>
            <div>
              <img
                className='w-[50px] h-[50px] rounded mt-[12px] flex justify-center items-center '
                src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                alt='logo'
              />
            </div>
            <p className='mt-[18px] ml-[5px] text-2xl text-white'>
              {user?.displayName}
            </p>
            <Link to='./login'>
              <p
                ClassName='text- text-4xl text-decor cursor-pointer text-'
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
