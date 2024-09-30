import css from './ReviewsList.module.css';

export default function ReviewsList({ arrOfReviews }) {
  return (
    <ul>
      {arrOfReviews.map(({ id, content, author }) => {
        return (
          <li key={id} className={css.item}>
            <p>
              <span>Name : </span>
              {author}
            </p>
            <p>
              <span>Review :</span> {content}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
