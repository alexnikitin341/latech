import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

export const FormContext = createContext();

// eslint-disable-next-line react/prop-types
export const FormProvider = ({ children }) => {
  const [allQuestions, setAllQuestions] = useState([]);

  return (
    <FormContext.Provider
      value={{
        allQuestions,
        setAllQuestions,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
