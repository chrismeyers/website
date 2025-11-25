import { Link } from 'wouter';
import { summary } from '../assets/generated/resume.ts';
import Page from '../components/Page.tsx';
import { MAILTO_MESSAGE } from '../constants.ts';

const About = () => {
  return (
    <Page metadata={{ header: 'About' }}>
      <p>
        Hey, my name is Chris Meyers and I am a software engineer and technology
        enthusiast. Here are some things you should know about me:
      </p>

      <ul>
        <li>
          I studied computer science at{' '}
          <a className="fancytxt" href="https://www.rowan.edu">
            Rowan University
          </a>{' '}
          in Glassboro, NJ and earned a Bachelor of Science in Computer Science
        </li>
        {summary.mostRecentJob.employed && (
          <li data-testid="employment">
            Currently, I am employed as a {summary.mostRecentJob.title} at{' '}
            {summary.mostRecentJob.url ? (
              <a href={summary.mostRecentJob.url} className="fancytxt">
                {summary.mostRecentJob.company}
              </a>
            ) : (
              <span>{summary.mostRecentJob.company}</span>
            )}
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
      </ul>

      {summary.languages.all.length > 0 && (
        <>
          <p>
            Over the years, I&apos;ve gained experience developing software
            ranging from desktop and CLI applications to web applications and
            REST APIs using:
          </p>
          <ul data-testid="languages">
            {summary.languages.all.map((item) => (
              <li key={`languages-${item}`}>{item}</li>
            ))}
          </ul>
        </>
      )}

      <p>
        As a professional software engineer, I strive to write simple, modular,
        and maintainable code. My primary goal is to create innovative and
        usable applications that solve real problems. If you have any questions,
        comments, or would like to work together on a project, please{' '}
        <a
          href={MAILTO_MESSAGE}
          className="fancytxt"
          target="_blank"
          rel="noopener noreferrer"
        >
          send me a message
        </a>
        .
      </p>
    </Page>
  );
};

export default About;
