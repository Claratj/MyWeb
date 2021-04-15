import React from 'react';



import './CreativeGallery.scss';

export default function CreativeGallery(props) {
    console.log(props.showLess);

    let showLess = props.showLess;
    let lessProjects = '';
    const allProjects = '';

    console.log(props.projectP);

    switch (showLess !== null) {
        case (showLess === true && props.projectP):
            lessProjects = props.projectP.slice(0, 3).map((project => {
                return (<div className="col-sm-12 col-md-4" key={project.id}>
                    <figure className="img-container">
                        <img src={project.photo} />
                        <figcaption class="img-content">
                            <h2 className="title">{project.title}</h2>
                            <p className="category">{project.description}</p>
                        </figcaption>
                        <span className="img-content-hover">
                            <h2 className="title">Smart Watch</h2>
                            <p className="category">Showcase</p>
                        </span>
                    </figure>
                </div>)
            }));

            break;
        case (showLess === false && props.projectP):
            allProjects = props.projectP.map((project => {
                return (<div className="col-sm-12 col-md-4" key={project.id}>
                    <figure className="img-container">
                        <img src={project.photo} />
                        <figcaption className="img-content">
                            <h2 className="title">{project.title}</h2>
                            <p className="category">{project.description}</p>
                        </figcaption>
                        <span className="img-content-hover">
                            <h2 className="title">Smart Watch</h2>
                            <p className="category">Showcase</p>
                        </span>
                    </figure>
                </div>)
            }));

            break;

        default: break;

    }


    return (

        <section class="main-gallery">
            {showLess && <div class="gallery">
                {lessProjects}
            </div>}
            <div class="gallery">
                {allProjects}
            </div>
        </section>

    )
}
