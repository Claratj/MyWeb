import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';


import './CreativeGallery.scss';

export default function CreativeGallery(props) {
    const [bigger, setBigger] = useState(false);
    const [imageToShow, setImageToShow] = useState('');

    const location = useLocation();

    const biggerImage = (photo) => {
        setBigger(true);
        setImageToShow(photo);
    }

    const reset = () => {
        setBigger(false);
    }

    const showNext = (e) => {
        e.stopPropagation();
        let currentIndex = props.projects.indexOf(imageToShow);
        console.log(currentIndex);
        if (currentIndex >= props.projects.length - 1) {
            setBigger(false);
        } else {
            let nextImage = props.projects[currentIndex + 1];
            setImageToShow(nextImage);
        }
    };

    const showPrev = (e) => {
        e.stopPropagation();
        let currentIndex = props.projects.indexOf(imageToShow);
        if (currentIndex <= 0) {
            setBigger(false);
        } else {
            let nextImage = props.projects[currentIndex - 1];
            setImageToShow(nextImage);
        }
    };



    const useStyles = makeStyles((theme) => ({
        root: {
            overflow: 'hidden',
        },
        grid: {
            width: '100%',
            margin: '0px',
            overflow: 'hidden',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        }


    }));

    const classes = useStyles();




    return (

        <section className="main-gallery">
            <div className="gallery">


                <Grid container spacing={2} className={classes.grid}>

                    {location.pathname === "/photography" &&
                        props.projects.map((project, k) => {
                            return (
                                <Grid item key={k} xs={project.cols} md={project.colsXs} >
                                    <figure className="img-container" >
                                        <img src={project.photo} alt={project.title} className="img-grid" />
                                        <div className="content-overlay">
                                            <h3>{project.title}</h3>
                                            <p>{project.description}</p>
                                            <button className="btn-more-hover" onClick={() => biggerImage(project)}><span>Bigger please!</span></button>
                                        </div>
                                    </figure>

                                </Grid>
                            )


                        })
                    }

                    {location.pathname === "/graphic" &&
                        props.projects.map((project => {
                            return (
                                <Grid item key={project.id} xs={project.cols} md={project.colsXs} >
                                    <figure key={project.id} className="img-container" >
                                        <img key={project.id} src={project.photo} alt={project.title} className="img-grid" />
                                        <div className="content-overlay">
                                            <h3>{project.title}</h3>
                                            <p>{project.description}</p>
                                            <button className="btn-more-hover" onClick={() => biggerImage(project)}><span>Bigger please!</span></button>

                                        </div>

                                    </figure>
                                </Grid>
                            )
                        }))

                    }

                </Grid>
                {bigger ?
                    <div id="carousel" >
                        <button className="carousel-btn" onClick={showPrev} ><span className="icon-caret-left" /></button>
                        <img src={imageToShow.photo} id="carousel-img" onClick={reset} />
                        <button className="carousel-btn" onClick={showNext}><span className="icon-caret-right" /></button>
                    </div>
                    : ""
                }


            </div>
        </section>

    )
}
