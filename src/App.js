import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from './helpers/context';
import Description from './pages/Description/Description';
import Finish from './pages/Finish/Finish';
import Home from './pages/Home/Home';
import Question from './pages/Question/Question';
import Rating from './pages/Rating/Rating';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/question/:id' element={<Question />} />
          <Route path='/rating' element={<Rating />} />
          <Route path='/description' element={<Description />} />
          <Route path='/finish' element={<Finish />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
