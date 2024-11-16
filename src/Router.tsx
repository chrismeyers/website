import { Route, Switch } from 'wouter';
import About from './pages/About.tsx';
import Build from './pages/Build.tsx';
import Builds from './pages/Builds.tsx';
import NotFound from './pages/NotFound.tsx';
import Project from './pages/Project.tsx';
import Projects from './pages/Projects.tsx';
import Resume from './pages/Resume.tsx';

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={About} />
      <Route path="/resume" component={Resume} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:id" component={Project} />
      <Route path="/builds" component={Builds} />
      <Route path="/builds/:id" component={Build} />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Router;
