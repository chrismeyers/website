interface Props {
  pathname: string;
}

const NotFoundContent = ({ pathname }: Props) => (
  <>
    <p className="center">
      The path <span className="pre highlighted">{pathname}</span> does not
      exist
    </p>
    <p className="center">
      Go back to the{' '}
      <a className="fancytxt" href="/">
        home page
      </a>
      !
    </p>
  </>
);

export default NotFoundContent;
