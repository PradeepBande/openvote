import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, TextField, Box, Grid, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { axiosPost } from '../../helpers/Axios';

export default function Register(props) {
   const navigate = useNavigate()

   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const name = data.get('name')
      const email = data.get('email')
      const phone = data.get('phone')
      const password = data.get('password')
      const confirm_password = data.get('confirm_password')
      const address = data.get('address')
      const city = data.get('city')
      if (!email && !phone) {
         alert("Please, Enter one of field email or Phone or both")
      } else if (!password) {
         alert("Please, Enter password")
      }
      else if (password !== confirm_password) {
         alert("Password mismatch. Please, confirm password")
      } else {
         axiosPost('api/admins/register', { name, email, password, address, phone, city })
            .then((res) => {
               if (res?.code === 'success') {

                  const { token, admin } = res
                  localStorage.setItem('token', token)
                  localStorage.setItem('admin', JSON.stringify(admin))
                  navigate('/home')
               }
            })
            .catch((err) => {
               console.log("Error --", err)
            })
      }
   };

   return (
      <Box sx={{ my: 4, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
            Sign Up
         </Typography>
         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth
               id="name" label="Name"
               name="name" autoFocus
            />
            <TextField margin="normal" required fullWidth
               id="email" label="Email Address"
               name="email" autoComplete="email"
            />

            <TextField margin="normal" required fullWidth
               name="phone" label="Phone Number" type="text"
               id="phone"
            />

            <TextField margin="normal" required fullWidth
               name="password" label="Password" type="password"
               id="password" autoComplete="current-password"
            />

            <TextField margin="normal" required fullWidth
               name="confirm_password" label="Confirm Password" type="password"
               id="confirm_password"
            />

            <TextField margin="normal" required fullWidth
               name="address" label="Address" type="text"
               id="address"
            />

            <TextField margin="normal" required fullWidth
               name="city" label="City" type="text"
               id="city"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
               Register
            </Button>
            <Grid container>
               <Grid item xs>
               </Grid>
               <Grid item>
                  <Typography variant="body1"
                     style={{
                        color: '#000',
                        textDecoration: 'underline',
                        textDecorationColor: '#000',
                        cursor: 'pointer'
                     }}
                     onClick={() => props.setShowSignIn(prev => !prev)}
                  >
                     {"Already have account? Sign In"}
                  </Typography>
               </Grid>
            </Grid>
            {/* <Copyright sx={{ mt: 5 }} /> */}
         </Box>
      </Box>
   );
}
