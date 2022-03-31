import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestion, postAnswer } from '../../helpers/request';
import { useFormContext } from '../../helpers/context';
import styles from './Question.module.scss';
import arrowRight from '../../assets/arrow_right.svg';
const mockAnswer = {
  status: 'success',
  solution: {
    id: 479,
    task_id: 5,
    team_id: 61,
    user_id: 58,
    title: null,
    text: '0',
    goal: null,
    file: null,
    created_at: '2022-03-31T16:26:25.000000Z',
    updated_at: '2022-03-31T16:36:46.000000Z',
    score: 0,
    start_at: '2022-03-31 19:26:25',
    end_at: '2022-03-31T16:36:46.780201Z',
    language: null,
    left_screen: 0,
    video_id: null,
    starred: null,
    potential: null,
    ready_leader: null,
    deleted_at: null,
    link_to_project: null,
    file_download: null,
  },
  comments: [
    '1. \u0414\u0415\u0420\u0411\u0418 \u2014 \u0442\u0443\u0444\u043b\u0438 \u0441 \u043e\u0442\u043a\u0440\u044b\u0442\u043e\u0439 \u0448\u043d\u0443\u0440\u043e\u0432\u043a\u043e\u0439, \u0432 \u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u0431\u043e\u043a\u043e\u0432\u044b\u0435 \u0441\u0442\u043e\u0440\u043e\u043d\u044b \u043d\u0430\u0448\u0438\u0442\u044b \u043f\u043e\u0432\u0435\u0440\u0445 \u043f\u0435\u0440\u0435\u0434\u043d\u0435\u0439 \u0447\u0430\u0441\u0442\u0438 (\u0431\u0435\u0440\u0446\u044b \u043d\u0430\u0448\u0438\u0442\u044b \u043f\u043e\u0432\u0435\u0440\u0445 \u0441\u043e\u044e\u0437\u043a\u0438).',
    '2. \u0427\u0418\u041d\u041e\u0421 \u2014 \u0441\u0432\u043e\u0431\u043e\u0434\u043d\u044b\u0435 \u043c\u044f\u0433\u043a\u0438\u0435 \u0448\u0442\u0430\u043d\u044b \u0438\u0437 \u043f\u0440\u043e\u0447\u043d\u043e\u0433\u043e \u043b\u0435\u0433\u043a\u043e\u0433\u043e \u0445\u043b\u043e\u043f\u043a\u0430 \u0438\u043b\u0438 \u043b\u044c\u043d\u0430.',
    '3. \u0427\u0415\u0421\u041b\u0418 \u2014 \u043a\u043e\u0436\u0430\u043d\u044b\u0435 \u0431\u043e\u0442\u0438\u043d\u043a\u0438 \u0432\u044b\u0441\u043e\u0442\u043e\u0439 \u0434\u043e \u043b\u043e\u0434\u044b\u0436\u043a\u0438, \u0441 \u0442\u043e\u043d\u043a\u043e\u0439 \u043f\u043e\u0434\u043e\u0448\u0432\u043e\u0439, \u0447\u0443\u0442\u044c \u0437\u0430\u043e\u0441\u0442\u0440\u0435\u043d\u043d\u044b\u043c \u0438 \u0441\u043a\u0440\u0443\u0433\u043b\u0435\u043d\u043d\u044b\u043c \u043d\u043e\u0441\u043a\u043e\u043c. \u0425\u0430\u0440\u0430\u043a\u0442\u0435\u0440\u043d\u043e\u0435 \u0440\u043e\u0434\u043e\u0432\u043e\u0435 \u043e\u0442\u043b\u0438\u0447\u0438\u0435 \u2013 \u0432\u0441\u0442\u0430\u0432\u043a\u0438 \u0438\u0437 \u0440\u0435\u0437\u0438\u043d\u044b \u043f\u043e \u0431\u043e\u043a\u0430\u043c, \u0438\u0434\u0443\u0449\u0438\u0435 \u043e\u0442 \u0441\u0430\u043c\u043e\u0433\u043e \u0432\u0435\u0440\u0445\u0430 \u0431\u043e\u0442\u0438\u043d\u043a\u0430 \u043f\u043e\u0447\u0442\u0438 \u0434\u043e \u043f\u043e\u0434\u043e\u0448\u0432\u044b.',
  ],
  right_answer: 2,
};
export default function Question() {
  const [question, setQuestion] = useState({});
  const [changedQuestionIndex, setChangeQuestionIndex] = useState();
  const { allQuestions, setCount } = useFormContext();
  const [answersWithImg, setAnswersWithImg] = useState([]);
  const [answer, setAnswer] = useState();
  const [loading, setLoading] = useState(false);
  console.log('---answer', answer);
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
      const srcs = question?.task?.description.match(/(?<=src=")([\s\S]+?)(?=")/g);
      const res = question?.task?.options.map((option, i) => ({
        option,
        src: srcs[i],
      }));
      setAnswersWithImg(res);
    }
  }, [question]);

  if (loading) {
    return <div className={styles.container}> ...loading</div>;
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
                  <p className={`${styles.option} ${styles.option_comment}`}>{i+1}</p>
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
            <div key={`answers_${i}`} className={`${styles.answer_box} ${i === 1 && styles.center}`}>
              <img src={src} alt={`img${option}`} onClick={() => handleClickAnswer(i)} />
              <p className={styles.option} onClick={() => handleClickAnswer(i)}>
                {option}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
