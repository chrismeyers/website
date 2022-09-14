import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import BuildsAPI from '../utils/api/builds';
import { DEFAULT_DOCUMENT_TITLE } from '../utils/constants';
import ToastMessage from './ToastMessage';
import Loading from './Loading';
import styles from '../styles/Builds.module.css';

const BuildsPage = () => {
  document.title = `Builds | ${DEFAULT_DOCUMENT_TITLE}`;

  const { isLoading, data, error } = useQuery(['builds'], BuildsAPI.get);

  if (error) {
    toast.error(<ToastMessage title={error.title} message={error.message} />);
  }

  const cleanCPU = (cpu) => {
    return cpu.split('@')[0].trim();
  };

  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div>Builds</div>
      </div>

      <div className="content-text">
        {isLoading ? (
          <Loading lines={10} header />
        ) : (
          data?.items?.map((build, index) => (
            <Fragment key={build.id}>
              <div className={styles.build}>
                <h2 className={index === 0 ? 'first-header' : ''}>
                  <Link
                    className="fancytxt"
                    title={`Click for details of ${build.displayDate}`}
                    to={`/builds/${build.id}`}
                  >
                    {build.displayDate}
                  </Link>
                </h2>
                <div className={styles.overview}>
                  <p>
                    An{' '}
                    <span className="highlighted">{cleanCPU(build.cpu)}</span>{' '}
                    based system
                  </p>
                  <p className="right">
                    <Link
                      className="subtle fancytxt"
                      title={`Click for details of ${build.displayDate}`}
                      to={`/builds/${build.id}`}
                    >
                      Build Details &gt;
                    </Link>
                  </p>
                </div>
              </div>

              {index < data.items.length - 1 && (
                <>
                  <br />
                  <hr />
                </>
              )}
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default BuildsPage;
