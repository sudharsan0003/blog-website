import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSearch } from 'react-icons/lu';

const Searchbar = ({ search, handleChange }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className='text-center'>
      {/* <div>Search</div> */}
      <form onSubmit={handleSubmit}>
        <div className='flex flex-row justify-center items-center mb-2'>
          <input
            type='text'
            value={search}
            placeholder='Search'
            onChange={handleChange}
            className='border-solid border-gray-600'
          />
          <LuSearch />
        </div>
      </form>
    </div>
  );
};

export default Searchbar;

/*

*/
