import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import './css/build.css';
import BuildsAPI from '../utils/api/builds';
import { DEFAULT_DOCUMENT_TITLE } from '../utils/constants';
import ToastMessage from './ToastMessage';
import Loading from './Loading';

const BuildPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [build, setBuild] = useState({});

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await BuildsAPI.getById(id);
        if (isMounted) {
          document.title = `Build Details | ${response.data.displayDate} | ${DEFAULT_DOCUMENT_TITLE}`;
          setError(false);
          setBuild(response.data);
        }
      } catch (error) {
        document.title = `Build Details | ${id} | ${DEFAULT_DOCUMENT_TITLE}`;
        setError(true);
        toast.error(
          <ToastMessage title={error.title} message={error.message} />,
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();

    return () => (isMounted = false);
  }, [id]);

  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div className={loading ? 'section-header-loading' : ''}>
          {loading ? <Loading lines={0} header={true} /> : 'Build Details'}
        </div>
      </div>

      <div className="content-text build">
        {loading ? (
          <Loading lines={10} header={true} />
        ) : (
          <>
            {error ? (
              <p className="center">
                Unable to load build{' '}
                <span className="pre highlighted">{id}</span>
              </p>
            ) : (
              <div className="build" key={build.id}>
                <h2>{build.displayDate}</h2>
                <div className="build-info">
                  <div className="build-specs">
                    <dl>
                      <dt className="dt-mod">
                        <b>GPU</b>
                      </dt>
                      <dd>{build.gpu}</dd>
                      <dt className="dt-mod">
                        <b>CPU</b>
                      </dt>
                      <dd>{build.cpu}</dd>
                      {build.cool !== null && (
                        <>
                          <dt className="dt-mod">
                            <b>Cooling</b>
                          </dt>
                          <dd>{build.cool}</dd>
                        </>
                      )}
                      <dt className="dt-mod">
                        <b>Motherboard</b>
                      </dt>
                      <dd>{build.mobo}</dd>
                      <dt className="dt-mod">
                        <b>RAM</b>
                      </dt>
                      <dd>{build.ram}</dd>
                      {build.ssd !== null && (
                        <>
                          <dt className="dt-mod">
                            <b>SSD</b>
                          </dt>
                          <dd>{build.ssd}</dd>
                        </>
                      )}
                      {build.hdd !== null && (
                        <>
                          <dt className="dt-mod">
                            <b>HDD</b>
                          </dt>
                          {build.hdd.split(',').map((hdd, index) => (
                            <dd key={`${build.id}-hdd-${index}`}>
                              {hdd.trim()}
                            </dd>
                          ))}
                        </>
                      )}
                      <dt className="dt-mod">
                        <b>Case</b>
                      </dt>
                      <dd>{build.case}</dd>
                      <dt className="dt-mod">
                        <b>PSU</b>
                      </dt>
                      <dd>{build.psu}</dd>
                    </dl>
                  </div>
                  {build.image && (
                    <div className="build-pic">
                      <LightGallery plugins={[lgZoom]}>
                        <a href={build.image.path}>
                          <img
                            src={build.image.path}
                            className={`build-pic-img-${build.image.orient}`}
                            alt={build.image.title}
                            data-sub-html={build.image.title}
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
