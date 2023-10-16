import React from 'react';
import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { ref } from 'firebase/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';

const initialState = {
  title: '',
  tags: [],
  trending: 'no',
  category: '',
  description: '',
};

const categoryOption = [
  'Fashion',
  'Technology',
  'Food',
  'Politics',
  'Sports',
  'Business',
];

const EditPage = ({ user }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { title, tags, category, trending, description } = form;

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info('Image upload to firebase successfully');
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      try {
        await addDoc(collection(db, 'blogs'), {
          ...form,
          timestamp: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='container-fluid mb-4'>
      <div className='container'>
        <div className='col-12'>
          <div className='text-center heading py-2'>Create Blog</div>
        </div>
        <div className='row h-100 justify-center align-items-center'>
          <div className='col-10 col-md-8 col-lg-6'>
            <form className='row blog-form ' onSubmit={handleSubmit}>
              <div className='col-12 py-3'>
                <input
                  type='text'
                  className='w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput text-black'
                  placeholder='Title'
                  name='title'
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className='col-12 py-3'>
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className='catg-dropdown'
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ''} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-12 py-3'>
                <textarea
                  className='form-control description-box'
                  placeholder='Description'
                  value={description}
                  name='description'
                  onChange={handleChange}
                />
              </div>
              <div className='mb-3'>
                <input
                  type='file'
                  className='form-control'
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className='col-12 py-3 text-center'>
                <button
                  className='btn btn-add'
                  type='submit'
                  disabled={progress !== null && progress < 100}
                >
                  {/* {id ? 'Update' : 'Submit'} */}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
