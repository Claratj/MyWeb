import React from 'react';
import { Header } from '../../core/Header/Header';
import './ContactPage.scss';
import img from '../../assets/img/foto-linkedin.jpg';


export function ContactPage() {
    return (
        <div>
            <Header />
            <div className="contact-container">
                <div className="col-4">
                    <figure className="about-image">
                        <img className="about-image__img" src={img} />
                        <h2 className="about-image__txt">Clara</h2>
                    </figure>

                </div>
                <div className="col-8">
                    <div>
                        Formación y skilss
                </div>
                    <div className="timeline">
                        timeline de experiencias
                        <ul>
                            <li>
                                <div className="content">
                                    <h3>Responsable de Marketing y Diseño en Artecristal</h3>
                                    <p>Gestión de proveedores y presupuestos del departamento.
                                    Mejora, maquetación e implantación de material corporativo.
                                    Optimización y preparación de material gráfico y audiovisual
                                    para distintas publicaciones.
                                    Preparación de Artes finales.
Generación de newsletters y desarrollo web. </p>
                                </div>
                                <div className="time">
                                    <h4>Marzo 2019 - Octubre 2020</h4>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <h3>Fotógrafa - Diseñadora Gráfica en Artesolar</h3>
                                    <p>Desarrollo y maquetación de material gráfico y audiovisual
                                    para distintas publicaciones.
                                    Creación de material corporativo.
Generación de contenido para la página web. </p>
                                </div>
                                <div className="time">
                                    <h4>Agosto 2018 - Fe-
brero 2019.</h4>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <h3>Diseñadora Gráfica - Creativa - Dependiente en Wonder Photo Shop Fujifilm</h3>
                                    <p>Desarrollo de campañas de publicidad y generación de nuevo
                                    producto para las mismas.
                                    Preparación e impresión digital - plotter de artes finales.
                                    Cuidado y diseño de imagen de marca.
Control de stock, pedidos y contabilidad diaria. </p>
                                </div>
                                <div className="time">
                                    <h4>Enero 2018 - Agosto 2018.</h4>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <h3>Fotógrafa en AtomRiders</h3>
                                    <p>Conceptualización, elaboración y postproducción de material
fotográfico. </p>
                                </div>
                                <div className="time">
                                    <h4>2017</h4>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <h3>Diseñadora Gráfica en PPH-Estudio Fotográfico</h3>
                                    <p>Diseño para merchandisign adaptable a distintas superficies. </p>
                                </div>
                                <div className="time">
                                    <h4>2016</h4>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <h3>Diseñadora Gráfica en Kareca 3D</h3>
                                    <p>Desarrollo de branding corporativo.</p>
                                </div>
                                <div className="time">
                                    <h4>2016</h4>
                                </div>
                            </li>
                        </ul>
                    </div>


                </div>

            </div>
        </div>
    );
}