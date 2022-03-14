import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GAME_ID } from '../../helpers/consts';
import { getMyContests, joinToContest } from '../../helpers/request';
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
    <div className={styles.container}>
      {token && <div>ПРИЗЫ</div>}

      <button className={styles.button_green} onClick={() => handleStartGame()}>
        ИГРАТЬ
      </button>
    </div>
  );
}
