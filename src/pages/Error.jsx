import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <>
      <p className="center">Something went terribly wrong!</p>
      <p className="center">
        Don&apos;t panic, go back to the{' '}
        <Link className="fancytxt" to="/">
          home page
        </Link>
        !
      </p>
    </>
  );
};

export default Error;
