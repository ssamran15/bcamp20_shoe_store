import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, Card, CardActionArea, CardMedia, Grid,
    GridList, GridListTile, GridListTileBar, IconButton
} from '@material-ui/core';
import AddShoppingCartOutlined from '@material-ui/icons/AddShoppingCartOutlined'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: 'white',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: 40,
        border: '1px solid #393e46',
        borderRadius: 40
    },

    root2: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginTop: 40,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    imgHeight: {
        height: '70vh',
    }
}));

const Home = () => {
    const classes = useStyles();
    const [menData, setMenData] = useState([]);
    const [womenData, setWomenData] = useState([]);

    useEffect(() => {
        async function getMenData() {
            const rsp = await fetch('https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=10', {
                'method': 'GET',
                'headers': {
                    "x-rapidapi-key": "fd2b36b56fmsh53c0d1f67e4b0dcp1a2914jsn7a77767fe69a",
                    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
                }
            });
            const data = await rsp.json();

            setMenData(data.results);
            getWomenData();
        }

        async function getWomenData() {
            const rsp = await fetch('https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=10&gender=women', {
                'method': 'GET',
                'headers': {
                    "x-rapidapi-key": "fd2b36b56fmsh53c0d1f67e4b0dcp1a2914jsn7a77767fe69a",
                    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
                }
            });
            const data = await rsp.json();

            setWomenData(data.results);
        }
        getMenData();
        
    }, []);

    if (menData.length === 0 || womenData.length === 0) {
        return (<Typography gutterBottom variant="h5" component="h2">
            Loading...
        </Typography>);
    }

    return (
        <div className={classes.root}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Home Banner"
                        image="https://cdn.shopify.com/s/files/1/0401/5138/4228/files/ShoePlanet-Banner-1728-x-702-b_1512x.png?v=1619412367"
                        title="Home Banner"
                    />
                </CardActionArea>
            </Card>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={1} className={classes.paper}>
                    <Typography variant="h5" component="h5">
                        Men
                    </Typography>
                </Grid>
            </Grid>
            <div className={classes.root2}>
                <GridList className={classes.gridList} cols={5}>
                    {menData.slice(5).map((tile) => (
                        <GridListTile key={tile.id} className={classes.imgHeight}>
                            <img src={tile.media.imageUrl} alt={tile.title} />
                            <GridListTileBar
                                title={tile.name}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>

            <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={1} className={classes.paper}>
                    <Typography variant="h5" component="h5">
                        Women
                    </Typography>
                </Grid>
            </Grid>
            <div className={classes.root2}>
                <GridList className={classes.gridList} cols={5}>
                    {womenData.slice(5).map((tile) => (
                        <GridListTile key={tile.id} className={classes.imgHeight}>
                            <img src={tile.media.imageUrl} alt={tile.title} />
                            <GridListTileBar
                                title={tile.name}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </div>
    );
}

export default Home;