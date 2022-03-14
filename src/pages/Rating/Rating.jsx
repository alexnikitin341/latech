import { useEffect, useState } from 'react';
import styles from './Rating.module.scss';
import { getRating } from '../../helpers/request';

export default function Rating() {
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetRating = async () => {
    setLoading(true);
    const data = await getRating(3);
    setRating(data.rating);
    setLoading(false);
  };

  useEffect(() => {
    handleGetRating();
  }, []);

  if (loading) {
    return <div className={styles.container}> ...loading</div>;
  }

  return (
    <div className={styles.container}>
      {rating.map((el) => (
        <div>
          <p></p>
        </div>
      ))}
    </div>
  );
}
