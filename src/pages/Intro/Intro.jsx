import React from 'react';

import './Intro.scss';

export default function Intro() {

    let circle = document.querySelector(".circle")
    let triangle = document.querySelector(".triangle")
    let pentagon = document.querySelector(".pentagon")

    window.onmousemove = (e) => {
        // console.log(e.clientX)
        circle.style.transform = "scale(" + (e.clientX * 0.001) + ")"
        triangle.style.transform = "rotate(" + (-1 * e.clientX * 0.1) + "deg)"
        pentagon.style.transform = "rotate(" + (e.clientX * 0.1) + "deg)" + "scale(" + (e.clientX * 0.005) + ")"
    }




    return (
        <div className="main">
            <div className="intro-txt">
                <h2 className="headline headline--ghost">Hola caracola</h2>
            </div>
            <div className="circle"></div>
            <div className="triangle"></div>
            <div className="pentagon"></div>
        </div>
    )
}
