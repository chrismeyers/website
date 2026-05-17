import { builds } from '../../assets/data.ts';
import styles from '../../styles/Builds.module.css';

const cleanCPU = (cpu: string) => cpu.split('@')[0].trim();

const BuildsContent = () => {
  const data = Array.from(builds.values());

  return (
    <>
      {data.map((build, index) => (
        <div key={build.id}>
          <h2>
            <a
              className="fancytxt"
              title={`Click for details of ${build.displayDate}`}
              href={`/builds/${build.id}`}
            >
              {build.displayDate}
            </a>
          </h2>
          <div className={styles.overview}>
            <p>
              An <span className="highlighted">{cleanCPU(build.cpu)}</span>{' '}
              based system
            </p>
            <p className="right">
              <a
                className="subtle fancytxt"
                title={`Click for details of ${build.displayDate}`}
                href={`/builds/${build.id}`}
              >
                Build Details &gt;
              </a>
            </p>
          </div>

          {index < data.length - 1 && (
            <>
              <br />
              <hr />
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default BuildsContent;
