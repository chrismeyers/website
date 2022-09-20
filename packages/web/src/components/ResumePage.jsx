import { Fragment } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import * as ResumeApi from '../utils/api/resume';
import { RESUME_PDF_URL, DEFAULT_DOCUMENT_TITLE } from '../utils/constants';
import ToastMessage from './ToastMessage';
import Loading from './Loading';
import styles from '../styles/Resume.module.css';

const ResumePage = () => {
  document.title = `Résumé | ${DEFAULT_DOCUMENT_TITLE}`;

  const { isLoading, data, error } = useQuery(['resume'], ResumeApi.get);

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
          <Loading lines={10} header />
        ) : (
          <>
            <h2 className="top">Experience</h2>
            {data?.experience?.map((job) => (
              <ul
                className={styles.italicSpacer}
                key={`job-${job.firstLine[0]}-${job.secondLine[0][1]}`} // prettier-ignore
              >
                <li className={`${styles.leftColumn} ${styles.company}`}>
                  <a className="fancytxt" href={job.url}>
                    {job.firstLine[0]}
                  </a>
                </li>
                <li className={`${styles.rightColumn} ${styles.location}`}>
                  {job.firstLine[1]}
                </li>

                {job.secondLine.map((secondLine, j) => (
                  <Fragment key={`job-secondLine-${secondLine[0]}`}>
                    <li
                      className={`${styles.leftColumn} ${
                        styles.subLeftColumn
                      } ${styles.jobTitle} ${
                        j > 0 && job.info[j].length > 0
                          ? styles.sameCompanySpacing
                          : ''
                      }`}
                    >
                      {secondLine[0]}
                    </li>
                    <li
                      className={`${styles.rightColumn} ${styles.tenure} ${
                        j > 0 && job.info[j].length > 0
                          ? styles.sameCompanySpacing
                          : ''
                      }`}
                      dangerouslySetInnerHTML={{ __html: secondLine[1] }} // eslint-disable-line react/no-danger
                    />

                    {job.info && job.info[j].length > 0 && (
                      <li className={styles.removeBullets}>
                        <ul className={styles.moreInfoWrapper}>
                          {job.info[j].map((info) => (
                            <li
                              className="more-info"
                              key={`job-info-item-${info}`}
                              dangerouslySetInnerHTML={{ __html: info }} // eslint-disable-line react/no-danger
                            />
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
            {data?.education?.map((school) => (
              <ul
                className={styles.italicSpacer}
                key={`school-${school.firstLine[0]}`}
              >
                <li className={`${styles.leftColumn} ${styles.degree}`}>
                  {school.firstLine[0]}
                </li>
                <li className={`${styles.rightColumn} ${styles.location}`}>
                  {school.firstLine[1]}
                </li>
                {school.secondLine.map((secondLine, j) => (
                  <Fragment key={`school-secondLine-${secondLine[0]}`}>
                    <li
                      className={`${styles.leftColumn} ${styles.subLeftColumn} ${styles.school}`}
                    >
                      <a className="fancytxt" href={school.url}>
                        {secondLine[0]}
                      </a>
                    </li>
                    <li
                      className={`${styles.rightColumn} ${styles.tenure}`}
                      dangerouslySetInnerHTML={{ __html: secondLine[1] }} // eslint-disable-line react/no-danger
                    />

                    {school.info && school.info[j].length > 0 && (
                      <li className={styles.removeBullets}>
                        <ul className={styles.moreInfoWrapper}>
                          {school.info[j].map((info) => (
                            <li
                              className="more-info"
                              key={`school-info-item-${info}`}
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
              {data?.skills?.map((skill) => (
                <li
                  className="skill-wrapper"
                  key={`skill-wrapper-${skill.mainItem}`}
                >
                  {skill.mainItem}
                  {skill.subItems.length > 0 && (
                    <ul>
                      {skill.subItems.map((subItem) => (
                        <li key={`skill-subItem-${subItem}`}>{subItem}</li>
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
