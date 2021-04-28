import React, { useState, useRef, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';


// import CreativeItem from '../CreativeItem/CreativeItem';

import './CreativeGallery.scss';

export default function CreativeGallery(props) {

    const [isShown, setIsShown] = useState(false);
    // const itemEls = useRef({})

    const boxRef = React.useRef(null);

    const showHover = () => {
        return (
            <div className="img-container-hover" onMouseLeave={() => setIsShown(false)}>
                <button>Bigger please!</button>
            </div>
        )
    }


    const handleMouseEnter = (e) => {
        console.log(e.target);
        setIsShown(true);
        showHover();
    };

    const handleMouseLeave = () => {

        setIsShown(false);


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
                {/* 
                {showLess &&
                    <Grid container  >
                        {lessProjects}
                    </Grid>
                } */}

                <Grid container spacing={2} className={classes.grid}>
                    {/* {allProjects} */}

                    {props.photography &&
                        props.photography.map((project, i) => {
                            return (

                                <Grid item key={i} xs={project.cols} md={project.colsXs} >
                                    <figure className="img-container" ref={boxRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                        <img src={project.photo} alt={project.title} />
                                    </figure>

                                </Grid>
                            )
                        })
                    }

                    {/* {props.graphicDesign &&
                        props.graphicDesign.map((project => {
                            return (
                                <Grid item key={project.id} xs={project.cols} md={project.colsXs} >
                                    <figure className="img-container" ref={refs.current[project.id]} onFocus={() => setIsShown(true)} onFocus={() => setIsShown(false)}>
                                        <img src={project.photo} alt={project.title} />

                                        {isShown && (
                                            <div className="img-container-hover">
                                                <button>Bigger please!</button>

                                            </div>
                                        )}
                                    </figure>
                                </Grid>
                            )
                        }))

                    } */}

                </Grid>


            </div>
        </section>

    )
}
