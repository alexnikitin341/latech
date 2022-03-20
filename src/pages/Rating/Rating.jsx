import { Fragment, useEffect, useState } from 'react';
import { getMe, getRating } from '../../helpers/request';
import lupe from '../../assets/lupe.svg';
import { useDebounce } from '../../helpers/hooks';
import styles from './Rating.module.scss';

export default function Rating() {
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  const handleGetRating = async (value) => {
    setLoading(true);
    await getMe();
    const data = await getRating(3, value);
    setRating(data.rating);
    setLoading(false);
  };

  // useEffect(() => {
  //   handleGetRating();
  // }, []);

  useEffect(() => {
    handleGetRating(debouncedSearch);
  }, [debouncedSearch]);

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  if (loading) {
    return <div className={styles.container}> ...loading</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Лидерборд</h1>
      <div className={styles.box}>
        <div className={styles.search}>
          <input
            value={search}
            onChange={handleSearch}
            placeholder='Ведите имя'
          />
          <img src={lupe} alt='lupe' />
        </div>
        <div className={styles.table}>
          <p className={styles.title}>Место</p>
          <p className={styles.title}>Участник</p>
          <p className={styles.title}>Результат</p>

          {[...rating].map(({ place, score, solutions, name }, i) => (
            <Fragment key={`place_${i}`}>
              <p className={place < 4 ? styles.green : ''}>{place}</p>
              <p className={place < 4 ? styles.green : ''}>{name}</p>
              <p className={place < 4 ? styles.green : ''}>
                {score}/{solutions.length}
              </p>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
