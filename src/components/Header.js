import React from 'react';
import { AppBar, Badge, Toolbar, IconButton, Typography } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { Link, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: 'white',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuLinks: {
        textDecoration: 'none',
        padding: '5px 15px 5px 15px',
        margin: '5px 15px 5px 15px',
        color: '#7a7a7a',
        fontFamily: '"Segoe UI"',
        fontWeight: 600,
        fontSize: 16,
        '&:hover': {
            backgroundColor: "#a0937d",
            color: '#FFFF'
        },
    },
    activeLink: {
        backgroundColor: "#a0937d",
        color: '#FFFF'        
    },
    mainMenu: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 0,
        //minWidth: '13%',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color: 'white',
        backgroundColor: '#393e46',
        //fontFamily: '"Segoe UI"',
        padding: '5px 10px 5px 10px',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },

}));

export default function Header({ sections }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar >
                    <Typography className={classes.title} variant="h6" noWrap>
                        Sneakers Store
                    </Typography>

                    <Typography className={classes.mainMenu}>
                        {sections.map((val, index) => {
                            return (<NavLink exact to={val.url} 
                                className={classes.menuLinks} 
                                key={index}
                                activeClassName={classes.activeLink}>
                                {val.title}
                                </NavLink>)
                        })}
                    </Typography>
                    <div className={classes.search}>
                        <IconButton aria-label="Search" >
                            <SearchIcon />
                        </IconButton>
                        <IconButton aria-label="Show your Cart" >
                            <Link to="/cart">
                                <Badge badgeContent={1} color="primary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </Link>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
