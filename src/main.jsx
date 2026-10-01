import { mount } from 'what-framework';
import { Router, enableScrollRestoration } from 'what-framework/router';
import { routes } from './routes.jsx';
import './styles.css';

enableScrollRestoration();
mount(<Router routes={routes} globalLayout={Shell} fallback={NotFound} />, '#app');

function Shell({ children }) {
  return (
    <div class="shell">
      <a class="skip-link" href="#content">Skip to content</a>
      <header class="topbar" aria-label="Primary">
        <a class="brand" href="/" data-route>FIELDWORK</a>
        <nav class="nav">
          <a href="/projects" data-route>Index</a>
          <a href="/build" data-route>Build notes</a>
          <a href="/projects/radio-garden" data-route>Featured study</a>
        </nav>
      </header>
      <main id="content">{children}</main>
    </div>
  );
}

function NotFound() {
  return (
    <section class="not-found">
      <p class="kicker">404</p>
      <h1>No field record at this route.</h1>
      <p>The public archive only includes selected records. Try the index or return to the journal.</p>
      <a class="button" href="/" data-route>Return to the journal</a>
    </section>
  );
}
