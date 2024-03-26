import React, { useEffect, useState } from 'react'
import { axiosGet, axiosPost } from '../../helpers/Axios';
import { Button, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import Header from '../Header';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DropzoneArea } from "material-ui-dropzone";

const AddResolution = () => {
   const [resolution_name, setResolutionName] = useState('')
   const [resolution_info, setResolutionInfo] = useState('')
   const [resolution_image, setResolutionImage] = useState([])
   const [parties, setParties] = useState([])
   const [selectedCandidates, setSelectedCandidates] = useState(['', '', ''])
   const [selectedCandidatesIds, setSelectedCandidatesIds] = useState(['', '', ''])
   const [candidates, setCandidates] = useState([])
   const [party, setParty] = useState('Select Party')
   const [city, setCity] = useState('')
   const [state, setState] = useState('')
   const [district, setDistrict] = useState('')

   const onClickAdd = () => {
      let formData = new FormData()
      formData.append('resolution_name', resolution_name)
      formData.append('resolution_info', resolution_info)
      formData.append('resolution_image', resolution_image[0])
      formData.append('party', party)
      formData.append('city', city)
      formData.append('district', district)
      formData.append('state', state)

      axiosPost('api/resolutions/add', formData)
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

   useEffect(() => {
      axiosGet('api/candidates/get')
         .then((response) => {
            const { candidates } = response
            if (candidates)
               setCandidates(candidates)
            console.log("Response")
         })
         .catch((error) => {
            console.log("Error --", error)
         })
   }, [])

   useEffect(() => {

   }, [])

   const onChangeSelectCandidate = (id, index) => {
      let [candidate] = candidates.filter((c) => c._id == id)
      let data = selectedCandidates
      data[index] = candidate
      let ids = selectedCandidatesIds
      ids[index] = candidate?._id
      console.log("Ids --", ids, data, candidate, index)
      setSelectedCandidates([...data])
      setSelectedCandidatesIds([...ids])
   }

   const onClickRemove = (index) => {
      let data = selectedCandidates
      let ids = selectedCandidatesIds
      if (data.length > 2) {
         data.splice(index, 1)
         ids.splice(index, 1)
      }
      setSelectedCandidates([...data])
      setSelectedCandidatesIds([...ids])
   }

   const onClickAddCandidate = () => {
      let data = selectedCandidates
      let ids = selectedCandidatesIds
      data.push('')
      ids.push('')
      setSelectedCandidates([...data])
      setSelectedCandidatesIds([...ids])
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
               <h1>Add Resolution</h1>
            </Grid>
            <br />
            <Grid item xs={12} md={8} style={{ padding: 10 }}>
               <Grid item xs={12} md={12}>
                  <TextField margin="normal"
                     required fullWidth
                     id="resolution_name" label="Resolution Name"
                     name="resolution_name" autoFocus
                     value={resolution_name}
                     onChange={(e) => setResolutionName(e.target.value)}
                  />
               </Grid>
               <br />
               {
                  selectedCandidates.map((s, index) =>
                     <>
                        <Grid container item xs={12} md={12} spacing={1} style={{ alignItems: 'center' }}>
                           <Grid item xs={12} md={5}>
                              <Select
                                 id={"selectedCandidatesIds" + index}
                                 value={selectedCandidatesIds[index]}
                                 fullWidth
                                 onChange={(e) => onChangeSelectCandidate(e.target.value, index)}
                                 style={{ display: 'flex', alignItems: 'center' }}
                              >
                                 {
                                    candidates.map((c) => <MenuItem key={c?._id} value={c?._id}>
                                       <img src={process.env.REACT_APP_SERVER_URL + 'api/images/' + c?.candidate_image}
                                          alt={c.candidate_name} width="30" height="30" /> &nbsp;&nbsp;
                                       {c.candidate_name}
                                    </MenuItem>)
                                 }

                              </Select>
                           </Grid>
                           <Grid item xs={12} md={5} >
                              {
                                 selectedCandidates[index] && selectedCandidates[index]['party'] ?
                                    <MenuItem key={selectedCandidates[index]['party']._id}
                                       value={selectedCandidates[index]['party']._id}
                                       style={{ border: '1px solid gray', padding: 16 }}
                                    >
                                       <img src={process.env.REACT_APP_SERVER_URL + 'api/images/' + selectedCandidates[index]['party'].party_logo}
                                          alt={selectedCandidates[index]['party'].party_name} width="30" height="30" /> &nbsp;&nbsp;
                                       {selectedCandidates[index]['party'].party_name}
                                    </MenuItem>
                                    :
                                    null
                              }

                           </Grid>
                           {
                              selectedCandidates[index] && selectedCandidates[index]['party']
                                 && selectedCandidates.length > 2 && !selectedCandidates.includes('') ?
                                 <Grid item xs={12} md={2} >
                                    <Button variant="contained" color="error" onClick={() => onClickRemove(index)}>
                                       Remove
                                    </Button>

                                 </Grid>
                                 :
                                 null
                           }
                           <br />
                        </Grid>
                        <br />
                     </>
                  )
               }

               <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" color="primary"
                     onClick={onClickAddCandidate}
                  >
                     Add More Candidate
                  </Button>
               </Grid>
               <Grid item xs={12} md={12}>
                  <TextField margin="normal"
                     required fullWidth
                     id="resolution_info" label="Resolution Info"
                     name="resolution_info" autoFocus
                     value={resolution_info}
                     onChange={(e) => setResolutionInfo(e.target.value)}
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
                     Resolution Image
                     {/* <span style={{ fontSize: 12, color: 'red' }}>&nbsp;&nbsp;(can upload only one image)</span> */}
                  </Typography>
                  <DropzoneArea
                     Icon={CloudUploadIcon}
                     fileObjects={resolution_image}
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
                     onChange={(files) => setResolutionImage(files)}
                     acceptedFiles={[".bmp", ".png", ".jpg", ".jpeg"]}
                  />
               </Grid>
               <br /><br />
               <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                  <Button style={{ width: '80%' }} variant="contained" onClick={onClickAdd}>
                     Add Resolution
                  </Button>
               </Grid>
            </Grid>
         </Grid>
         {/* <Footer /> */}
      </>
   )
}

export default AddResolution