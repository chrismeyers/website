import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { ReactComponent as ExternalLinkIcon } from '../assets/images/icons/link-external.svg';
import { ReactComponent as GithubIcon } from '../assets/images/icons/github.svg';
import { ReactComponent as PlayIcon } from '../assets/images/icons/play.svg';
import { getProjects } from '../utils/data';
import {
  DEFAULT_DOCUMENT_TITLE,
  LIGHTGALLERY_LICENSE,
} from '../utils/constants';
import styles from '../styles/Project.module.css';

const ProjectPage = () => {
  const { id } = useParams();

  const data = getProjects().find(
    (item) => item.id === parseInt(id, 10) && item.active,
  );

  if (data)
    document.title = `Project Details | ${data.title} | ${DEFAULT_DOCUMENT_TITLE}`;

  const restartGif = () => {
    // Restart the GIF each time it's opened
    setTimeout(() => {
      const gif = document.getElementsByClassName('lg-image')[0];

      if (gif) {
        document.getElementsByClassName('lg-image')[0].src = gif.src;
      }
    }, 100);
  };

  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div>Project Details</div>
      </div>

      <div className={`content-text ${styles.project}`}>
        {data && (
          <div className={styles.project}>
            <h2>{data.title}</h2>
            <h3>{data.displayDate}</h3>
            <div className={styles.wrapper}>
              <div className={styles.description}>
                <dl>
                  <dt className="dt-mod">
                    <b>Language(s)</b>
                  </dt>
                  <dd
                    dangerouslySetInnerHTML={{ __html: data.lang }} // eslint-disable-line react/no-danger
                  />

                  <dt className="dt-mod">
                    <b>Description</b>
                  </dt>
                  <dd
                    dangerouslySetInnerHTML={{ __html: data.info }} // eslint-disable-line react/no-danger
                  />

                  <dt className="dt-mod">
                    <b>My Role</b>
                  </dt>
                  <dd>{data.role}</dd>

                  <dt className="dt-mod">
                    <b>Status</b>
                  </dt>
                  <dd>{data.stat}</dd>

                  <dt className="dt-mod dt-links">
                    <b>Links</b>
                  </dt>
                  {data.webUrl !== null && (
                    <dd className="link-image">
                      <ExternalLinkIcon
                        className="link-image small"
                        title="External website"
                        alt="Link to external website"
                      />{' '}
                      <a href={data.webUrl} className="fancytxt">
                        Website
                      </a>
                    </dd>
                  )}
                  <dd className="link-image">
                    <GithubIcon
                      className="link-image small"
                      title="GitHub repository"
                      alt="Link to GitHub repository"
                    />{' '}
                    <a href={data.codeUrl} className="fancytxt">
                      Code
                    </a>
                  </dd>
                </dl>
              </div>

              {data?.images?.length > 0 && (
                <div className={styles.images}>
                  {data.images[0].path.toLowerCase().endsWith('.gif') ? (
                    <>
                      {data.images.map((image) => (
                        <Fragment key={image.id}>
                          <div className={styles.gifOverlay} title="Play GIF">
                            <LightGallery
                              licenseKey={LIGHTGALLERY_LICENSE}
                              onBeforeOpen={restartGif}
                              enableDrag={false}
                              enableSwipe={false}
                            >
                              <a href={image.path}>
                                <img
                                  src={image.thumbnail}
                                  className={`${styles.imagesFull} ${
                                    styles[image.orient]
                                  }`}
                                  alt={image.title}
                                  title="Click to enlarge"
                                />
                              </a>
                            </LightGallery>
                            <PlayIcon
                              name="play"
                              className="link-image xlarge play-overlay"
                              alt="Plays the associated GIF"
                              title="Play GIF"
                            />
                          </div>
                        </Fragment>
                      ))}
                    </>
                  ) : (
                    <LightGallery
                      licenseKey={LIGHTGALLERY_LICENSE}
                      plugins={[lgZoom, lgThumbnail]}
                      thumbnail
                    >
                      {data.images.map((image, index) => (
                        <Fragment key={image.id}>
                          {index === 0 ? (
                            <a href={image.path}>
                              <img
                                src={image.path}
                                className={`${styles.imagesFull} ${
                                  styles[image.orient]
                                }`}
                                alt={image.title}
                                title="Click to enlarge"
                              />
                            </a>
                          ) : (
                            <div
                              className={styles.imagesSmall}
                              data-src={image.path}
                            >
                              <a href={image.path}>
                                <img
                                  src={image.path}
                                  className={`${styles.imagesSmall} ${
                                    styles[image.orient]
                                  }`}
                                  alt={image.title}
                                  title="Click to enlarge"
                                />
                              </a>
                            </div>
                          )}
                        </Fragment>
                      ))}
                    </LightGallery>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
