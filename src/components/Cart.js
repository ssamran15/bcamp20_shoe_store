import React from 'react';
import {Grid, Typography} from '@material-ui/core';

const Cart = ({cart}) => {
    console.log(cart)
    return (
        <Grid container spacing={2}>
            <Typography variant="h1">
                Cart Items
            </Typography>
        </Grid>
    )
}

export default Cart;