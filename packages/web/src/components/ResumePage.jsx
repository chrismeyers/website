import { Fragment } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import './css/resume.css';
import ResumeApi from '../utils/api/resume';
import { RESUME_PDF_URL, DEFAULT_DOCUMENT_TITLE } from '../utils/constants';
import ToastMessage from './ToastMessage';
import Loading from './Loading';

const ResumePage = () => {
  document.title = `Résumé | ${DEFAULT_DOCUMENT_TITLE}`;

  const { isLoading, data, error } = useQuery('resume', ResumeApi.get);

  if (error) {
    toast.error(<ToastMessage title={error.title} message={error.message} />);
  }

  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div>Résumé</div>
      </div>

      <div className="content-text">
        {isLoading ? (
          <Loading lines={10} header={true} />
        ) : (
          <>
            <h2 className="top">Experience</h2>
            {data?.experience?.map((job, i) => (
              <ul className="italic-spacer" key={`job-${i}`}>
                <li className="left-column company" key={`job-company-${i}`}>
                  <a className="fancytxt" href={job.url}>
                    {job.firstLine[0]}
                  </a>
                </li>
                <li className="right-column location" key={`job-location-${i}`}>
                  {job.firstLine[1]}
                </li>

                {job.secondLine.map((secondLine, j) => (
                  <Fragment key={`job-secondLine-${i}-${j}`}>
                    <li
                      className={`left-column sub-left-column job-title ${
                        j > 0 && job.info[j].length > 0
                          ? 'same-company-spacing'
                          : ''
                      }`}
                      key={`job-title-${i}-${j}`}
                    >
                      {secondLine[0]}
                    </li>
                    <li
                      className={`right-column tenure ${
                        j > 0 && job.info[j].length > 0
                          ? 'same-company-spacing'
                          : ''
                      }`}
                      key={`job-tenure-${i}-${j}`}
                      dangerouslySetInnerHTML={{ __html: secondLine[1] }}
                    ></li>

                    {job.info && job.info[j].length > 0 && (
                      <li className="remove-bullets" key={`job-info-${i}-${j}`}>
                        <ul
                          className="more-info-wrapper"
                          key={`job-info-wrapper-${i}-${j}`}
                        >
                          {job.info[j].map((info, k) => (
                            <li
                              className="more-info"
                              key={`job-info-item-${i}-${j}-${k}`}
                              dangerouslySetInnerHTML={{ __html: info }}
                            ></li>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
            ))}

            <br />
            <hr />

            <h2>Education</h2>
            {data?.education?.map((school, i) => (
              <ul className="italic-spacer" key={`school-${i}`}>
                <li className="left-column degree" key={`school-degree-${i}`}>
                  {school.firstLine[0]}
                </li>
                <li
                  className="right-column location"
                  key={`school-location-${i}`}
                >
                  {school.firstLine[1]}
                </li>
                {school.secondLine.map((secondLine, j) => (
                  <Fragment key={`school-secondLine-${i}-${j}`}>
                    <li
                      className="left-column sub-left-column school"
                      key={`school-school-${i}-${j}`}
                    >
                      <a
                        className="fancytxt"
                        key={`school-company-link-${i}-${j}`}
                        href={school.url}
                      >
                        {secondLine[0]}
                      </a>
                    </li>
                    <li
                      className="right-column tenure"
                      key={`school-tenure-${i}-${j}`}
                      dangerouslySetInnerHTML={{ __html: secondLine[1] }}
                    ></li>

                    {school.info && school.info[j].length > 0 && (
                      <li
                        className="remove-bullets"
                        key={`school-info-${i}-${j}`}
                      >
                        <ul
                          className="more-info-wrapper"
                          key={`school-info-wrapper-${i}-${j}`}
                        >
                          {school.info[j].map((info, k) => (
                            <li
                              className="more-info"
                              key={`school-info-item-${i}-${j}-${k}`}
                            >
                              {info}
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
            ))}

            <br />
            <hr />

            <h2>Technical Skills</h2>
            <ul>
              {data?.skills?.map((skill, i) => (
                <li className="skill-wrapper" key={`skill-wrapper-${i}`}>
                  {skill.mainItem}
                  {skill.subItems.length > 0 && (
                    <ul key={`skill-list-${i}`}>
                      {skill.subItems.map((subItem, j) => (
                        <li key={`skill-subItem-${i}-${j}`}>{subItem}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <a className="subtle fancytxt" href={RESUME_PDF_URL}>
              View or download the PDF version of my résumé
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumePage;
