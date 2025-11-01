import Gallery from "./Gallery.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="nav container" aria-label="Primary">
          <a className="brand" href="../index.html">Zoe Zhang</a>
          <ul className="nav-list">
            <li><a href="../about.html">About</a></li>
            <li><a href="./index.html" aria-current="page">Portfolio</a></li>
            <li><a href="../projects.html">Projects</a></li>
            <li><a href="../blog.html">Blog</a></li>
            <li><a href="../misc.html">Misc.</a></li>
          </ul>
        </nav>
      </header>

      <main id="main" className="container">
        <Gallery />
      </main>
    </>
  );
}