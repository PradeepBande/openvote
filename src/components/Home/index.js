import React, { useEffect, useState } from 'react'
import { axiosGet } from '../../helpers/Axios';
import { Grid } from '@mui/material';
import Header from '../Header';

const Home = () => {
   return (
      <>
         <Header />
         <Grid container
            style={{
               display: 'flex', justifyContent: 'center', marginTop: '3rem',
               minHeight: '100%', marginBottom: 100
            }}
         >
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
               <h1>Crops</h1>
            </Grid>
         </Grid>
      </>
   )
}

export default Home