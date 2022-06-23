import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import './css/build.css';
import BuildsAPI from '../utils/api/builds';
import {
  DEFAULT_DOCUMENT_TITLE,
  LIGHTGALLERY_LICENSE,
} from '../utils/constants';
import ToastMessage from './ToastMessage';
import Loading from './Loading';

const BuildPage = () => {
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
        <div className={isLoading ? 'section-header-loading' : ''}>
          {isLoading ? <Loading lines={0} header={true} /> : 'Build Details'}
        </div>
      </div>

      <div className="content-text build">
        {isLoading ? (
          <Loading lines={10} header={true} />
        ) : (
          <>
            {error ? (
              <p className="center">
                Unable to load build{' '}
                <span className="pre highlighted">{id}</span>
              </p>
            ) : (
              <div className="build" key={data.id}>
                <h2>{data.displayDate}</h2>
                <div className="build-info">
                  <div className="build-specs">
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
                          {data.hdd.split(',').map((hdd, index) => (
                            <dd key={`${data.id}-hdd-${index}`}>
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
                    <div className="build-pic">
                      <LightGallery
                        licenseKey={LIGHTGALLERY_LICENSE}
                        plugins={[lgZoom]}
                      >
                        <a href={data.image.path}>
                          <img
                            src={data.image.path}
                            className={`build-pic-img-${data.image.orient}`}
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BuildPage;
