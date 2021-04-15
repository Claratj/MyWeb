import React from 'react';

export default function CreativeItem(props) {

    const { key, title, photo, description } = props;
    let colStyle = '';

    switch (title) {
        case (title === "Envy" || "Gluttony" || "Pride" || "Black bird" || "Flamingo"):
            colStyle = "col-md-4";
            break;

        case (title === "Lust" || "Irbis" || "Prometheus II"):
            colStyle = "col-md-8";
            break;

        default: break;
    }

    return (
        <div className={colStyle} key={key}>
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
