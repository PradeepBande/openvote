import React, { useEffect, useState } from 'react'
import { axiosGet } from '../../helpers/Axios';
import { Grid, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';
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
            <Grid item xs={12} md={10} style={{ padding: 10 }}>
               <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                     <TableHead>
                        <TableRow>
                           <TableCell />
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Crop Image</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Crop Name</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Crop Date</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Created Date</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Created Time</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                     </TableHead>
                    
                  </Table>
               </TableContainer>
            </Grid>
         </Grid>
      </>
   )
}

export default Home