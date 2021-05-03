import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';


import './CreativeGallery.scss';

export default function CreativeGallery(props) {
    const [bigger, setBigger] = useState(false);
    const [imageToShow, setImageToShow] = useState('');

    const location = useLocation();

    let srcPhoto = '';
    let altPhoto = '';

    const biggerImage = (photo) => {
        setBigger(true);
        setImageToShow(photo);
        // console.log(props.photography[0].photo)
    }

    const reset = () => {
        setBigger(false);
    }

    const showNext = (e) => {
        e.stopPropagation();
        let currentIndex = props.photography.indexOf(imageToShow);
        console.log(currentIndex);
        if (currentIndex >= props.photography.length - 1) {
            setBigger(false);
        } else {
            let nextImage = props.photography[currentIndex + 1];
            setImageToShow(nextImage);
        }
    };

    const showPrev = (e) => {
        e.stopPropagation();
        let currentIndex = props.photography.indexOf(imageToShow);
        if (currentIndex <= 0) {
            setBigger(false);
        } else {
            let nextImage = props.photography[currentIndex - 1];
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
                        props.photography.map((project, k) => {
                            return (
                                <Grid item key={k} xs={project.cols} md={project.colsXs} >
                                    <figure className="img-container" >
                                        <img src={project.photo} alt={project.title} className="img-grid" />
                                        <div className="content-overlay">
                                            <h3>{project.title}</h3>
                                            <p>{project.description}</p>
                                            <button onClick={() => biggerImage(project)}>Bigger please!</button>

                                        </div>
                                    </figure>

                                </Grid>
                            )


                        })
                    }

                    {location.pathname === "/graphic" &&
                        props.graphicDesign.map((project => {
                            return (
                                <Grid item key={project.id} xs={project.cols} md={project.colsXs} >
                                    <figure key={project.id} className="img-container" >
                                        <img key={project.id} src={project.photo} alt={project.title} />
                                        <div className="content-overlay">
                                            <h3>{project.title}</h3>
                                            <p>{project.description}</p>
                                            <button>Bigger please!</button>

                                        </div>

                                    </figure>
                                </Grid>
                            )
                        }))

                    }

                </Grid>
                {bigger ?
                    <div id="lightbox" >
                        <button onClick={showPrev}>⭠</button>
                        <img src={imageToShow.photo} id="lightbox-img" onClick={reset} />
                        <button onClick={showNext}>⭢</button>
                    </div>
                    : ""
                }


            </div>
        </section>

    )
}
