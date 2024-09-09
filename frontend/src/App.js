import React from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import FormCotizacion from './components/FormCotizacion';
import Footer from './components/Footer';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <NavBar />
      <main>
        <section id="cotizar">
          <FormCotizacion />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
