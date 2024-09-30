import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main>
      <h2>Sorry, this page is not found</h2>
      <Link to="/">Go Home</Link>
    </main>
  );
}
