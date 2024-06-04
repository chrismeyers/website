import { Link, useRouteError } from 'react-router-dom';
import Page from '../components/Page.tsx';

const Error = () => {
  const error = useRouteError();

  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <Page metadata={{ header: 'An Error Has Occurred' }}>
      <p className="center">Something went terribly wrong!</p>
      <p className="center">
        Don&apos;t panic, go back to the{' '}
        <Link className="fancytxt" to="/">
          home page
        </Link>
        !
      </p>
    </Page>
  );
};

export default Error;
