import React, { useState, useEffect, useContext, createContext } from 'react';
import { getAllQuestions } from './request';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [allQuestions, setAllQuestions] = useState([]);

  const handleGetAllQuestions = async () => {
    const {tasks} = await getAllQuestions();

    setAllQuestions(tasks);
  };

  useEffect(() => {
    if (allQuestions.length === 0) {
      handleGetAllQuestions();
    }
  }, []);

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
