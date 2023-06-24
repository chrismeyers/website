import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import { projects } from '../assets/data';
import { SLOGAN } from '../constants';
import styles from '../styles/Projects.module.css';

const Projects = () => {
  document.title = `Projects | ${SLOGAN}`;

  const data = projects.filter((item) => item.active);

  return (
    <Page header="Projects">
      {data?.map((project, index) => (
        <Fragment key={project.id}>
          <div>
            <h2 className={index === 0 ? 'first-header' : ''}>
              <Link
                className="fancytxt"
                title={`Click for details of ${project.title}`}
                to={`/projects/${project.id}`}
              >
                {project.title}
              </Link>
            </h2>
            <h3>{project.displayDate}</h3>
            <div className={styles.overview}>
              <p
                dangerouslySetInnerHTML={{ __html: project.info }} // eslint-disable-line react/no-danger
              />
              <p className="right">
                <Link
                  className="subtle fancytxt"
                  title={`Click for details of ${project.title}`}
                  to={`/projects/${project.id}`}
                >
                  Project Details &gt;
                </Link>
              </p>
            </div>
          </div>

          {index < data.length - 1 && (
            <>
              <br />
              <hr />
            </>
          )}
        </Fragment>
      ))}
    </Page>
  );
};

export default Projects;
