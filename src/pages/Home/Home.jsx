import React from 'react';
// import { useHistory } from 'react-router-dom';

import AOS from 'aos';
// import { Link } from 'react-scroll';


import { Header } from '../../core/Header/Header';
import Intro from '../Intro/Intro';
import { WebDevelopment } from '../WebDevelopment/WebDevelopment';
import { Creative } from '../Creative/Creative';
import { About } from '../About/About';
import { Footer } from '../../core/Footer/Footer';


import 'aos/dist/aos.css';
import './Home.scss';

export function Home() {
    AOS.init(
        {
            offset: 400,
            duration: 1000,
        }
    );



    // const history = useHistory();
    return (
        <div>
            {/* <button onClick={() => history.push('/home')}>Enter</button> */}
            <header>
                <Header />
            </header>
            {/* <div className="arrow animated bounce"></div> */}
            <main className="home-content">
                <section>
                    <Intro />
                </section>
                <section data-aos="zoom-out-up" id="about">
                    <About />
                </section>
                <section data-aos="fade-left" id="web">
                    <WebDevelopment />
                </section>
                <section data-aos="fade-right" id="graphic">
                    <Creative />
                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}