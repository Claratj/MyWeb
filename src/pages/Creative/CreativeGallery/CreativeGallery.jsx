import React from 'react';

import CreativeItem from '../CreativeItem/CreativeItem';

import './CreativeGallery.scss';

export default function CreativeGallery(props) {

    console.log(props.showLess);

    let showLess = props.showLess;

    let lessProjects = '';
    let allProjects = '';


    switch (showLess !== null) {
        case (showLess === true):
            lessProjects = props.photography.slice(0, 3).map((project => {
                return (<CreativeItem key={project.id}
                    photo={project.photo}
                    title={project.title}
                    description={project.description} />)
            }));

            break;

        case (showLess === false):
            allProjects = props.photography.map((project => {
                return (
                    <CreativeItem key={project.id}
                        photo={project.photo}
                        title={project.title}
                        description={project.description} />)
            }));

            break;

        default: break;

    }


    return (

        <section class="main-gallery">
            <div class="gallery">
                {showLess &&
                    lessProjects
                }

                {allProjects}
            </div>
        </section>

    )
}
