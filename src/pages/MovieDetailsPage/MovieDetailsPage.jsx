import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import fetchData from '../../services/api';
import CardOfMovie from '../../components/CardOfMovie/CardOfMovie';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { id } = useParams();

  const [dataFilm, setDataFilm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  const backLinkHref = useRef(location.state ?? '/');

  useEffect(() => {
    const getDataFilm = async () => {
      try {
        setLoading(true);
        setError(false);

        const respons = await fetchData(1, '', `movie/${id}`);

        const {
          poster_path,
          overview,
          title,
          genres,
          vote_average,
          release_date,
          origin_country,
        } = respons;

        setDataFilm({
          poster_path,
          overview,
          title,
          genres,
          vote_average,
          release_date,
          origin_country,
        });
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getDataFilm();
  }, [id]);

  return (
    <main>
      {loading && <div>Loading</div>}
      {error && <div>Error</div>}
      <Link to={backLinkHref.current} className={css.goBack}>
        Go back
      </Link>
      {dataFilm.title && <CardOfMovie data={dataFilm} />}

      <ul className={css.list}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Review</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
}
