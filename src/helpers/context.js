import React, { useState, useEffect, useContext, createContext } from 'react';
import { getAllQuestions } from './request';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetAllQuestions = async () => {
    setLoading(true);
    const { tasks } = await getAllQuestions();

    setAllQuestions(tasks);
    setLoading(false);
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
        loading,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
