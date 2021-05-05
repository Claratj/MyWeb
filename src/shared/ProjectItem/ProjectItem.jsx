import React from 'react';

export function ProjectItem(props) {

    const { key, photo, title, description, technologies, githubUrl, webUrl } = props;

    // console.log(githubUrl);

    console.log(technologies);


    return (

        <article className="flip-card" key={key}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={process.env.PUBLIC_URL + photo} alt={title} className="project-img"></img>
                </div>
                <div className="flip-card-back">
                    <div className="project-div">
                        <h5 className="project-title">{title}</h5>
                        <p className="project-description">{description}</p>
                        <p className="project-technologies">{technologies}</p>
                        <nav className="project-links">
                            <ul>
                                <li>
                                    <a href={githubUrl} alt={title} className="links" ><span className="icon-gitlab"/>Gitlab</a>
                                </li>
                                {webUrl &&
                                    <li>
                                        <a href={webUrl} alt={title} className="links" >Website</a>
                                    </li>
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </article>

    )
}