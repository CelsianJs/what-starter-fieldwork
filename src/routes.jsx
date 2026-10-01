import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import BuildPage from './pages/BuildPage.jsx';

export const routes = [
  { path: '/', component: HomePage },
  { path: '/projects', component: ProjectsPage },
  { path: '/projects/:slug', component: ProjectDetailPage },
  { path: '/build', component: BuildPage },
  { path: '/404', component: () => <ProjectDetailPage params={{ slug: 'missing' }} /> },
];
