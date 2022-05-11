import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GAME_ID } from '../../helpers/consts';
import { getMyContests, joinToContest } from '../../helpers/request';
import { useFormContext } from '../../helpers/context';
import home_img from '../../assets/home_img.png';
import latech_img from '../../assets/latech.png';
import questions_img from '../../assets/questions.png';
import Loader from '../../components/Questions/Loader/Loader';
import styles from './Home.module.scss';

export default function Home() {
  const { allQuestions, loading, setLoading } = useFormContext();

  const [token, setToken] = useState();
  const loaction = useLocation();
  const navigate = useNavigate();

  const queryToken = new URLSearchParams(loaction.search).get('token');

  useEffect(() => {
    if (queryToken) {
      localStorage.setItem('tokenId', queryToken);
      navigate('/');
    }
  }, [queryToken, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('tokenId');
    setToken(token);
  }, []);

  const handleStartGame = async () => {
    setLoading(true);

    if (token) {
      const data = await getMyContests();
      const isJoin = data.contests.some(({ id }) => id === GAME_ID);

      if (!isJoin) {
        await joinToContest();
      }
      const isFinished = allQuestions?.length > 0 && allQuestions.every((el) => el?.solutions?.length > 0);

      if (isFinished) {
        return navigate('/finish');
      }

      return navigate('/description');
    }

    const authDomen = process.env.REACT_APP_AUTH_DOMEN;
    const authLink = `${authDomen}auth?redirect_to=${process.env.REACT_APP_URL}/description`;
    window.location.href = authLink;

    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <img className={styles.latech_img} src={latech_img} alt='latech_img' />
      <img className={styles.questions_img} src={questions_img} alt='questions_img' />
      <div className={styles.box}>
        <img className={styles.home_img} src={home_img} alt='home_img' />
        <button className={styles.button_green} onClick={() => handleStartGame()}>
          играть
        </button>
      </div>
    </div>
  );
}
