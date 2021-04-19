import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
                return (<GridListTile key={project.id} cols={project.cols}>
                    <img src={project.photo} alt={project.title} />
                    {/* <GridListTileBar title={project.title} subtitle={project.description} /> */}
                </GridListTile>)
            }));

            break;

        case (showLess === false):
            allProjects = props.photography.map((project => {
                return (
                    <GridListTile key={project.id} cols={project.cols} style={{ height: 500 }}>
                        <img src={project.photo} alt={project.title} />
                        {/* <GridListTileBar title={project.title} subtitle={project.description} /> */}

                    </GridListTile>
                )
            }));

            break;

        default: break;

    }



    return (

        <section class="main-gallery">
            <Container>
                {showLess &&

                    <GridList celHeigth={300} cols={1}>{lessProjects}</GridList>
                }
                <GridList celHeigth={600} cols={3} >{allProjects}</GridList>
            </Container>
        </section>

    )
}
