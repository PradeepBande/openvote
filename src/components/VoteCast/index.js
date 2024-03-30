import React, { useEffect, useState } from 'react'
import { axiosGet, axiosPost } from '../../helpers/Axios';
import { Button, FormControlLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Header from '../Header';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VoteCast = () => {
   const [candidateList, setCandidateList] = useState([])
   const [searchParams, setSearchParams] = useSearchParams();
   const resolution_id = searchParams.get("id");
   const [resolution, setResolution] = useState(null)
   const [candidate, setCandidate] = useState(null)
   const [location, setLocation] = useState({})
   const navigate = useNavigate()

   useEffect(() => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(success);
      } else {
         console.log("Geolocation not supported");
      }

      function success(position) {
         const latitude = position.coords.latitude;
         const longitude = position.coords.longitude;
         setLocation({ latitude, longitude })
         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      }
   }, [])

   useEffect(() => {
      if (resolution_id) {
         axiosGet('api/resolutions/get-by-id/' + resolution_id)
            .then((response) => {
               console.log("Response =--", response)
               setResolution(response?.resolution)
            })
            .catch((err) => {
               console.log("error --", err)
            })
      }
   }, [resolution_id])

   const handleOnClickCasteVote = () => {
      axiosPost('api/votes/vote', {
         resolution, candidate,
         constituency: resolution?.constituency?._id,
         location
      })
         .then((res) => {
            console.log("Response --", res)
         })
         .catch((err) => {
            console.log("Error --", err)
         })
   }

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
               <h1>Cast Vote</h1>
            </Grid>
            {/* <br />
            <Grid item xs={12} md={10} style={{ display: 'flex', justifyContent: 'right', paddingRight: 20 }}>
               <Button variant="contained" color="success" onClick={() => navigate('/add-candidate')}>
                  Save
               </Button>
            </Grid> */}
            <br />
            <Grid container item xs={12} md={6}>
               <Grid item xs={12} component={Paper} style={{ padding: 20 }}>
                  <Typography variant="h5" component="div">
                     {
                        resolution?.resolution_name
                     }
                  </Typography>
               </Grid>
               <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={candidate}
                  name="radio-buttons-group"
                  style={{ width: '100%' }}
               // onChange={(e) => setCandidate(e.target.value)}
               >
                  <Grid container item xs={12}>
                     {
                        resolution?.candidates?.map((c, index) =>
                           <Grid container item xs={12} component={Paper}
                              style={{ padding: 20, marginTop: 30 }}
                              onClick={() => setCandidate(c._id)}
                              sx={{
                                 ':hover': {
                                    border: candidate != c._id ? '1px solid aqua' : 'none'
                                 },
                                 cursor: 'pointer'
                                 // border: candidate == c._id ? '2px solid green' : 'none'
                              }}
                           >
                              <Grid item xs={2} md={1}>
                                 <FormControlLabel value={c?._id} control={<Radio />} />
                              </Grid>
                              <Grid item xs={10} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                 <img src={process.env.REACT_APP_SERVER_URL + 'api/images/' + c?.candidate_image}
                                    alt={"Crop_Image"} width="40" height="40" />
                                 <Typography variant='h5' component='div' style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                    {c?.candidate_name}
                                 </Typography>
                              </Grid>
                              <Grid item xs={10} md={5} style={{ display: 'flex', alignItems: 'center' }}>
                                 <img src={process.env.REACT_APP_SERVER_URL + 'api/images/' + c?.party?.party_logo}
                                    alt={"Crop_Image"} width="40" height="40" />
                                 <Typography variant='h5' component='div' style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                    {c?.party?.party_name}
                                 </Typography>
                              </Grid>
                           </Grid>
                        )
                     }
                  </Grid>
               </RadioGroup>

               <Grid item xs={12} style={{ marginTop: 50, padding: 20, textAlign: 'center' }}>
                  <Button
                     variant="contained"
                     onClick={handleOnClickCasteVote}
                     color="primary"
                  >
                     Cast Vote
                  </Button>
               </Grid>
            </Grid>
         </Grid>
         {/* <Footer /> */}
      </>
   )
}

export default VoteCast