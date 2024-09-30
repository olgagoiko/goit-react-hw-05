import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';

const HomePage = lazy(() => import('.././pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('.././pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('.././pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() => import('.././pages/NotFoundPage/NotFoundPage'));
const Navigation = lazy(() => import('../components/Navigation/Navigation'));
const MovieCast = lazy(() => import('../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../components/MovieReviews/MovieReviews')
);

function App() {
  return (
    <div>
      <Navigation />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
