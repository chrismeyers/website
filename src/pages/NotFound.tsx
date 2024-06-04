import { Link, useLocation } from 'react-router-dom';
import Page from '../components/Page.tsx';

const NotFound = () => {
  const location = useLocation();

  return (
    <Page metadata={{ header: 'Page Not Found' }}>
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
    </Page>
  );
};

export default NotFound;
