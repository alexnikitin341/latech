import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../helpers/context';

import styles from './Description.module.scss';

export default function Description() {
  const { allQuestions } = useFormContext();
  const navigate = useNavigate();

  const handleStartGame = () => {
    const firstQuestion = allQuestions?.[0]?.id || 5;
    navigate(`/question/${firstQuestion}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        Оксфорды, джоггеры, слипоны, слаксы — подобные поисковые запросы
        встречаются на Lamoda ежедневно.
        <br />
        <br />
        А знаешь ли ты, что представляют из себя эти fashion-термины?
        <br />
        <br />
        Проверь свои знания в нашей игре! Выбери из трех фото то, которое
        обозначает загаданное слово. Победят первые три участника, которые
        наберут больше всех ответов и окажутся быстрее всех.
      </div>

      <div className={styles.box}>
        <div className={styles.box_prize}>
          <p>Призы:</p>
          <span>
            В конце каждого дня конференции в 18:15 свяжемся со всеми
            победителями для вручения призов — брендированных рюкзаков
          </span>
        </div>

        <button
          className={styles.button_green}
          onClick={() => handleStartGame()}
        >
          ИГРАТЬ
        </button>
      </div>
    </div>
  );
}
