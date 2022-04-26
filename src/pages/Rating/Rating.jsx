import { Fragment, useEffect, useState } from 'react';
import { getAllRating, getRating } from '../../helpers/request';
import { useDebounce } from '../../helpers/hooks';
import lupe from '../../assets/lupe.svg';
import stars_rating from '../../assets/stars_rating.png';
import styles from './Rating.module.scss';

export default function Rating() {
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleGetRating = async (value) => {
    setLoading(true);
    const allRating = await getAllRating();
    const ratingId = allRating?.ratings?.[0]?.id;
    const data = await getRating(ratingId, value);
    setRating(data.rating);
    setLoading(false);
  };

  useEffect(() => {
    handleGetRating(debouncedSearch);
  }, [debouncedSearch]);

  if (loading) {
    return <div className={styles.container}> ...loading</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.main_container}>
        <h1>Лидерборд</h1>
        <div className={styles.box}>
          <div className={styles.search}>
            <input value={search} onChange={handleSearch} placeholder='Введите имя' />
            <img src={lupe} alt='lupe' />
          </div>
          <div className={styles.table}>
            <p className={styles.title}>место</p>
            <p className={styles.title}>участник</p>
            <p className={styles.title}>результат</p>

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
      <img className={styles.stars_rating} src={stars_rating} alt='stars_rating' />
    </div>
  );
}
