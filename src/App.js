import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import PrivateRoute from './components/PrivateRoute';

import Login from './components/SignIn';
import Footer from './components/Footer';
import PublicRoute from './components/PublicRoute';
import Dashboard from './components/Dashboard';

import Constituency from './components/Constituency';

import Candidates from './components/Candidates';
import AddCandidate from './components/AddCandidate';

import Parties from './components/Parties';
import AddParty from './components/AddParty';

import AddResolution from './components/AddResolution';
import Resolutions from './components/Resolutions';
import Home from './components/Home';
import VoteCast from './components/VoteCast';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path='/' element={<PublicRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route exact path='/' element={<PublicRoute />}>
            <Route exact path="/vote" element={<VoteCast />} />
          </Route>
          <Route exact path='/' element={<PublicRoute />}>
            <Route exact path="/admin/login" element={<Login />} />
          </Route>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route exact path='/candidates' element={<PrivateRoute />}>
            <Route exact path="/candidates" element={<Candidates />} />
          </Route>
          <Route exact path='/add-candidate' element={<PrivateRoute />}>
            <Route exact path="/add-candidate" element={<AddCandidate />} />
          </Route>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path="/parties" element={<Parties />} />
          </Route>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path="/add-party" element={<AddParty />} />
          </Route>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path="/constituency" element={<Constituency />} />
          </Route>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path="/add-resolution" element={<AddResolution />} />
          </Route>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path="/resolutions" element={<Resolutions />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </ThemeProvider>
  );
}
