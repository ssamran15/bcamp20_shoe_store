import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const MenDescript = () => {
    const { shoe_id } = useParams();
    return (
        <Grid cotainer spacing={4} >
            <Typography variant="h1" >
                MenDescript Page { shoe_id }
            </Typography>
        </Grid>
        
    )
}

export default MenDescript;