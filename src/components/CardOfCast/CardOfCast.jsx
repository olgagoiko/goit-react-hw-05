import css from "./CardOfCast.module.css";

export default function CardOfCast({ movieCast }) {
  return (
    <div>
      <ul className={css.list}>
        {movieCast.map(
          ({ profile_path, popularity, name, character, cast_id }) => {
            return (
              <li key={cast_id} className={css.item}>
                <img
                  className={css.img}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                      : "http://dummyimage.com/150x200/c4c4c8/646cff.gif&text=The+image!"
                  }
                  alt={`Photo of${name}`}
                />
                <p>Name : {`${name}`}</p>
                <p>Character : {`${character}`}</p>
                <p>Popularity : {`${popularity}`}</p>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}