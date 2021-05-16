import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        //maxWidth: 500,
    },
    image: {
        width: 500,
        height: 500,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    black: {
        backgroundColor: 'black',
        margin: theme.spacing(1),
    },
    brown: {
        backgroundColor: '#a35709',
        margin: theme.spacing(1),
    },
    marginClass: {
        marginTop: 15,
    },
    sizeBtns: {
        margin: theme.spacing(1),
    },
    counter: {
        width: 65,
    },
    counterGroup: {
        marginLeft: 5,
        marginTop: 15,
    },
    btnCart: {
        marginLeft: 5,
        width: 165,
        marginTop: 15,
    }
}));

const MenDescript = ({cart}) => {
    const { shoe_id } = useParams();
    const [shoe_details, setShoeDetails] = useState([]);
    const [cartCount, setCartCount] = useState(1);
    const classes = useStyles();

    useEffect(() => {
        async function getShoeDetails(shoe_id) {
            const rsp = await fetch('https://v1-sneakers.p.rapidapi.com/v1/sneakers/' + shoe_id, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "fd2b36b56fmsh53c0d1f67e4b0dcp1a2914jsn7a77767fe69a",
                    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com"
                }
            });
            const data = await rsp.json();
            //console.log(data.results);
            setShoeDetails(data.results[0]);
        }
        getShoeDetails(shoe_id)
    }, [shoe_id]);

    const handleCounter = (op) => {
        if(op === '+')
        {
            const newVal = cartCount + 1;
            setCartCount(newVal);
        }
        else
        {
            if(cartCount === 1)
            {
                setCartCount(1);
            }
            else
            {
                const newVal = cartCount - 1;
                setCartCount(newVal);
            }            
        }
    }

    const handleAddCart = () => {
        //const newCart = ;
        //cart[1](cart[0].concat({'qty': cartCount, 'itemObj': shoe_details}));
        const newCart = cart[0].push({'qty': cartCount});
        cart[1](newCart);
        //console.log(cart[0]);
    }

    if (shoe_details.length === 0) {
        return (<Typography gutterBottom variant="h5" component="h2">
            Loading...
        </Typography>);

    }
    const dummUrl = "https://images.stockx.com/images/Air-Jordan-4-Retro-White-Oreo-2021-GS.jpg?";
    
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex"
                                src={shoe_details.media.imageUrl === null ? dummUrl : shoe_details.media.imageUrl} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} md container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h4">
                                    {shoe_details.title}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    ${shoe_details.retailPrice}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                    Colors
                                </Typography>
                                <Grid item container direction="row" spacing={1}>
                                    <Button size="small" color="primary">
                                        <Avatar className={classes.black}> </Avatar>
                                    </Button>
                                    <Button size="small" color="primary">
                                        <Avatar className={classes.brown}> </Avatar>
                                    </Button>

                                </Grid>
                                <Typography variant="h6" color="textSecondary" className={classes.marginClass}>
                                    Size
                                </Typography>
                                <Grid item container direction="row" spacing={2} >
                                    <Button variant="outlined" className={classes.sizeBtns}>40/6</Button>
                                    <Button variant="outlined" className={classes.sizeBtns}>41/7</Button>
                                    <Button variant="outlined" className={classes.sizeBtns}>42/8</Button>
                                    <Button variant="outlined" className={classes.sizeBtns}>43/9</Button>
                                    <Button variant="outlined" className={classes.sizeBtns}>44/10</Button>
                                    <Button variant="outlined" className={classes.sizeBtns}>45/11</Button>
                                </Grid>

                                <Typography variant="h6" color="textSecondary" className={classes.marginClass}>
                                    Brand: {shoe_details.brand}
                                </Typography>

                                <Grid item container direction="row" spacing={1}>
                                    <ButtonGroup size="large" aria-label="small outlined button group" className={classes.counterGroup}>
                                        <Button onClick={() => handleCounter('+')}>+</Button>
                                        <OutlinedInput id="item-count"
                                            inputProps={{ min: 1, style: { textAlign: 'center' } }}
                                            className={classes.counter}
                                            value={cartCount} />
                                        <Button onClick={() => handleCounter('-')}>-</Button>
                                    </ButtonGroup>
                                </Grid>

                                <Grid item container direction="row" spacing={1}>
                                    <Button variant="contained" color="primary"
                                        size="large"
                                        className={classes.btnCart}
                                        onClick={() => handleAddCart()}>
                                        Add to Cart
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Description
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant="body1" gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Fusce posuere risus sed justo ullamcorper, sit amet molestie nunc varius. 
                                Ut orci augue, laoreet tincidunt rhoncus non, ullamcorper in orci. 
                                Fusce gravida gravida tortor vel bibendum. Cras sed sem eget metus tincidunt rutrum quis nec dui. 
                                Maecenas sed diam tempus, convallis arcu volutpat, scelerisque augue. 
                                Nulla lacus metus, pulvinar sed ultricies in, mollis et metus. 
                                Donec aliquet finibus urna. Nullam sodales nisi vitae nunc vestibulum, at imperdiet enim fermentum.
                                Maecenas ut erat eget elit blandit lacinia vel a ex. 
                                Suspendisse enim est, pulvinar non urna in, bibendum efficitur risus. 
                                Quisque egestas, nulla ac facilisis sodales, augue turpis vestibulum est, bibendum aliquam massa erat hendrerit mauris. 
                                Nunc tempor nunc ultrices nisi feugiat, vehicula ornare eros suscipit. 
                                Nunc volutpat sem eget erat tincidunt, sed tristique ligula commodo. 
                                Suspendisse erat tellus, lobortis ac mi tempor, vulputate volutpat nisl. Nam id congue sapien.                                
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                            Nulla at hendrerit orci. Proin lacus urna, rutrum vel finibus nec, malesuada eu metus. 
                            Vivamus rutrum augue nisi, eu dignissim enim vehicula nec. 
                            Nam est risus, accumsan et venenatis quis, interdum in nibh. 
                            Mauris gravida sit amet turpis id accumsan. Maecenas accumsan orci eget lorem rhoncus, non tempus mi commodo. 
                            Maecenas semper pretium tempus.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>

    )
}

export default MenDescript;