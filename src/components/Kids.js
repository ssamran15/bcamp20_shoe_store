import React, {useEffect, useState} from 'react';
import {Grid, Typography, Card, CardActionArea, CardMedia, CardContent, CardActions, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartOutlined from '@material-ui/icons/AddShoppingCartOutlined'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    prodLinks: {
        textDecoration: 'none',
        color: 'black',
    }
});

const Kids = () => {

    //const genders = {0: "CHILD", 1: "INFANT", 2: "MEN", 3: "PRESCHOOL", 4: "TODDLER", 5: "UNISEX", 6: "WOMEN"}
    const [kidsSneakers, setSneakers] = useState([]);
    useEffect(() => {
        async function getSneakers() {
            const rsp = await fetch('https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=15&gender=TODDLER', {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "fd2b36b56fmsh53c0d1f67e4b0dcp1a2914jsn7a77767fe69a",
                    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
                }
            });
            const sneakData = await rsp.json();
            setSneakers(sneakData.results);
        }
        getSneakers();
    }, [])
    const classes = useStyles();

    if (kidsSneakers.length === 0) {
        return (<Typography gutterBottom variant="h5" component="h2">
            Loading...
        </Typography>);
    }

    const dummUrl = "https://images.stockx.com/images/Air-Jordan-4-Retro-White-Oreo-2021-GS.jpg?";

    return (
        <Grid cotainer spacing={2} >
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {kidsSneakers.map((value) => (
                        <Grid key={value.id} item xs={12} md={3} lg={3}>

                            <Card className={classes.root}>
                                <CardActionArea>
                                    <Link to={`/men/${value.id}`} key={value.id} className={classes.prodLinks}>
                                        <CardMedia
                                            component="img"
                                            alt={value.name}
                                            image={value.media.imageUrl === null ? dummUrl : value.media.imageUrl}
                                            title={value.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {value.name}
                                            </Typography>
                                            {/*<Typography variant="body2" color="textSecondary" component="p">
                                            {value.title}
                                        </Typography>*/}
                                        </CardContent>
                                    </Link>
                                </CardActionArea>
                                <CardActions>
                                    <Grid container justify="flex-start">
                                        {/* <FavoriteBorderIcon />
                                        <Typography variant="body1" display="block" gutterBottom>
                                            {Math.floor(Math.random() * 500)}
                                        </Typography> */}

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            startIcon={<AddShoppingCartOutlined />}
                                        >Add to Cart</Button>
                                    </Grid>
                                    <Grid container justify="flex-end">
                                        <Typography variant="h6" component="h6">Price: ${value.retailPrice}</Typography>
                                    </Grid>
                                </CardActions>
                            </Card>

                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Kids;