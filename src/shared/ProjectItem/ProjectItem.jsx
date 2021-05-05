import React from 'react';
import { Link } from 'react-router-dom';

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
                    <div>
                        <h5 className="project-title">{title}</h5>
                        <p className="project-description">{description}</p>
                        <p className="project-technologies">{technologies}</p>
                        <nav className="social-media">
                            <ul>
                                <li>
                                    <Link to={githubUrl}>
                                        <span className="icon-gitlab" />Gitlab
                                </Link>
                                </li>
                                {webUrl !== "" &&
                                    <li>
                                        <Link to={webUrl}>
                                            Website
                                    </Link>
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