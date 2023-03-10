import { useParams } from 'react-router-dom';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import { builds } from '../assets/data';
import { DEFAULT_DOCUMENT_TITLE, LIGHTGALLERY_LICENSE } from '../constants';
import styles from '../styles/Build.module.css';
import NotFound from './NotFound';

const Build = () => {
  const { id } = useParams();

  const data = builds.find(
    (item) => item.id === parseInt(id, 10) && item.active
  );

  if (!data) return <NotFound />;

  document.title = `Build Details | ${data.displayDate} | ${DEFAULT_DOCUMENT_TITLE}`;

  return (
    <div>
      <h2>{data.displayDate}</h2>
      <div className={styles.info}>
        <div className={styles.specs}>
          <dl>
            <dt className="dt-mod">
              <b>GPU</b>
            </dt>
            <dd>{data.gpu}</dd>
            <dt className="dt-mod">
              <b>CPU</b>
            </dt>
            <dd>{data.cpu}</dd>
            {data.cool !== null && (
              <>
                <dt className="dt-mod">
                  <b>Cooling</b>
                </dt>
                <dd>{data.cool}</dd>
              </>
            )}
            <dt className="dt-mod">
              <b>Motherboard</b>
            </dt>
            <dd>{data.mobo}</dd>
            <dt className="dt-mod">
              <b>RAM</b>
            </dt>
            <dd>{data.ram}</dd>
            {data.ssd !== null && (
              <>
                <dt className="dt-mod">
                  <b>SSD</b>
                </dt>
                <dd>{data.ssd}</dd>
              </>
            )}
            {data.hdd !== null && (
              <>
                <dt className="dt-mod">
                  <b>HDD</b>
                </dt>
                {data.hdd.split(',').map((hdd) => (
                  <dd key={`${data.id}-hdd-${hdd}`}>{hdd.trim()}</dd>
                ))}
              </>
            )}
            <dt className="dt-mod">
              <b>Case</b>
            </dt>
            <dd>{data.case}</dd>
            <dt className="dt-mod">
              <b>PSU</b>
            </dt>
            <dd>{data.psu}</dd>
          </dl>
        </div>
        {data.image && (
          <div className={styles.pic}>
            <LightGallery
              licenseKey={LIGHTGALLERY_LICENSE}
              plugins={[lgZoom]}
              download={false}
            >
              <a href={data.image.path}>
                <img
                  src={data.image.path}
                  className={`${styles[data.image.orient]}`}
                  alt={data.image.title}
                  data-sub-html={data.image.title}
                  title="Click to enlarge"
                />
              </a>
            </LightGallery>
          </div>
        )}
      </div>
    </div>
  );
};

export default Build;

export const buildContentStyles = [styles.build];
