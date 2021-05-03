import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

const Men = () => {
    const [menSneakers, setSneakers] = useState([]);
    useEffect(() => {
        async function getSneakers() {
            const rsp = await fetch('https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=15', {
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

    if (menSneakers.length === 0)
    {
        return 'Loading...';
    }

    return (
        <Grid cotainer spacing={2} >
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {menSneakers.map((value) => (
                        <Grid key={value} item>

                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={value.name}
                                        height="140"
                                        image={value.media.imageUrl}
                                        title={value.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {value.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {value.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">Share</Button>
                                    <Button size="small" color="primary">Learn More</Button>
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