import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GAME_ID } from '../../helpers/consts';
import { getMyContests, joinToContest } from '../../helpers/request';
import home_img from '../../assets/home_img.png';
import latech_img from '../../assets/latech.png';
import questions_img from '../../assets/questions.png';

import styles from './Home.module.scss';

export default function Home() {
  const [token, setToken] = useState();

  const loaction = useLocation();
  const navigate = useNavigate();

  const queryToken = new URLSearchParams(loaction.search).get('token');

  useEffect(() => {
    if (queryToken) {
      localStorage.setItem('tokenId', queryToken);
      navigate('/');
    }
  }, [queryToken]);

  useEffect(() => {
    const token = localStorage.getItem('tokenId');
    setToken(token);
  }, []);

  const handleStartGame = async () => {
    if (token) {
      const data = await getMyContests();
      console.log('---data', data);
      const isJoin = data.contests.some(({ id }) => id === GAME_ID);
      if (!isJoin) {
        await joinToContest();
      }
      navigate('/description');
      return;
    }

    const authDomen = process.env.REACT_APP_AUTH_DOMEN;
    const authLink = `${authDomen}auth?redirect_to=${process.env.REACT_APP_URL}`;
    window.location.href = authLink;
  };

  return (
    <div className={styles.up}>
      <div className={styles.container}>
        <img className={styles.latech_img} src={latech_img} alt='latech_img' />
        <img
          className={styles.questions_img}
          src={questions_img}
          alt='questions_img'
        />
        <div className={styles.box}>
          <img className={styles.home_img} src={home_img} alt='home_img' />
          <button
            className={styles.button_green}
            onClick={() => handleStartGame()}
          >
            ИГРАТЬ
          </button>
        </div>
      </div>
    </div>
  );
}
