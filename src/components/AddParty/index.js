import React, { useState } from 'react'
import { axiosPost } from '../../helpers/Axios';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Header from '../Header';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DropzoneArea } from "material-ui-dropzone";

const AddParty = () => {
   const [party_name, setPartyName] = useState('')
   const [party_logo, setPartyLogo] = useState(null)

   const onClickAdd = () => {
      let formData = new FormData()
      formData.append('party_name', party_name)
      formData.append('party_logo', party_logo[0])

      axiosPost('api/party/add', formData)
         .then((res) => {
            console.log("Response--", res)
         })
         .catch((error) => {
            console.log("Error --", error)
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
               <h1>Add Party</h1>
            </Grid>
            {/* <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
               <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: '100%' }}>
                  <DatePicker
                     fullWidth
                     format="DD-MM-YYYY"
                     id="date"
                     label="Crop Date"
                     name="date"
                     value={crop_date}
                     onChange={(e) => setCropDate(e)}
                     style={{ width: '100%' }}
                  />
               </LocalizationProvider>
            </Grid> */}
            <br />
            <Grid item xs={12} md={12} style={{ padding: 10, maxWidth: '600px' }}>
               <Grid item xs={12} md={12}>
                  <TextField margin="normal"
                     required fullWidth
                     id="party_name" label="Party Name"
                     name="party_name" autoFocus
                     value={party_name}
                     onChange={(e) => setPartyName(e.target.value)}
                  />
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
                     Crop Main Image
                     {/* <span style={{ fontSize: 12, color: 'red' }}>&nbsp;&nbsp;(can upload only one image)</span> */}
                  </Typography>
                  <DropzoneArea
                     Icon={CloudUploadIcon}
                     fileObjects={party_logo}
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
                     onChange={(files) => setPartyLogo(files)}
                     acceptedFiles={[".bmp", ".png", ".jpg", ".jpeg"]}
                  />
               </Grid>
               <br /><br />
               <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                  <Button style={{ width: '80%' }} variant="contained" onClick={onClickAdd}>
                     Add Party
                  </Button>
               </Grid>
            </Grid>
         </Grid>
         {/* <Footer /> */}
      </>
   )
}

export default AddParty