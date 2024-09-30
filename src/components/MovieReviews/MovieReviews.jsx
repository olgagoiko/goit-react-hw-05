import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../../services/api';
import ReviewsList from '../ReviewsList/ReviewsList';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        setError(false);
        const respons = await fetchData(1, '', `movie/${id}/reviews`);
        setReviews(respons.results);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [id]);

  return (
    <>
      <h2>Movie reviews</h2>
      {loading && <div>Loading reviews...</div>}
      {error && <div>This is Error</div>}
      {reviews.length > 0 ? (
        <ReviewsList arrOfReviews={reviews} />
      ) : (
        <p>We don't have any reviews for this movie!</p>
      )}
    </>
  );
}
