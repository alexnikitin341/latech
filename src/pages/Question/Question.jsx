import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestion, postAnswer } from '../../helpers/request';
import { useFormContext } from '../../helpers/context';
import styles from './Question.module.scss';
import arrowRight from '../../assets/arrow_right.svg';
import Loader from '../../components/Questions/Loader/Loader';

export default function Question() {
  const [question, setQuestion] = useState({});
  const [changedQuestionIndex, setChangeQuestionIndex] = useState();
  const { allQuestions, setCount } = useFormContext();
  const [answersWithImg, setAnswersWithImg] = useState([]);
  const [answer, setAnswer] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleGetQuestion = async (id) => {
    setLoading(true);

    const data = await getQuestion(id);

    if (data?.last_solution?.id) {
      setAnswer({ ...data.last_solution, last_solution: true });
    }

    setQuestion(data);
    setLoading(false);
  };

  const handleClickAnswer = async (index) => {
    setLoading(true);

    const data = await postAnswer({
      text: index,
      id,
    });

    setChangeQuestionIndex(index);

    setAnswer(data);

    setLoading(false);
  };

  const goToNextQuestion = () => {
    const currentIndexQuestion = (allQuestions || []).findIndex((question) => +question.id === +id);

    if (currentIndexQuestion + 1 && currentIndexQuestion !== allQuestions.length - 1) {
      const nextQuestionId = currentIndexQuestion + 1;
      setAnswer();
      navigate(`/question/${allQuestions[nextQuestionId].id}`);
    } else {
      setAnswer();
      navigate(`/finish`);
    }
  };

  useEffect(() => {
    handleGetQuestion(id);
    setCount((prev) => prev + 1);
  }, [id]);

  useEffect(() => {
    if (question?.task?.description && question?.task?.options) {
      const p = question?.task?.description.split('src="');
      const z = p.map((el) => el.split('">'));
      const srcs = z.reduce((acc, el, i) => {
        if (i === 0) {
          return acc;
        }
        return [...acc, el[0]];
      }, []);
      const res = question?.task?.options.map((option, i) => ({
        option,
        src: srcs[i],
      }));
      setAnswersWithImg(res);
    }
  }, [question]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <h2>{question?.task?.name}</h2>

      {answer ? (
        <div className={styles.answer}>
          <div className={styles.description}>
            {!answer?.comments && <p className={styles.plug}>На этот вопрос уже был дан ответ</p>}
            {(answer?.comments || []).map((comment, i) => {
              const rigthIndex = +answer?.right_answer;
              const isRight = rigthIndex === i;

              const className = isRight ? styles.green : i === changedQuestionIndex && styles.red;

              return (
                <div key={i} className={styles.comment_container}>
                  <div className={`${styles.comment} ${className}`}>{comment}</div>
                  <p className={`${styles.option} ${styles.option_comment}`}>{i + 1}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.next_question}>
            <span>
              {(allQuestions || []).findIndex((question) => +question.id === +id) + 1}
              /15
            </span>
            <button className={styles.button_green} onClick={goToNextQuestion}>
              <img src={arrowRight} alt='arrowRight' />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.answers_container}>
          {answersWithImg.map(({ src, option }, i) => (
            <div
              key={`answers_${i}`}
              className={`${styles.answer_box} ${i === 1 && styles.center}`}
            >
              <img src={src} alt={`img${option}`} onClick={() => handleClickAnswer(i)} />
              <p className={styles.option} onClick={() => handleClickAnswer(i)}>
                {option}
              </p>
            </div>
          ))}
          <span>
            {(allQuestions || []).findIndex((question) => +question.id === +id) + 1}
            /15
          </span>
        </div>
      )}
    </div>
  );
}
