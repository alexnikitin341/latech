import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../helpers/context';
import eyes from '../../assets/eyes.png';
import stars from '../../assets/stars.png';

import styles from './Finish.module.scss';

export default function Finish() {
  const { allQuestions } = useFormContext();
  const quantityRightQuestion = 14;
  const navigate = useNavigate();

  const handleRating = () => {
    navigate(`/rating`);
  };

  return (
    <div className={styles.container}>
      <h1>У тебя {quantityRightQuestion} правильных ответов!</h1>
      <p>
        Супер! Теперь ты можешь посмотреть, где находишься в рейтинге среди
        остальных участников игры
      </p>
      <button className={styles.button_green} onClick={() => handleRating()}>
        <img src={eyes} alt='eyes' />
        рейтинг
      </button>
      <img className={styles.stars} src={stars} alt='stars' />
    </div>
  );
}
