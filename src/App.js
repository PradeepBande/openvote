import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import PrivateRoute from './components/PrivateRoute';

import Login from './components/SignIn';
import Footer from './components/Footer';
import PublicRoute from './components/PublicRoute';
import Home from './components/Home';

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
          <Route exact path='/' element={<PublicRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </ThemeProvider>
  );
}
