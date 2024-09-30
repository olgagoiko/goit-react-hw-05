import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import fetchData from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import SearhForm from '../../components/SearchBar/SearchBar';
import toast from 'react-hot-toast';
import LoadMore from '../../components/LoadMore/LoadMore';

export default function MoviesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchFilms, setSearchFilms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);

  const endpoint = 'search/movie';
  const query = searchParams.get('query') ?? '';
  const pageOnParams = Number(searchParams.get('page'));
  const page = pageOnParams ? pageOnParams : 1;

  function changePage(page, change, query) {
    setSearchParams({ query: query, page: page + change });
  }

  function resetPage(query) {
    setSearchParams({ query: query, page: 1 });
  }

  const notify = () =>
    toast.warn(' There is not matched movie, please, try other one', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  function setParams(value) {
    setSearchParams({ query: value.toLowerCase(), page: 1 });
  }

  useEffect(() => {
    if (query === '') {
      return;
    }

    const getSearchFilms = async query => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetchData(page, query, endpoint);

        if (response.results.length === 0) {
          notify();
          return;
        }

        setTotalPages(response.total_pages);
        setSearchFilms(response.results);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getSearchFilms(query);
  }, [query, page]);

  return (
    <main>
      <SearhForm onSubmit={setParams} />
      {loading && <div>Loading</div>}
      {error && <div>Error</div>}
      {searchFilms.length > 0 && <MovieList list={searchFilms} />}
      {page > 1 && (
        <LoadMore onClick={changePage} change={-1} page={page} query={query}>
          Previos page
        </LoadMore>
      )}
      {totalPages > 1 && <LoadMore page={page}>{page}</LoadMore>}
      {page < totalPages && (
        <LoadMore onClick={changePage} change={1} page={page} query={query}>
          Next page
        </LoadMore>
      )}
      {page !== 1 && (
        <LoadMore onClick={resetPage} page={page} change={0} query={query}>
          Reset page
        </LoadMore>
      )}
    </main>
  );
}
