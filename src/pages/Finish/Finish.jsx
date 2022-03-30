import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../helpers/context';
import eyes from '../../assets/eyes.png';
import stars from '../../assets/stars.png';

import styles from './Finish.module.scss';
import { useEffect } from 'react';

export default function Finish() {
  const { allQuestions, loading, setCount } = useFormContext();
  const quantityRightQuestion = allQuestions.filter((el) => Number(el?.solutions?.[0]?.score)).length;
  const navigate = useNavigate();

  const handleRating = () => {
    navigate(`/rating`);
  };

  useEffect(() => {
    setCount((prev) => prev + 1);
  }, []);

  if (loading) {
    return <div className={styles.container}>...loading</div>;
  }
  return (
    <div className={styles.container}>
      <h1>У тебя {14} правильных ответов!</h1>
      <p>Супер! Теперь ты можешь посмотреть, где находишься в рейтинге среди остальных участников игры</p>
      <button className={styles.button_green} onClick={() => handleRating()}>
        <img src={eyes} alt='eyes' />
        рейтинг
      </button>
      <img className={styles.stars} src={stars} alt='stars' />
    </div>
  );
}
