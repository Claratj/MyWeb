import React from "react";

interface IItem {
  key: string;
  photo: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  webUrl: string;
}

export function ProjectItem(props: IItem) {
  const { key, photo, title, description, technologies, githubUrl, webUrl } =
    props;

  return (
    <article className="flip-card" key={key}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={process.env.PUBLIC_URL + photo}
            alt={title}
            className="project-img"
          ></img>
        </div>
        <div className="flip-card-back">
          <div className="project-div">
            <h5 className="project-title">{title}</h5>
            <p className="project-description">{description}</p>
            <p className="project-technologies">{technologies}</p>
            <nav className="project-links">
              <ul>
                <li>
                  <a
                    href={githubUrl}
                    title={title + " Gitlab"}
                    className="links"
                  >
                    <span className="icon-gitlab" />
                    Gitlab
                  </a>
                </li>
                {webUrl && (
                  <li>
                    <a
                      href={webUrl}
                      title={title + " website"}
                      className="links"
                    >
                      Website
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
}
