import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';


// import CreativeItem from '../CreativeItem/CreativeItem';

import './CreativeGallery.scss';

export default function CreativeGallery(props) {
    const [isShown, setIsShown] = useState(false);

    console.log(props.showLess);

    let showLess = props.showLess;

    let lessProjects = '';
    let allProjects = '';

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

    const photography = props.protography;
    const design = props.graphicDesign;


    switch (showLess !== null) {
        case (showLess === true && photography !== null):
            lessProjects = props.photography.slice(0, 3).map((project => {
                return (<Grid key={project.id} style={{ height: 200, width: 200 }}>
                    <figure className="img-container" >
                        <img src={project.photo} alt={project.title} />
                    </figure>

                </Grid>)
            }));

            break;

        case (showLess === false && photography !== null):
            allProjects = props.photography.map((project => {
                return (

                    <Grid item key={project.id} xs={project.cols} md={project.colsXs} >
                        <figure className="img-container" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                            <img src={project.photo} alt={project.title} />

                            {isShown && (
                                <div className="img-container-hover">
                                    <button>Bigger please!</button>

                                </div>
                            )}
                        </figure>
                    </Grid>
                )
            }));

            break;
        //     case (showLess === true && design !== null):
        //     lessProjects = props.graphicDesign.slice(0, 3).map((project => {
        //         return (<Grid key={project.id} style={{ height: 200, width: 200 }}>
        //             <figure className="img-container" >
        //                 <img src={project.photo} alt={project.title} />
        //             </figure>

        //         </Grid>)
        //     }));

        //     break;

        //     case (showLess === false && design !== null):
        //         allProjects = props.graphicDesign.map((project => {
        //             return (


        //                 <Grid item key={project.id} xs={project.cols} md={project.colsXs} >
        //                     <figure className="img-container" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
        //                         <img src={project.photo} alt={project.title} />

        //                         {isShown && (
        //                             <div className="img-container-hover">
        //                                 <button>Bigger please!</button>

        //                             </div>
        //                         )}
        //                     </figure>
        //                 </Grid>
        //             )
        //         }));

        // default: break;

    }



    return (

        <section class="main-gallery">
            <div className="gallery">

                {showLess &&
                    <Grid container  >
                        {lessProjects}
                    </Grid>
                }

                <Grid container spacing={2} className={classes.grid}>
                    {allProjects}
                </Grid>
            </div>
        </section>

    )
}
