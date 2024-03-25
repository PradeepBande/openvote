import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import { Grid, Typography } from '@mui/material';

const Footer = () => {
   const [value, setValue] = React.useState(0);
   return (
      <Box sx={{ width: '100vw', position: 'fixed', bottom: 0, background: '#00AB66' }}>
         <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
               setValue(newValue);
            }}
            sx={{ height: '80px', background: '#00AB66', display: 'flex', alignItems: 'center' }}
         >
            <Grid container item sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, justifyContent: 'center' }}>
               <Typography style={{ padding: '0px 10px', textAlign: 'center' }}>
                  Copyright © 2024 OpenVote. All Rights Reserved.
               </Typography>
            </Grid>

            <Grid container item sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' } }}>
               <Typography style={{ padding: '0px 10px', textAlign: 'center' }}>
                  Copyright © 2024 OpenVote. <br />All Rights Reserved.
               </Typography>
            </Grid>
         </BottomNavigation>
      </Box>
   );
}

export default Footer