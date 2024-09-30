import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import fetchData from '../../services/api';
import LoadMore from '../../components/LoadMore/LoadMore';

export default function HomePage() {
  const [listFilms, setListFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageOnParams = Number(searchParams.get('page'));
  const [page, setPage] = useState(() => (pageOnParams ? pageOnParams : 1));

  const endPoint = 'trending/movie/day';

  function changePage(page, change) {
    setPage(page + change);
  }
  function resetPage() {
    setPage(1);
  }

  useEffect(() => {
    const getFilmsList = async () => {
      try {
        setLoading(true);
        setError(false);

        const respons = await fetchData(page, '', endPoint);

        setSearchParams({ page: page });

        setTotalPages(respons.total_pages);

        setListFilms([...respons.results]);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFilmsList();
  }, [page]);

  return (
    <div>
      <h1>Trending today</h1>
      {loading && <div>Loading a list of films</div>}
      {error && (
        <div>Oops... It is error....Please try reloading this page!</div>
      )}
      {listFilms.length > 0 && <MovieList list={listFilms} />}
      {page > 1 && (
        <LoadMore onClick={changePage} change={-1} page={page}>
          Previos page
        </LoadMore>
      )}
      <LoadMore page={page}>{page}</LoadMore>
      {page < totalPages && (
        <LoadMore onClick={changePage} change={1} page={page}>
          Next page
        </LoadMore>
      )}
      {page !== 1 && <LoadMore onClick={resetPage}>Reset page</LoadMore>}
    </div>
  );
}
