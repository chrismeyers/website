import { Fragment } from 'react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { useParams } from 'react-router-dom';
import { projects } from '../assets/data.ts';
import GithubIcon from '../assets/images/icons/github.svg';
import ExternalLinkIcon from '../assets/images/icons/link-external.svg';
import PlayIcon from '../assets/images/icons/play.svg';
import { createLightGallery } from '../components/Lightbox.tsx';
import Page from '../components/Page.tsx';
import styles from '../styles/Project.module.css';
import NotFound from './NotFound.tsx';

const restartGif = () => {
  // Restart the GIF each time it's opened
  setTimeout(() => {
    const gif = document.getElementsByClassName(
      'lg-image'
    )[0] as HTMLImageElement;

    if (gif) {
      // TODO: Browsers like FireFox and Safari don't restart GIFs when setting
      // the src attribute. A workaround is to invalidate the cached image by
      // adding a unique query param (timestamp) to the image URL. This requires
      // the image to be downloaded each time it's opened, so if this ever gets
      // fixed in the aforementioned browsers then the following should be used:
      //
      // gif.setAttribute('src', gif.src);

      const url = new URL(gif.src);
      url.searchParams.set('ts', Date.now().toString());
      gif.src = url.toString();
    }
  }, 100);
};

const Project = () => {
  const { id } = useParams();

  const data = projects.get(Number(id));

  if (!data) return <NotFound />;

  return (
    <Page
      metadata={{
        header: 'Project Details',
        title: `Project Details | ${data.title}`,
      }}
      contentStyles={[styles.project]}
    >
      <h2>{data.title}</h2>
      <h3>{data.displayDate}</h3>
      <div className={styles.wrapper}>
        <div className={styles.description}>
          <dl>
            <dt className="dt-mod">
              <b>Language(s)</b>
            </dt>
            <dd
              dangerouslySetInnerHTML={{ __html: data.languages.join(', ') }} // eslint-disable-line react/no-danger
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
            <dd>{data.status}</dd>

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
            {data.images[0]?.path.toLowerCase().endsWith('.gif') ? (
              <div className={styles.gifOverlay} title="Play GIF">
                {createLightGallery(
                  [
                    <a href={data.images[0].path}>
                      <img
                        src={data.images[0].thumbnail ?? ''}
                        className={`${styles.imagesFull} ${
                          styles[data.images[0].orientation]
                        }`}
                        alt={data.images[0].title}
                        title="Click to enlarge"
                      />
                    </a>,
                  ],
                  {
                    onBeforeOpen: restartGif,
                    enableDrag: false,
                    enableSwipe: false,
                  }
                )}
                <PlayIcon
                  name="play"
                  className="link-image xlarge play-overlay"
                  alt="Plays the associated GIF"
                  title="Play GIF"
                />
              </div>
            ) : (
              createLightGallery(
                [
                  data.images.map((image, index) => (
                    <Fragment key={image?.id}>
                      {index === 0 ? (
                        <a href={image?.path}>
                          <img
                            src={image?.path}
                            className={`${styles.imagesFull} ${
                              styles[image?.orientation ?? 'square']
                            }`}
                            alt={image?.title}
                            title="Click to enlarge"
                          />
                        </a>
                      ) : (
                        <div
                          className={styles.imagesSmall}
                          data-src={image?.path}
                        >
                          <a href={image?.path}>
                            <img
                              src={image?.path}
                              className={`${styles.imagesSmall} ${
                                styles[image?.orientation ?? 'square']
                              }`}
                              alt={image?.title}
                              title="Click to enlarge"
                            />
                          </a>
                        </div>
                      )}
                    </Fragment>
                  )),
                ],
                { thumbnail: true, plugins: [lgThumbnail, lgZoom] }
              )
            )}
          </div>
        )}
      </div>
    </Page>
  );
};

export default Project;
