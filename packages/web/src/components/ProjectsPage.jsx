import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import ProjectsAPI from '../utils/api/projects';
import { DEFAULT_DOCUMENT_TITLE } from '../utils/constants';
import ToastMessage from './ToastMessage';
import Loading from './Loading';
import styles from '../styles/Projects.module.css';

const ProjectsPage = () => {
  document.title = `Projects | ${DEFAULT_DOCUMENT_TITLE}`;

  const { isLoading, data, error } = useQuery(['projects'], ProjectsAPI.get);

  if (error) {
    toast.error(<ToastMessage title={error.title} message={error.message} />);
  }

  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div>Projects</div>
      </div>

      <div className="content-text">
        {isLoading ? (
          <Loading lines={10} header />
        ) : (
          data?.items?.map((project, index) => (
            <Fragment key={project.id}>
              <div className={styles.project}>
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

              {index < data.items.length - 1 && (
                <>
                  <br />
                  <hr />
                </>
              )}
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
