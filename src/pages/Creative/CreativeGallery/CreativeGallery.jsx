import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, GridList, GridListTile, GridListTileBar } from '@material-ui/core';


import CreativeItem from '../CreativeItem/CreativeItem';

import './CreativeGallery.scss';

export default function CreativeGallery(props) {

    console.log(props.showLess);

    let showLess = props.showLess;

    let lessProjects = '';
    let allProjects = '';

    switch (showLess !== null) {
        case (showLess === true):
            lessProjects = props.photography.slice(0, 3).map((project => {
                return (<Grid key={project.id} style={{ height: 250, width: 250 }}>
                    <figure className="img-container">
                        <img src={project.photo} alt={project.title} />
                    </figure>
                    {/* <GridListTileBar title={project.title} subtitle={project.description} /> */}
                </Grid>)
            }));

            break;

        case (showLess === false):
            allProjects = props.photography.map((project => {
                return (
                    <Grid item key={project.id} style={{ height: 600 }}>
                        <figure className="img-container">
                            <img src={project.photo} alt={project.title} />
                        </figure>
                        {/* <GridListTileBar title={project.title} subtitle={project.description} /> */}

                    </Grid>
                )
            }));

            break;

        default: break;

    }

    const useStyles = makeStyles((theme) => ({
        root: {
            overflow: 'hidden',
        },
        gridList: {
            width: 500,
            height: 450,

        },
        grid: {
            width: '100%',
            margin: '0px',
            overflow: 'hidden',
            //     display: 'flex',
            //     flexWrap: 'wrap',
            //     justifyContent: 'space-between',
        }
    }));

    const classes = useStyles();

    return (

        <section class="main-gallery">
            <div className="gallery">
                {/* <Container className={classes.root} > */}
                {showLess &&

                    <GridList className={classes.gridList} >{lessProjects}</GridList>
                }
                <Grid container spacing={8} className={classes.grid}>
                    {allProjects}
                </Grid>
                {/* <GridList cols={3} >{allProjects}</GridList> */}
                {/* </Container> */}

            </div>
        </section>

    )
}
