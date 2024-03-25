import React, { useState } from 'react';

import { Paper, Grid } from '@mui/material'

import FarmImage from '../../images/farm.jpg'

import Register from './Register';
import LogIn from './LogIn';

export default function SignIn(props) {
   const [showSignIn, setShowSignIn] = useState(true)

   return (
      <Grid container component="main" sx={{ height: '100vh' }}>
         <Grid item xs={false} sm={6} md={8}
            sx={{
               backgroundImage: `url(${FarmImage})`,
               backgroundRepeat: 'no-repeat',
               backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
               backgroundSize: 'cover',
               backgroundPosition: 'center',
            }}
         >
         </Grid>
         <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
            {
               showSignIn ?
                  <LogIn setShowSignIn={setShowSignIn} />
                  :
                  <Register setShowSignIn={setShowSignIn} />
            }
         </Grid>
      </Grid>
   );
}
