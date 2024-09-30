import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ list }) {
  const location = useLocation();

  return (
    <ul>
      {list.map(({ id, title, release_date }) => {
        const year = new Date(release_date);

        return (
          <li key={id}>
            <Link to={`/movies/${id}`} state={location}>
              {title}
              {'  '} {year.getFullYear() ? year.getFullYear() : <p>not info</p>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
