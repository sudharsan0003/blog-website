// import React, { useEffect } from "react";

import { Link } from 'react-router-dom';
import { short } from '../utility';

import '../../src/index.css';
import { MdRestoreFromTrash } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

const BlogSection = ({ blogs, user, handleDelete }) => {
  const userId = user?.uid;
  return (
    <div className=' w-full flex justify-center items-center'>
      <div className='blog-heading text-start py-2 mb-4 p-8 grid grid-cols-2 gap-x-36 gap-y-10  w-[90%] '>
        {blogs?.map((item) => (
          <div className='row pb-4 border-[1px] border-blue-200 ' key={item.id}>
            <div className='col-md-5'>
              <div className='hover-blogs-img'>
                <div className='h-60 w-52 overflow-hidden mt-4 -ml-2'>
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className='h-60 w-52 overflow-hidden'
                  />
                  <div></div>
                </div>
              </div>
            </div>
            <div className='col-md-7  '>
              <div className='text-start ml-5'>
                <h6 className='category category-color'>{item.category}</h6>
                <span className='title py-2'>{item.title}</span>
                <span className='meta-info'>
                  <p className='author'>{item.author}</p>
                  {item.timestamp.toDate().toDateString()}
                </span>
              </div>
              <div className='short-description ml-5'>
                {short(item.description, 120)}
              </div>
              <Link to={`/detail/${item.id}`}>
                <button className='w-2/4 ml-5  py-1.5 text-sm text-white font-semibold rounded-sm bg-[#4287f5]  '>
                  Read More
                </button>
              </Link>
              {user?.uid && item.userId === user.uid && (
                <div className='float-right flex gap-4 mt-2'>
                  <MdRestoreFromTrash
                    name='trash'
                    style={{ cursor: 'pointer' }}
                    size='22px'
                    onClick={() => handleDelete(item.id)}
                  />
                  <Link to={`/update/${item.id}`}>
                    <FiEdit
                      name='edit'
                      style={{ cursor: 'pointer' }}
                      size='20px'
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
