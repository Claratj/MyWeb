import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../../core/Header/Header';
import { Footer } from '../../core/Footer/Footer';
import { About } from '../About/About';
import { WebDevelopment } from '../WebDevelopment/WebDevelopment';
import { GraphicDesign } from '../GraphicDesign/GraphicDesign';


export function EntryPage() {

    const history = useHistory();
    return (
        <div>
            {/* <button onClick={() => history.push('/home')}>Enter</button> */}
            <header>
                <Header />
            </header>
            <main>
                <section id="about">
                    <About />
                </section>
                <section id="web">
                    <WebDevelopment />
                </section>
                <section id="graphic">
                    <GraphicDesign />
                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}