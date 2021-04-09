import React from 'react';

import cv from '../../download/cv.pdf';

export default function Button(props) {

    let text = props.text;

    return (
        <a href={cv} download="cv_clara_toloba_eng.pdf" className="btn-more">
            <span>{text}</span>
        </a>
    )
}
