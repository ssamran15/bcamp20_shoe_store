import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Men from './components/Men';
import Women from './components/Women';
import Kids from './components/Kids';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Container, Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(2),
  },
}));

const sections = [
  { title: 'Home', url: '/' },
  { title: 'Men', url: '/men' },
  { title: 'Women', url: '/women' },
  { title: 'Kids', url: '/kids' },
];

function App() {

  const classes = useStyles();

  return (
    <Router>
      <CssBaseline />
      <Header sections={sections} />
      <Container spacing={4} maxWidth="lg">
        
        <main>
          <Grid cotainer spacing={3} className={classes.mainGrid}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='men' element={<Men />} />
              <Route path='women' element={<Women />} />
              <Route path='kids' element={<Kids />} />

            </Routes>
          </Grid>
        </main>

      </Container>


    </Router>
  );
}

export default App;
