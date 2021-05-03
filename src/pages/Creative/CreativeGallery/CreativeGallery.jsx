import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';


import './CreativeGallery.scss';

export default function CreativeGallery(props) {

    const [isShown, setIsShown] = useState(false);
    const location = useLocation();
    const itemRef = useRef(null);
    const showItemsRef = useRef([]);
    showItemsRef.current = [];

    const addToRefs = (e) => {
        if (e && !showItemsRef.current.includes(e)) {
            showItemsRef.current.push(e);
        }
        // console.log(showItemsRef.current);
    }

    const handleMouseEnter = (e) => {
        console.log('he entrado');
        e.preventDefault();
        // console.log(item);
        // showItemsRef.current[item-1].className="img-container-hover";
        setIsShown(true);
        // item = itemRef.current;

        // console.log(item);
        // showHover();
    };

    const handleMouseLeave = (e) => {

        setIsShown(false);
        console.log('he salido');
        // showItemsRef.current[item-1].className="img-container";


    }

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
                                    <figure className="img-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                        <img src={project.photo} alt={project.title} />
                                    </figure>

                                </Grid>
                            )


                        })
                    }

                    {location.pathname === "/graphic" &&
                        props.graphicDesign.map((project => {
                            return (
                                <Grid item key={project.id} xs={project.cols} md={project.colsXs} ref={addToRefs}>
                                    <figure key={project.id} className="img-container" onMouseEnter={handleMouseEnter} onMouseLeave={() => handleMouseLeave(project.id)}>
                                        <img key={project.id} src={project.photo} alt={project.title} />
                                        {isShown && (
                                            <div className="img-container-hover">
                                                <button>Bigger please!</button>

                                            </div>
                                        )}

                                    </figure>
                                </Grid>
                            )
                        }))

                    }

                </Grid>


            </div>
        </section>

    )
}
