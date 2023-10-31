import React from 'react';
import { useState, useEffect } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  onSnapshot,
  query,
  where,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase';
import BlogSection from '../components/BlogSection';
import Spinner from '../components/spinner';
import { toast } from 'react-toastify';
import { isEmpty, isNull } from 'lodash';
import Trending from '../components/Trending';
import Footer from '../components/Footer';
import Searchbar from '../components/Searchbar';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);
  const [hide, setHide] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const queryString = useQuery();
  const searchQuery = queryString.get('searchQuery');
  const location = useLocation();

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, 'blogs');
    const trendQuery = query(blogRef, where('trending', '==', 'yes'));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();
    const unsub = onSnapshot(
      collection(db, 'blogs'),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get('tags'));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
        setLoading(false);
        setActive('home');
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      getTrendingBlogs();
    };
  }, []);

  const searchBlogs = async () => {
    const blogRef = collection(db, 'blogs');
    const searchTitleQuery = query(blogRef, where('title', '==', searchQuery));

    const titleSnapshot = await getDocs(searchTitleQuery);

    let searchTitleBlogs = [];

    titleSnapshot.forEach((doc) => {
      searchTitleBlogs.push({ id: doc.id, ...doc.data() });
    });
    setBlogs(searchTitleBlogs);
  };

  useEffect(() => {
    if (!isNull(searchQuery)) {
      searchBlogs();
    }
  }, [searchQuery]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure wanted to delete that blog ?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'blogs', id));
        toast.success('Blog deleted successfully');
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getBlogs = async () => {
    const blogRef = collection(db, 'blogs');
    console.log(blogRef);
    const blogsQuery = query(blogRef, orderBy('title'));
    // const firstFour = query(blogRef, orderBy('title'), limit(4));
    const docSnapshot = await getDocs(blogsQuery);
    setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // const searchBlogs = async () => {
  //   const blogRef = collection(db, 'blogs');
  //   const searchTitleQuery = query(blogRef, where('title', '==', searchQuery));
  //   const searchTagQuery = query(
  //     blogRef,
  //     where('tags', 'array-contains', searchQuery)
  //   );
  //   const titleSnapshot = await getDocs(searchTitleQuery);
  //   const tagSnapshot = await getDocs(searchTagQuery);

  //   let searchTitleBlogs = [];
  //   let searchTagBlogs = [];
  //   titleSnapshot.forEach((doc) => {
  //     searchTitleBlogs.push({ id: doc.id, ...doc.data() });
  //   });
  //   tagSnapshot.forEach((doc) => {
  //     searchTagBlogs.push({ id: doc.id, ...doc.data() });
  //   });
  //   const combinedSearchBlogs = searchTitleBlogs.concat(searchTagBlogs);
  //   setBlogs(combinedSearchBlogs);
  //   setHide(true);
  //   setActive('');
  // };

  const handleChange = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      console.log('test');
      getBlogs();
      setHide(false);
    }
    setSearch(value);
  };

  return (
    <div className=' pt-4 '>
      <div className='container-padding'>
        <div className='row mx-0'>
          <Trending blogs={trendBlogs} />
        </div>
        <div>
          <div className=' mt-20  text-black text-2xl text-center font-bold py-2 mb-4 '>
            Daily <span className='text-orange-500'>B</span>logs{' '}
            <span className='text-orange-500'>...</span>
          </div>
          <Searchbar search={search} handleChange={handleChange} />
          <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
