import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { builds } from '../assets/data';
import { DEFAULT_DOCUMENT_TITLE } from '../utils/constants';
import styles from '../styles/Builds.module.css';

const cleanCPU = (cpu) => cpu.split('@')[0].trim();

const Builds = () => {
  document.title = `Builds | ${DEFAULT_DOCUMENT_TITLE}`;

  const data = builds.filter((item) => item.active);

  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div>Builds</div>
      </div>

      <div className="content-text">
        {data?.map((build, index) => (
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
                  An <span className="highlighted">{cleanCPU(build.cpu)}</span>{' '}
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

            {index < data.length - 1 && (
              <>
                <br />
                <hr />
              </>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Builds;
