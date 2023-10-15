import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Detail from './pages/Detail';
import EditPage from './pages/EditPage';
import About from './pages/About';
import NoData from './pages/NoData';
import Header from './components/Header';
import Login from './pages/Login';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/create' element={<EditPage />} />
        <Route path='/update' element={<EditPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NoData />} />
      </Routes>
    </div>
  );
};

export default App;
