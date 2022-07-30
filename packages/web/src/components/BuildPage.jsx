import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import { hashCode } from '../utils';
import BuildsAPI from '../utils/api/builds';
import {
  DEFAULT_DOCUMENT_TITLE,
  LIGHTGALLERY_LICENSE,
} from '../utils/constants';
import ToastMessage from './ToastMessage';
import Loading from './Loading';
import styles from '../styles/Build.module.css';

function BuildPage() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery(['builds', id], () =>
    BuildsAPI.getById(id),
  );

  if (error) {
    document.title = `Build Details | ${id} | ${DEFAULT_DOCUMENT_TITLE}`;
    toast.error(<ToastMessage title={error.title} message={error.message} />);
  }

  if (data)
    document.title = `Build Details | ${data.displayDate} | ${DEFAULT_DOCUMENT_TITLE}`;

  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div>Build Details</div>
      </div>

      <div className={`content-text ${styles.build}`}>
        {' '}
        {isLoading ? (
          <Loading lines={10} header />
        ) : (
          data && (
            <div className={styles.build} key={data.id}>
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
                          <dd key={`${data.id}-hdd-${hashCode(hdd)}`}>
                            {hdd.trim()}
                          </dd>
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
          )
        )}
      </div>
    </div>
  );
}

export default BuildPage;
