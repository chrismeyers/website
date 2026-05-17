import { projects } from '../../assets/data.ts';
import styles from '../../styles/Projects.module.css';

const ProjectsContent = () => {
  const data = Array.from(projects.values());

  return (
    <>
      {data.map((project, index) => (
        <div key={project.id}>
          <h2>
            <a
              className="fancytxt"
              title={`Click for details of ${project.title}`}
              href={`/projects/${project.id}`}
            >
              {project.title}
            </a>
          </h2>
          <h3>{project.displayDate}</h3>
          <div className={styles.overview}>
            <p
              dangerouslySetInnerHTML={{ __html: project.info }} // eslint-disable-line @eslint-react/dom-no-dangerously-set-innerhtml
            />
            <p className="right">
              <a
                className="subtle fancytxt"
                title={`Click for details of ${project.title}`}
                href={`/projects/${project.id}`}
              >
                Project Details &gt;
              </a>
            </p>
          </div>

          {index < data.length - 1 && (
            <>
              <br />
              <hr />
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default ProjectsContent;
