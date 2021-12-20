import React from 'react';

import './CreativeItem.scss';

export default function CreativeItem(props) {

    const { key, title, photo, description } = props;

    return (
        <div className="gridWrapper" key={key}>
            <figure className="img-container">
                <img src={photo} alt={title} />
                <figcaption class="img-content">
                    <h2 className="title">{title}</h2>
                    <p className="category">{description}</p>
                </figcaption>
                <span className="img-content-hover">
                    <h2 className="title">Smart Watch</h2>
                    <p className="category">Showcase</p>
                </span>
            </figure>
        </div>
    )
}
