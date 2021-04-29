import React from 'react';

import { Grid } from '@material-ui/core';


export default function MiniGallery(props) {


    return (

        <Grid container spacing={3}>
            {props.showLessPhotography}
            {props.showLessGraphic}
        </Grid>
    )
}
