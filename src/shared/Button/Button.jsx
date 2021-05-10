import React from 'react';
import { Link } from 'react-router-dom';


import cv from '../../download/cv.pdf';

export default function Button(props) {

    console.log(props);

    let text = props.text;
    let path = props.path;

    return (
        <>
            {
                props.text === 'CV Download' &&
                <a href={cv} download="cv_clara_toloba_eng.pdf" className="btn-more">
                    <span>{text}</span>
                </a>

            }
            {
                props.text === 'More please!' &&
                <Link to={path}>
                    <button className="btn-more">
                        <span>{text}</span>
                    </button>
                </Link>

            }


        </>
    )
}
