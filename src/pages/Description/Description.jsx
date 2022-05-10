import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllQuestions } from '../../helpers/request';

import styles from './Description.module.scss';

export default function Description() {
  const [allQuestions, setAllQuestions] = useState([]);

  const navigate = useNavigate();

  const handleGetAllQuestions = async () => {
    const { tasks } = await getAllQuestions();
    if (tasks) {
      setAllQuestions(tasks);
    }
  };

  const handleStartGame = () => {
    const currenQuestionId = (allQuestions || []).find((el) => el?.solutions?.length === 0)?.id;
    const firstQuestion = currenQuestionId || allQuestions?.[0]?.id;

    navigate(`/question/${firstQuestion}`);
  };

  useEffect(() => {
    handleGetAllQuestions();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        Оксфорды, джоггеры, слипоны, слаксы — подобные поисковые запросы встречаются на Lamoda ежедневно.
        <br />
        <br />
        А знаешь ли ты, что представляют из себя эти fashion-термины?
        <br />
        <br />
        Проверь свои знания в нашей игре! Выбери из трех фото то, которое обозначает загаданное слово. Победят первые
        три участника, которые наберут больше всех ответов и окажутся быстрее всех.
      </div>

      <div className={styles.box}>
        <div className={styles.box_prize}>
          <p>Призы:</p>
          <span>
            В конце каждого дня конференции в 18:15 свяжемся со всеми победителями для вручения призов — брендированных
            рюкзаков
          </span>
        </div>

        <button className={styles.button_green} onClick={() => handleStartGame()}>
          ИГРАТЬ
        </button>
      </div>
    </div>
  );
}
