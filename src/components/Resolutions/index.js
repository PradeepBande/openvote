import React, { useEffect, useState } from 'react'
import { axiosGet } from '../../helpers/Axios';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Header from '../Header';
import Row from './Row';
import { useNavigate } from 'react-router-dom';

const Resolutions = () => {
   const [resolutionsList, setResolutionsList] = useState([])
   const navigate = useNavigate()


   useEffect(() => {
      axiosGet('api/resolutions/get')
         .then((response) => {
            const { resolutions } = response
            if (resolutions)
               setResolutionsList(resolutions)
            console.log("Response")
         })
         .catch((error) => {
            console.log("Error --", error)
         })
   }, [])

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
               <h1>Candidates List</h1>
            </Grid>
            <br />
            <Grid item xs={12} md={10} style={{ display: 'flex', justifyContent: 'right', paddingRight: 20 }}>
               <Button variant="contained" color="success" onClick={() => navigate('/add-resolution')}>
                  Add Resolution
               </Button>
            </Grid>
            <br />
            <Grid item xs={12} md={10} style={{ padding: 10 }}>

               <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                     <TableHead>
                        <TableRow>
                           <TableCell />
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Resolution</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>City</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>State</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Created At</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {resolutionsList && resolutionsList.length > 0 && resolutionsList.map((row) => (
                           <Row key={row._id} row={row} />
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Grid>
         </Grid>
         {/* <Footer /> */}
      </>
   )
}

export default Resolutions