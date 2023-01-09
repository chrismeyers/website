import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return (
    <>
      <p className="center">
        The path <span className="pre highlighted">{location.pathname}</span>{' '}
        does not exist
      </p>
      <p className="center">
        Go back to the{' '}
        <Link className="fancytxt" to="/">
          home page
        </Link>
        !
      </p>
    </>
  );
};

export default NotFound;
