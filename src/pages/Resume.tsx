import { Fragment } from 'react';
import { full as resume } from '../assets/generated/resume.ts';
import Page from '../components/Page.tsx';
import { MAILTO_RESUME } from '../constants.ts';
import styles from '../styles/Resume.module.css';

const Resume = () => {
  return (
    <Page
      metadata={{ header: 'Résumé', title: 'Résumé' }}
      contentStyles={[styles.resume]}
    >
      <h2>Experience</h2>
      {resume?.experience?.map((job) => (
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

          {job.secondLine.map((secondLine, index) => (
            <Fragment key={`job-secondLine-${secondLine[0]}`}>
              <li
                className={`${styles.leftColumn} ${styles.subLeftColumn} ${
                  styles.jobTitle
                } ${
                  index > 0 && job.info[index - 1].length > 0
                    ? styles.additionalRole
                    : styles.role
                }`}
              >
                {secondLine[0]}
              </li>
              <li
                className={`${styles.rightColumn} ${styles.tenure} ${
                  index > 0 && job.info[index - 1].length > 0
                    ? styles.additionalRole
                    : styles.role
                }`}
                dangerouslySetInnerHTML={{ __html: secondLine[1] }} // eslint-disable-line react/no-danger
              />

              {job.info && job.info[index].length > 0 && (
                <li className={styles.removeBullets}>
                  <ul className={styles.moreInfoWrapper}>
                    {job.info[index].map((info) => (
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
      {resume?.education?.map((school) => (
        <ul
          className={styles.italicSpacer}
          key={`school-${school.firstLine[0]}`}
        >
          <li className={`${styles.leftColumn} ${styles.school}`}>
            <a className="fancytxt" href={school.url}>
              {school.firstLine[0]}
            </a>
          </li>
          <li className={`${styles.rightColumn} ${styles.location}`}>
            {school.firstLine[1]}
          </li>
          {school.secondLine.map((secondLine, index) => (
            <Fragment key={`school-secondLine-${secondLine[0]}`}>
              <li
                className={`${styles.leftColumn} ${styles.subLeftColumn} ${styles.degree}`}
              >
                {secondLine[0]}
              </li>
              <li
                className={`${styles.rightColumn} ${styles.tenure}`}
                dangerouslySetInnerHTML={{ __html: secondLine[1] }} // eslint-disable-line react/no-danger
              />

              {school.info && school.info[index].length > 0 && (
                <li className={styles.removeBullets}>
                  <ul className={styles.moreInfoWrapper}>
                    {school.info[index].map((info: string) => (
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
        {resume?.skills?.map((skill) => (
          <li className="skill-wrapper" key={`skill-wrapper-${skill.mainItem}`}>
            {skill.mainItem}
            {skill.subItems.length > 0 && (
              <ul>
                {skill.subItems.map((subItem: string) => (
                  <li key={`skill-subItem-${subItem}`}>{subItem}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <a
        className="subtle fancytxt"
        href={MAILTO_RESUME}
        target="_blank"
        rel="noopener noreferrer"
      >
        Request the PDF version of my résumé
      </a>
    </Page>
  );
};

export default Resume;
