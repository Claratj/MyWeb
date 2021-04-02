import React, { useState, useEffect } from 'react';

import './App.css';

import { Header } from './core/Header/Header';
import { EntryPage } from './pages/EntryPage/EntryPage';
import { WebDevelopment } from './pages/WebDevelopment/WebDevelopment';
import { GraphicDesign } from './pages/GraphicDesign/GraphicDesign';
import { About } from './pages/About/About';
import { Footer } from './core/Footer/Footer'; 

function App() {


  return (
      <div className="App">
        <header>
          <Header/>
        </header>
        <main>
          <section id="home">
            <EntryPage/>
          </section>
          <section id="about">
            <About/>
          </section>
          <section id="web">
            <WebDevelopment/>
          </section>
          <section id="graphic">
            <GraphicDesign/>
          </section>
        </main>
        <footer>
          <Footer/>
        </footer>
      </div>
      
  );
}

export default App;
