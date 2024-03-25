import React, { useEffect, useState } from 'react'
import { axiosPost } from '../../helpers/Axios';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Header from '../Header';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DropzoneArea } from "material-ui-dropzone";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

const Constituency = () => {
   const [crop_name, setCropName] = useState('')
   const [crop_image, setCropImage] = useState(null)
   const [files, setFiles] = useState([]);
   const [crop_date, setCropDate] = useState(dayjs())

   useEffect(() => {
      console.log("Crop_Image--", crop_image)
   }, [crop_image])

   const onClickAdd = () => {
      let formData = new FormData()
      formData.append('crop_name', crop_name)
      formData.append('crop_date', crop_date)
      formData.append('crop_image_file', crop_image[0])
      if (files && files.length > 0) {
         for (let i = 0; i < files.length; i++)
            formData.append('crop_other_image_files', files[i])
      }

      axiosPost('api/crops/add', formData)
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
               <h1>Add Crop</h1>
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
                     id="crop_name" label="Crop Name"
                     name="crop_name" autoFocus
                     value={crop_name}
                     onChange={(e) => setCropName(e.target.value)}
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
                     fileObjects={crop_image}
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
                     onChange={(files) => setCropImage(files)}
                     acceptedFiles={[".bmp", ".png", ".jpg", ".jpeg"]}
                  />
               </Grid>
               <br /><br />
               <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                  <Button style={{ width: '80%' }} variant="contained" onClick={onClickAdd}>
                     Add Crop
                  </Button>
               </Grid>
            </Grid>
         </Grid>
         {/* <Footer /> */}
      </>
   )
}

export default Constituency