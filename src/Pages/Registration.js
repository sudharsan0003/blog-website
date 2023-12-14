import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setProfileData } from '../utils/firebaseFunction';
import { storage, auth } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { UserConsumer } from '../context/userContext';

const Registration = () => {
  const { fetchProfileData } = UserConsumer();
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [number, setNumber] = useState();
  const [gender, setGender] = useState();
  const [imageURL, setImageURL] = useState();

  const onSubmit = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/home');
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          alert('Email already exist');
          navigate('/registration');
          toast.warning('Email already exist');
        }
      });
  };

  const getImageUrl = (event) => {
    const imageFile = event.target.files[0];

    const storageRef = ref(
      storage,
      `usersImage/${Date.now()}/${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            toast.info('Upload is Paused!');
            break;
          case 'running':
            toast.warning('Waiting for Image Upload!!');
            break;
        }
      },
      (error) => {
        console.log('Error', error);
        toast.error('Error... Try Again!');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          toast.success('Image Uploaded Successfully!');
        });
      }
    );
  };

  const formValidation = (e) => {
    e.preventDefault();
    if (userName && email && password && number && gender && imageURL) {
      if (number.length === 10) {
        const data = {
          id: Date.now(),
          userName,
          email,
          password,
          number,
          gender,
          image: imageURL,
        };
        setProfileData(data);
        fetchProfileData();
        onSubmit();
        clearFormInput();
      } else toast.warning('Enter valid phone number !');
    } else toast.warning('Input Field Is Mandatory !');
  };

  const clearFormInput = () => {
    setUserName('');
    setEmail('');
    setPassword('');
    setGender('');
    setNumber('');
    setImageURL('');
  };

  return (
    <div className='w-full'>
      <div className='border-[1px]  mt-4  w-[350px] mx-auto flex flex-col items-center text-white bg-gradient-to-r from-sky-400 to-indigo-400 rounded'>
        <div>
          <div className='w-full flex justify-center items-center heading mt-4'>
            Registration
          </div>
        </div>
        <div className=' text-white font-titleFont text-lg font-semibold px-6 py-2 flex justify-center items-center '>
          <div className='w-full flex flex-col justify-center items-center heading '>
            <form className='flex flex-col gap-2' onSubmit={formValidation}>
              <input
                type='text'
                name='name'
                placeholder='Username'
                className='w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none  text-black'
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
              <input
                type='email'
                name='email'
                placeholder='Email'
                className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none  text-black'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <input
                type='password'
                name='password'
                className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none  text-black'
                placeholder='Password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></input>

              <input
                type='number'
                name='Contact'
                className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none  text-black'
                placeholder='Contact'
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              ></input>

              <div className=''>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  id='gender'
                  placeholder='gender'
                  className='text-black font-medium text-md'
                >
                  <option defaultChecked>Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Women'>Women</option>
                  <option value='Other'>Other</option>
                </select>
              </div>

              <div className='signFrom-profilePic'>
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  id='image'
                  className='border w-[80%]'
                  onChange={(event) => getImageUrl(event)}
                />
              </div>

              <div className='flex justify-center items-center'>
                <button type='submit' className='border-2 px-3 mt-2 rounded-md'>
                  SignUp
                </button>
              </div>

              <div className='flex justify-center items-center'>
                Already have an account ?{'   '}
                <span>
                  <NavLink to='/' className='text-yellow-400 font-medium'>
                    Sign In
                  </NavLink>
                  <br />
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
