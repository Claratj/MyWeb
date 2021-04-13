import React from 'react';

import './Intro.scss';

export default function Intro() {

    let circle = document.querySelector(".circle");
    let triangle = document.querySelector(".triangle");
    let hexagone = document.querySelector(".hex");

    window.onmouseover = (e) => {
        // console.log(e.clientX)
        // circle.style.transform = "scale(" + (e.clientX * 0.001) + ")";
        // triangle.style.transform = "rotate(" + (-1 * e.clientX * 0.1) + "deg)";
        // hexagone.style.transform = "rotate(" + (e.clientX * 0.1) + "deg)" + "scale(" + (e.clientX * 0.005) + ")"
    }




    return (
        <div className="main" id="intro">
            <div className="intro-txt" >
                <h2 className="headline headline--ghost">Hola caracola</h2>
            </div>
            <div className="circle"></div>
            <div className="triangle"></div>
        </div>
    )
}
