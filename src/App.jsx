import { useState } from 'react';
import './styles/globals.css';

import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Expertise from './components/Expertise';
import Awards from './components/Awards';
import Journal from './components/Journal';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Cursor />
      <Loader onComplete={() => setLoaded(true)} />

      /* Main content fades in after loader */
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Nav />

        <main>
          <Hero />
          <hr className="divider" />
          <Intro />
          <hr className="divider" />
          <Expertise />
          <hr className="divider" />
          <Awards />
          <hr className="divider" />
          <Journal />
          <hr className="divider" />
          <ContactCTA />
        </main>

        <Footer />
      </div>
    </>
  );
}
