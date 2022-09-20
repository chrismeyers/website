import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import * as ResumeApi from '../utils/api/resume';
import {
  MAILTO_HREF,
  DEFAULT_DOCUMENT_TITLE,
  LIGHTGALLERY_LICENSE,
} from '../utils/constants';
import ToastMessage from './ToastMessage';
import Loading from './Loading';

const AboutPage = () => {
  document.title = DEFAULT_DOCUMENT_TITLE;

  const { isLoading, data, error } = useQuery(
    ['resume.summary'],
    ResumeApi.summary,
  );

  if (error) {
    toast.error(<ToastMessage title={error.title} message={error.message} />);
  }

  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div>About</div>
      </div>

      <div className="content-text">
        {isLoading ? (
          <Loading lines={10} />
        ) : (
          <>
            <span>
              Hey, my name is Chris Meyers and I am a software engineer and
              technology enthusiast. Here are some things you should know about
              me:
            </span>

            <ul>
              <li>
                I studied computer science at{' '}
                <a className="fancytxt" href="https://www.rowan.edu">
                  Rowan University
                </a>{' '}
                in Glassboro, NJ and earned a Bachelor of Science in Computer
                Science
              </li>
              {data?.mostRecentJob?.employed && (
                <li data-testid="employment">
                  Currently, I am employed as a {data.mostRecentJob.title} at{' '}
                  <a href={data.mostRecentJob.url} className="fancytxt">
                    {data.mostRecentJob.company}
                  </a>
                </li>
              )}

              <li>
                Some of my hobbies include:
                <ul>
                  <li>
                    <a
                      className="fancytxt"
                      href="https://www.goodreads.com/chrismeyers"
                    >
                      Reading
                    </a>
                  </li>
                  <li>Photography</li>
                  <li>
                    <Link className="fancytxt" to="/builds">
                      Building custom computers
                    </Link>
                  </li>
                  <li>Chess</li>
                </ul>
              </li>
              <li>
                I am the owner of this{' '}
                <LightGallery
                  licenseKey={LIGHTGALLERY_LICENSE}
                  plugins={[lgZoom]}
                  elementClassNames="inline"
                >
                  <span
                    className="fancytxt"
                    data-src="/images/clark/DSC_1564-6.jpg"
                    data-sub-html="Clark the Corgi"
                  >
                    majestic beast
                  </span>
                </LightGallery>
              </li>
            </ul>

            <p>
              Over the years, I&apos;ve gained experience with the following
              programming languages and frameworks:
            </p>

            <ul>
              <li>
                Websites, web applications, and APIs:
                {data?.languages?.web && (
                  <ul data-testid="web-languages">
                    {data.languages.web.map((item) => (
                      <li key={`web-${item}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                Desktop and command-line interface (CLI) applications:
                {data?.languages?.desktop && (
                  <ul data-testid="desktop-languages">
                    {data.languages.desktop.map((item) => (
                      <li key={`desktop-${item}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>

            <span>
              As a professional software engineer, I strive to write clean,
              modular, and maintainable code. My primary goal is to create
              innovative and usable applications that solve problems. If you
              have any questions, comments, or would like to work together on a
              project, please{' '}
              <a
                href={MAILTO_HREF}
                className="fancytxt"
                target="_blank"
                rel="noopener noreferrer"
              >
                send me a message
              </a>
              .
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
