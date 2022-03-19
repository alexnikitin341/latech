import { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getAllQuestions,
  getQuestion,
  postAnswer,
} from '../../helpers/request';
import styles from './Question.module.scss';

export default function Question() {
  const [question, setQuestion] = useState({});
  const [changedQuestionIndex, setChangeQuestionIndex] = useState();
  const [allQuestions, setAllQuestions] = useState([]);
  const [answer, setAnswer] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const ref = useRef();
  const { id } = useParams();

  const handleGetAllQuestions = async () => {
    setLoading(true);
    const data = await getAllQuestions();

    setAllQuestions(data.tasks);
    setLoading(false);
  };

  const handleGetQuestion = async (id) => {
    setLoading(true);

    const data = await getQuestion(id);

    if (data?.last_solution?.id) {
      setAnswer({ ...data.last_solution, last_solution: true });
    }

    setQuestion(data);
    setLoading(false);
  };

  const handleClickByImg = async (index) => {
    setLoading(true);
    const data = await postAnswer({
      text: question?.task?.options?.[index],
      id,
    });

    setAnswer(data);

    setLoading(false);
  };

  const goToNextQuestion = () => {
    const currentIndexQuestion = allQuestions.findIndex(
      (question) => +question.id === +id
    );

    if (
      currentIndexQuestion + 1 &&
      currentIndexQuestion !== allQuestions.length - 1
    ) {
      const nextQuestionId = currentIndexQuestion + 1;
      setAnswer();
      navigate(`/question/${allQuestions[nextQuestionId].id}`);
    } else {
      setAnswer();
      navigate(`/rating`);
    }
  };

  useEffect(() => {
    handleGetAllQuestions();
    handleGetQuestion(id);
  }, [id]);

  useEffect(() => {
    if (ref.current) {
      const imgs = ref.current.getElementsByTagName('figure');
      for (let index = 0; index < imgs.length; index++) {
        const img = imgs[index];
        img.addEventListener('click', () => handleClickByImg(index));
      }
    }
  }, [question]);

  if (loading) {
    return <div className={styles.container}> ...loading</div>;
  }

  return (
    <div className={styles.container}>
      {!answer && (
        <div
          ref={ref}
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: question?.task?.description }}
        />
      )}
      <div className={styles.answer}>
        {answer ? (
          <>
            <div className={styles.description}>
              {(answer?.comments || []).map((comment, i) => {
                const isRught = changedQuestionIndex === +answer.text - 1;
                const className = isRught
                  ? changedQuestionIndex === i
                    ? styles.green
                    : ''
                  : changedQuestionIndex === i
                  ? styles.red
                  : styles.green;
                return (
                  <div className={`${styles.comment} ${className}`}>
                    {comment}
                  </div>
                );
              })}
            </div>
            <span>
              {allQuestions.findIndex((question) => +question.id === +id) + 1}
              /15
            </span>
            <button className={styles.button_green} onClick={goToNextQuestion}>
              {'->'}
            </button>
          </>
        ) : (
          question?.task?.options.map((el, i) => (
            <p key={`answers_${i}`} onClick={() => handleClickByImg(i)}>
              {el}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
