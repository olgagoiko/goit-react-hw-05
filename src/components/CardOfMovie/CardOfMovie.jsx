import css from './CardOfMovie.module.css';

export default function CardOfMovie({ data }) {
  const {
    poster_path,
    overview,
    title,
    genres,
    vote_average,
    release_date,
    origin_country,
  } = data;

  const src = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  return (
    <div className={css.container}>
      <img
        className={css.poster}
        src={
          poster_path
            ? src
            : 'http://dummyimage.com/250x375/c4c4c8/646cff.gif&text=The+image!'
        }
        alt={`poster of ${title}`}
      />
      <div>
        <h2>{title}</h2>
        <p className={css.dataMovie}>
          <span>Release date :</span>{' '}
          {release_date !== '' ? release_date : <>Sorry, not found</>}
        </p>
        <p className={css.dataMovie}>
          <span>Origin country : </span>
          {origin_country.join(', ')}
        </p>
        <p className={css.dataMovie}>
          <span>Vote average : </span>
          {vote_average}
        </p>
        <p className={css.dataMovie}>
          <span>Overviev: </span>
          {overview !== '' ? overview : <>Sorry, not found</>}
        </p>
        <p className={css.dataMovie}>
          <span>Genres : </span>
          {genres.length > 0 ? (
            genres.map(({ name }) => name).join(', ')
          ) : (
            <>Sorry, not found</>
          )}
        </p>
      </div>
    </div>
  );
}
