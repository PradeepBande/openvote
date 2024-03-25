import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import PrivateRoute from './components/PrivateRoute';

import Login from './components/SignIn';
import Footer from './components/Footer';
import PublicRoute from './components/PublicRoute';
import Home from './components/Home';
import Candidate from './components/Candidate';
import Constituency from './components/Constituency';
import Party from './components/Party';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path='/admin/login' element={<PublicRoute />}>
            <Route exact path="/admin/login" element={<Login />} />
          </Route>
          <Route exact path='/home' element={<PrivateRoute />}>
            <Route exact path="/home" element={<Home />} />
          </Route>
          <Route exact path='/candidate' element={<PrivateRoute />}>
            <Route exact path="/candidate" element={<Candidate />} />
          </Route>
          <Route exact path='/party' element={<PrivateRoute />}>
            <Route exact path="/party" element={<Party />} />
          </Route>
          <Route exact path='/constituency' element={<PrivateRoute />}>
            <Route exact path="/constituency" element={<Constituency />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </ThemeProvider>
  );
}
