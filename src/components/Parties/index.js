import React, { useEffect, useState } from 'react'
import { axiosGet } from '../../helpers/Axios';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Header from '../Header';
import Row from './Row';
import { useNavigate } from 'react-router-dom';

const Parties = () => {
   const [partyList, setPartyList] = useState([])
   const navigate = useNavigate()


   useEffect(() => {
      axiosGet('api/party/get')
         .then((response) => {
            const { parties } = response
            if (parties)
               setPartyList(parties)
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
            <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'right', paddingRight: 20 }}>
               <Button variant="contained" color="success" onClick={() => navigate('/add-party')}>
                  Add Party
               </Button>
            </Grid>
            <br />
            <Grid item xs={12} md={8} style={{ padding: 10 }}>

               <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                     <TableHead>
                        <TableRow>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Image</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Name</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Created Date</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {partyList && partyList.length > 0 && partyList.map((row) => (
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

export default Parties