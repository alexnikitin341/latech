import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from './helpers/context';
import Description from './pages/Description/Description';
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
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
