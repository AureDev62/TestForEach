import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Lost from './pages/Lost'
import HttpCode from './pages/HttpCode'
import NotFound from './pages/NotFound'


export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/lost' element={<Lost />} />
        <Route path='/:http_code' element={<HttpCode />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}
