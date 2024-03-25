import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import PrivateRoute from './components/PrivateRoute';

import Login from './components/SignIn';
import Footer from './components/Footer';
import PublicRoute from './components/PublicRoute';
import Home from './components/Home';
import Constituency from './components/Constituency';
import Party from './components/AddParty';
import Candidates from './components/Candidates';
import AddCandidate from './components/AddCandidate';
import Parties from './components/Parties';
import AddParty from './components/AddParty';

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
          <Route exact path='/candidates' element={<PrivateRoute />}>
            <Route exact path="/candidates" element={<Candidates />} />
          </Route>
          <Route exact path='/add-candidate' element={<PrivateRoute />}>
            <Route exact path="/add-candidate" element={<AddCandidate />} />
          </Route>
          <Route exact path='/parties' element={<PrivateRoute />}>
            <Route exact path="/parties" element={<Parties />} />
          </Route>
          <Route exact path='/add-party' element={<PrivateRoute />}>
            <Route exact path="/add-party" element={<AddParty />} />
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
