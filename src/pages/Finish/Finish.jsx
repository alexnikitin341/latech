import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import eyes from '../../assets/eyes.png';
import stars from '../../assets/stars.png';
import { getAllQuestions } from '../../helpers/request';
import Loader from '../../components/Questions/Loader/Loader';
import styles from './Finish.module.scss';

export default function Finish() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const quantityRightQuestion = allQuestions.filter((el) => Number(el?.solutions?.[0]?.score)).length;
  const navigate = useNavigate();

  const handleGetAllQuestions = async () => {
    setLoading(true);
    const { tasks } = await getAllQuestions();
    if (tasks) {
      setAllQuestions(tasks);
    }
    setLoading(false);
  };

  const handleRating = () => {
    navigate(`/rating`);
  };

  useEffect(() => {
    handleGetAllQuestions();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <h1>
        У тебя {quantityRightQuestion} {quantityRightQuestion === 1 ? 'правильный ответ' : 'правильных ответов'} !
      </h1>
      <p>Супер! Теперь ты можешь посмотреть, где находишься в рейтинге среди остальных участников игры</p>
      <button className={styles.button_green} onClick={() => handleRating()}>
        <img src={eyes} alt='eyes' />
        рейтинг
      </button>
      <img className={styles.stars} src={stars} alt='stars' />
    </div>
  );
}
