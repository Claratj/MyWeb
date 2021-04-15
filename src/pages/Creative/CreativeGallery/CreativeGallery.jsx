import React from 'react';



import './CreativeGallery.scss';

export default function CreativeGallery(props) {

    let showLess = props.showLess;
    let projectP = props.projectP;
    let projectG = props.projectG;
    let lessProjects = '';
    const allProjects = '';

    switch (showLess !== null) {
        case (showLess === true && props.projectP):
            lessProjects = props.projectP.slice(0, 3).map((project => {
                return <div class="col-sm-12 col-md-4">
                    <figure class="img-container">
                        <img src={projectP.photo} />
                        <figcaption class="img-content">
                            <h2 class="title">{projectP.title}</h2>
                            <p class="category">{projectP.description}</p>
                        </figcaption>
                        <span class="img-content-hover">
                            <h2 class="title">Smart Watch</h2>
                            <p class="category">Showcase</p>
                        </span>
                    </figure>
                </div>
            }))

            break;
        case (showLess === false && props.projectP):
            allProjects = props.projectP.map((project => {
                return <div class="col-sm-12 col-md-4">
                    <figure class="img-container">
                        <img src={projectP.photo} />
                        <figcaption class="img-content">
                            <h2 class="title">{projectP.title}</h2>
                            <p class="category">{projectP.description}</p>
                        </figcaption>
                        <span class="img-content-hover">
                            <h2 class="title">Smart Watch</h2>
                            <p class="category">Showcase</p>
                        </span>
                    </figure>
                </div>
            }))

            break;

        default: break;

    }


    return (

        <section class="main-gallery">
            <div class="gallery">
                {showLess ? lessProjects  :  allProjects }
            </div>
        </section>

    )
}
