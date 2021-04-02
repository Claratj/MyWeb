import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab);
library.add(fas);

export function ProjectItem(props) {

    const { key, photo, title, description, technologies, githubUrl, webUrl } = props;
    console.log(props);
    return (

        <article className="flip-card" key={key}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={process.env.PUBLIC_URL + photo} alt={title} className="project-img"></img>
                </div>
                <div className="flip-card-back">
                    <div>
                        <h5>{title}</h5>
                        <p className="project-description">{description}</p>
                        <p className="project-technologies">{technologies}</p>
                        <nav className="social-media">
                            <ul>
                                <li><a href={githubUrl} alt={title} target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={['fab', 'github']} size='lg'></FontAwesomeIcon></a>
                                </li>
                                <li><a href={webUrl} alt={title} target="_blank" rel="noopener noreferrer">Visit Website</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </article>

    )
}