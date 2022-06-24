import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import './css/projects.css';
import ProjectsAPI from '../utils/api/projects';
import { DEFAULT_DOCUMENT_TITLE } from '../utils/constants';
import ToastMessage from './ToastMessage';
import Loading from './Loading';

const ProjectsPage = () => {
  document.title = `Projects | ${DEFAULT_DOCUMENT_TITLE}`;

  const { isLoading, data, error } = useQuery('projects', ProjectsAPI.get);

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
          <Loading lines={10} header={true} />
        ) : (
          <>
            {data?.items?.map((project, index) => (
              <Fragment key={project.id}>
                <div className="project">
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
                  <div className="project-overview">
                    <p dangerouslySetInnerHTML={{ __html: project.info }}></p>
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
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
