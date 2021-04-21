import React from 'react';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import './CreativeItem.scss';

export default function CreativeItem(props) {

    const { key, title, photo, description } = props;
    // const flexGrow = '';
    console.log(title);

    switch (title) {
        case (title === "Envy" && title === "Gluttony" && title === "Pride" && title === "Black bird"):
            // flexGrow = "flex";
            break;

        case (title === "Lust" || title === "Irbis" || title === "Prometheus II"):
            // flexGrow = "flex2";
            break;

        case (title === "Flamingo"):
            // flexGrow = "flex3";

        default: break;
    }

    return (
        <GridListTile key={key} style={{ flexGrow: '1' }} cols={(photo.width / 1200 / 4).toFixed(0)}>
            {/* <figure className="img-container"> */}
            <img src={photo} alt={title} />
            <GridListTileBar title={title} subtitle={description} />
            {/* <figcaption class="img-content">
                    <h2 className="title">{title}</h2>
                    <p className="category">{description}</p>
                </figcaption> */}
            {/* <span className="img-content-hover">
                    <h2 className="title">Smart Watch</h2>
                    <p className="category">Showcase</p>
                </span> */}
            {/* </figure> */}
        </GridListTile>
    )
}
