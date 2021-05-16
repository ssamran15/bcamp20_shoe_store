import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartOutlined from '@material-ui/icons/AddShoppingCartOutlined'
//import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    prodLinks: {
        textDecoration: 'none',
        color: 'black',
    },
    btnAddCart: {
        width: 100,
    },
});

const Men = () => {
    const [menSneakers, setSneakers] = useState([]);
    useEffect(() => {
        async function getSneakers() {
            const rsp = await fetch('https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=15&gender=men', {
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

    if (menSneakers.length === 0) {
        return (<Typography gutterBottom variant="h5" component="h2">
            Loading...
        </Typography>);
    }

    const dummUrl = "https://images.stockx.com/images/Air-Jordan-4-Retro-White-Oreo-2021-GS.jpg?";

    return (
        <Grid cotainer spacing={2} >
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {menSneakers.map((value) => (
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

export default Men;