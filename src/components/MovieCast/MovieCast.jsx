import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../../services/api';
import CardOfCast from '../CardOfCast/CardOfCast';

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getCast = async () => {
      try {
        setLoading(true);
        const respons = await fetchData(1, '', `movie/${id}/credits`);

        setMovieCast(respons.cast);
      } catch {
        setError(true);
        console.error();
      } finally {
        setLoading(false);
      }
    };

    getCast();
  }, [id]);

  return (
    <>
      <h2>Movie actors:</h2>
      {loading && <div>Loading info about actors</div>}
      {error && <div>Oops.. It is error..Please try reloading this page!</div>}
      {movieCast.length > 0 ? (
        <CardOfCast movieCast={movieCast} />
      ) : (
        <h2>We don't have a cast list for this movie!</h2>
      )}
    </>
  );
}
