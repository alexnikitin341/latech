import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestion, postAnswer } from '../../helpers/request';
import { useFormContext } from '../../helpers/context';
import styles from './Question.module.scss';
import arrowRight from '../../assets/arrow_right.svg';

const answerInitial = {
  status: 'success',
  solution: {
    id: 42,
    task_id: 7,
    team_id: 14,
    user_id: 19,
    title: null,
    text: '1',
    goal: null,
    file: null,
    created_at: '2022-03-13T10:55:35.000000Z',
    updated_at: '2022-03-19T13:43:31.000000Z',
    score: 1,
    start_at: '2022-03-13 13:55:35',
    end_at: '2022-03-19T13:43:31.903006Z',
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
    '1. \u0421\u043d\u0443\u0434 \u0438\u043b\u0438 \u0448\u0430\u0440\u0444-\u0442\u0440\u0443\u0431\u0430, \u0448\u0430\u0440\u0444-\u0445\u043e\u043c\u0443\u0442 \u2014 \u0438\u0437\u0434\u0435\u043b\u0438\u0435 \u0432 \u0444\u043e\u0440\u043c\u0435 \u043a\u043e\u043b\u044c\u0446\u0430, \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u043e\u0435/\u0441\u0448\u0438\u0442\u043e\u0435 \u043f\u043e \u043a\u0440\u0443\u0433\u0443. \u041d\u0430\u0434\u0435\u0432\u0430\u0435\u0442\u0441\u044f \u0447\u0435\u0440\u0435\u0437 \u0433\u043e\u043b\u043e\u0432\u0443.',
    '2.  \u0421\u043a\u043e\u0440\u0442 \u2014 \u044d\u0442\u043e \u044e\u0431\u043a\u0430-\u0448\u043e\u0440\u0442\u044b.',
    '3.  \u041a\u0430\u043d\u043e\u0442\u044c\u0435 - \u0444\u0440\u0430\u043d\u0446\u0443\u0437\u0441\u043a\u0430\u044f \u0441\u043e\u043b\u043e\u043c\u0435\u043d\u043d\u0430\u044f \u0448\u043b\u044f\u043f\u0430 \u0436\u0451\u0441\u0442\u043a\u043e\u0439 \u0444\u043e\u0440\u043c\u044b \u0441 \u0446\u0438\u043b\u0438\u043d\u0434\u0440\u0438\u0447\u0435\u0441\u043a\u043e\u0439 \u0442\u0443\u043b\u044c\u0451\u0439 \u0438 \u043f\u0440\u044f\u043c\u044b\u043c\u0438, \u0434\u043e\u0432\u043e\u043b\u044c\u043d\u043e \u0443\u0437\u043a\u0438\u043c\u0438 \u043f\u043e\u043b\u044f\u043c\u0438.',
  ],
};

export default function Question() {
  const [question, setQuestion] = useState({});
  const [changedQuestionIndex, setChangeQuestionIndex] = useState();
  const { allQuestions } = useFormContext();
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
      // text: question?.task?.options?.[index],
      text: index,
      id,
    });

    setChangeQuestionIndex(index);

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
    handleGetQuestion(id);
  }, [id]);

  useEffect(() => {
    if (question?.task?.description && question?.task?.options) {
      const srcs = question?.task?.description.match(
        /(?<=src=")([\s\S]+?)(?=")/g
      );
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
            {!answer?.comments && (
              <p className={styles.plug}>На этот вопрос уже был дан ответ</p>
            )}
            {(answer?.comments || []).map((comment, i) => {
              const rigthIndex = +answer?.solution?.text - 1;
              const isRight = rigthIndex === i;

              const className = isRight
                ? styles.green
                : i === changedQuestionIndex && styles.red;

              return (
                <div className={styles.comment_container}>
                  <div className={`${styles.comment} ${className}`}>
                    {comment}
                  </div>

                  <p className={styles.option}>{answersWithImg?.[i]?.option}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.next_question}>
            <span>
              {allQuestions.findIndex((question) => +question.id === +id) + 1}
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
              <img
                src={src}
                alt={`img${option}`}
                onClick={() => handleClickAnswer(i)}
              />
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
