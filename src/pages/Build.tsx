import lgZoom from 'lightgallery/plugins/zoom';
import { useParams } from 'react-router-dom';
import { builds } from '../assets/generated/data.ts';
import { createLightGallery } from '../components/Lightbox.tsx';
import Page from '../components/Page.tsx';
import styles from '../styles/Build.module.css';
import NotFound from './NotFound.tsx';

const Build = () => {
  const { id } = useParams();

  const data = builds.get(Number(id));

  if (!data) return <NotFound />;

  return (
    <Page
      metadata={{
        header: 'Build Details',
        title: `Build Details | ${data.displayDate}`,
      }}
      contentStyles={[styles.build]}
    >
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
                {data.ssd.map((ssd) => (
                  <dd key={`${data.id}-ssd-${ssd}`}>{ssd.trim()}</dd>
                ))}
              </>
            )}
            {data.hdd !== null && (
              <>
                <dt className="dt-mod">
                  <b>HDD</b>
                </dt>
                {data.hdd.map((hdd) => (
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
            {createLightGallery(
              [
                <a href={data.image.path}>
                  <img
                    src={data.image.path}
                    className={styles[data.image.orientation]}
                    alt={data.image.title}
                    data-sub-html={data.image.title}
                    title="Click to enlarge"
                  />
                </a>,
              ],
              { plugins: [lgZoom] }
            )}
          </div>
        )}
      </div>
    </Page>
  );
};

export default Build;
