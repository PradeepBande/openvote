import React, { useEffect, useState } from 'react'
import { axiosGet, axiosPost } from '../../helpers/Axios';
import { Button, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import Header from '../Header';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DropzoneArea } from "material-ui-dropzone";

const Candidate = () => {
   const [candidate_name, setCandidateName] = useState('')
   const [candidate_info, setCandidateInfo] = useState('')
   const [candidate_image, setCandidateImage] = useState([])
   const [parties, setParties] = useState([])
   const [party, setParty] = useState('Select Party')
   const [city, setCity] = useState('')
   const [state, setState] = useState('')
   const [district, setDistrict] = useState('')

   const onClickAdd = () => {
      let formData = new FormData()
      formData.append('candidate_name', candidate_name)
      formData.append('candidate_info', candidate_info)
      formData.append('candidate_image', candidate_image[0])
      formData.append('party', party)
      formData.append('city', city)
      formData.append('district', district)
      formData.append('state', state)

      axiosPost('api/candidates/add', formData)
         .then((res) => {
            console.log("Response--", res)
         })
         .catch((error) => {
            console.log("Error --", error)
         })
   }

   useEffect(() => {
      axiosGet('api/party/get')
         .then((response) => {
            const { parties } = response
            if (parties)
               setParties(parties)
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
               <h1>Add Candidate</h1>
            </Grid>
            <br />
            <Grid item xs={12} md={12} style={{ padding: 10, maxWidth: '600px' }}>
               <Grid item xs={12} md={12}>
                  <TextField margin="normal"
                     required fullWidth
                     id="candidate_name" label="Candidate Name"
                     name="candidate_name" autoFocus
                     value={candidate_name}
                     onChange={(e) => setCandidateName(e.target.value)}
                  />
               </Grid>
               <br />

               <Grid item xs={12} md={12}>
                  {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
                  <Select
                     // labelId="demo-multiple-name-label"
                     id="party"
                     value={party}
                     fullWidth
                     onChange={(e) => setParty(e.target.value)}
                     style={{ display: 'flex', alignItems: 'center' }}
                  // input={<OutlinedInput label="Select Party" />}
                  >

                     {
                        parties.map((p) => <MenuItem key={p._id} value={p._id}>
                           <img src={process.env.REACT_APP_SERVER_URL + 'api/images/' + p.party_logo}
                              alt={p.party_name} width="30" height="30" /> &nbsp;&nbsp;
                           {p.party_name}
                        </MenuItem>)
                     }

                  </Select>
               </Grid>
               <br />

               <Grid item xs={12} md={12}>
                  <TextField margin="normal"
                     required fullWidth
                     id="candidate_info" label="Candidate Info"
                     name="candidate_info" autoFocus
                     value={candidate_info}
                     onChange={(e) => setCandidateInfo(e.target.value)}
                     multiline
                     rows={3}
                  />
               </Grid>
               <br />

               <Grid container item xs={12} spacing={2}>
                  <Grid item xs={12} md={6}>
                     <TextField margin="normal"
                        required fullWidth
                        id="city" label="City"
                        name="city" autoFocus
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                     />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={6}>
                     <TextField margin="normal"
                        required fullWidth
                        id="district" label="District"
                        name="district" autoFocus
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                     />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={6}>
                     <TextField margin="normal"
                        required fullWidth
                        id="state" label="State"
                        name="state" autoFocus
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                     />
                  </Grid>
                  <br />
               </Grid>

               <br />
               <Grid item xs={12} md={12}>
                  <Typography variant="h6"
                     style={{
                        marginBottom: 10, textAlign: 'center',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center'
                     }}
                  >
                     Candidate Image
                     {/* <span style={{ fontSize: 12, color: 'red' }}>&nbsp;&nbsp;(can upload only one image)</span> */}
                  </Typography>
                  <DropzoneArea
                     Icon={CloudUploadIcon}
                     fileObjects={candidate_image}
                     showFileNames
                     id="file-upload"
                     dropzoneText="Drag 'n' Drop File Here Or"
                     showAlerts={false}
                     filesLimit={1}
                     alertSnackbarProps={{
                        anchorOrigin: {
                           vertical: "top",
                           horizontal: "center",
                        },
                     }}
                     maxFileSize={9000000000}
                     showPreviews={true}
                     showPreviewsInDropzone={false}
                     useChipsForPreview
                     previewGridProps={{ container: { spacing: 1, direction: "row" } }}
                     previewText="Selected files"
                     onChange={(files) => setCandidateImage(files)}
                     acceptedFiles={[".bmp", ".png", ".jpg", ".jpeg"]}
                  />
               </Grid>
               <br /><br />
               <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                  <Button style={{ width: '80%' }} variant="contained" onClick={onClickAdd}>
                     Add Candidate
                  </Button>
               </Grid>
            </Grid>
         </Grid>
         {/* <Footer /> */}
      </>
   )
}

export default Candidate