import React, { useState, useEffect, useContext, createContext } from 'react';
import { getAllQuestions } from './request';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleGetAllQuestions = async () => {
    setLoading(true);
    const { tasks } = await getAllQuestions();
    if (tasks) {
      setAllQuestions(tasks);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (allQuestions.length === 0) {
      handleGetAllQuestions();
    }
  }, [count]);

  return (
    <FormContext.Provider
      value={{
        allQuestions,
        setAllQuestions,
        loading,
        setCount,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
