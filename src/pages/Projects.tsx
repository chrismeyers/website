import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../assets/data.ts';
import Page from '../components/Page.tsx';
import styles from '../styles/Projects.module.css';

const Projects = () => {
  const data = Array.from(projects.values());

  return (
    <Page metadata={{ header: 'Projects', title: 'Projects' }}>
      {data.map((project, index) => (
        <Fragment key={project.id}>
          <div>
            <h2>
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
