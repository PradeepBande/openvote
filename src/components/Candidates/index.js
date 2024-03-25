import React, { useEffect, useState } from 'react'
import { axiosGet, axiosPost } from '../../helpers/Axios';
import { Button, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Header from '../Header';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DropzoneArea } from "material-ui-dropzone";
import Row from './Row';

const Candidates = () => {
   const [candidateList, setCandidateList] = useState([])


   useEffect(() => {
      axiosGet('api/candidates/get')
         .then((response) => {
            const { candidates } = response
            if (candidates)
               setCandidateList(candidates)
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
            <Grid item xs={12} md={10} style={{ padding: 10}}>

               <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                     <TableHead>
                        <TableRow>
                           <TableCell />
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Image</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Name</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Info</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>City</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>District</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>State</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Created Date</TableCell>
                           <TableCell align="center" style={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {candidateList && candidateList.length>0 &&candidateList.map((row) => (
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

export default Candidates