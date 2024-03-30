import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, TextField, FormControlLabel, Checkbox, Box, Grid } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { axiosPost } from '../../helpers/Axios';

export default function LogIn(props) {
   const navigate = useNavigate()

   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get('email')
      const password = data.get('password')

      axiosPost('api/admins/signin', { email, password })
         .then((res) => {
            if (res?.code === 'success') {
               const { token, admin } = res
               localStorage.setItem('token', token)
               localStorage.setItem('admin', JSON.stringify(admin))
               navigate('/dashboard')
            }
         })
         .catch((err) => {
            console.log("Error --", err)
         })
   };

   return (

      <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
            Sign in
         </Typography>
         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth
               id="email" label="Email Address/Phone number"
               name="email" autoComplete="email" autoFocus
            />
            <TextField margin="normal" required fullWidth
               name="password" label="Password" type="password"
               id="password" autoComplete="current-password"
            />
            <FormControlLabel
               control={<Checkbox value="remember" color="primary" />}
               label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
               Sign In
            </Button>
            <Grid container>
               <Grid item xs>
                  {/* <Link href="#" variant="body2"
                     style={{ color: '#000', textDecorationColor: '#000' }}
                  >
                     Forgot password?
                  </Link> */}
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
                     {"Don't have an account? Sign Up"}
                  </Typography>
               </Grid>
            </Grid>
            {/* <Copyright sx={{ mt: 5 }} /> */}
         </Box>
      </Box>
   );
}
