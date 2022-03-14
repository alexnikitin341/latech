import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllNominations, getAllQuestions } from '../../helpers/request';
import styles from './Description.module.scss';

export default function Description() {
  const [allQuestion, setAllQuestions] = useState([]);
  const navigate = useNavigate();

  const handleStartGame = () => {
    const firstQuestion = allQuestion?.[0]?.id || 5;
    navigate(`/question/${firstQuestion}`);
  };

  const handleGetAllNominations = async () => {
    const data = await getAllNominations();
  };

  const handleGetAllQuestions = async () => {
    const data = await getAllQuestions();

    setAllQuestions(data);
  };

  useEffect(() => {
    handleGetAllQuestions();
    handleGetAllNominations();
  }, []);

  return (
    <div className={styles.container}>
      Description
      <button className={styles.button_green} onClick={() => handleStartGame()}>
        ИГРАТЬ
      </button>
    </div>
  );
}
