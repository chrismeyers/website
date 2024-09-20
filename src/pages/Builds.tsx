import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { builds } from '../assets/generated/data.ts';
import Page from '../components/Page.tsx';
import styles from '../styles/Builds.module.css';

const cleanCPU = (cpu: string) => cpu.split('@')[0].trim();

const Builds = () => {
  const data = Array.from(builds.values());

  return (
    <Page metadata={{ header: 'Builds', title: 'Builds' }}>
      {data.map((build, index) => (
        <Fragment key={build.id}>
          <div>
            <h2>
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
    </Page>
  );
};

export default Builds;
