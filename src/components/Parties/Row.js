import * as React from 'react';
import { Grid, Paper, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import QrCodeIcon from '@mui/icons-material/QrCode';

const Row = (props) => {
   const { row } = props;
   const [open, setOpen] = React.useState(false);
   const navigate = useNavigate()

   const onClickEdit = (id) => {
      localStorage.setItem('party_id', id)
    //   navigate('/crop-details')
   }

   const onClickDelete = (id) => {

   }
   
   return (
      <React.Fragment>
         <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            {/* <TableCell>
               <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell> */}
            <TableCell component="th" scope="row" align="center">
               <img src={process.env.REACT_APP_SERVER_URL + 'api/images/' + row?.party_logo}
                  alt={row?.party_name} width="100" height="100" />
            </TableCell>
            <TableCell align="center">{row?.party_name}</TableCell>
            <TableCell align="center">{moment(row?.created_at).format('DD-MM-YYYY')}</TableCell>
            <TableCell align="center">
               <Grid>
                  {/* <Tooltip title="Generate QR Code">
                     <IconButton aria-label="view row" size="small" onClick={() => onClickGenerateQRCode(row?.crop_id)}>
                        <QrCodeIcon />
                     </IconButton>
                  </Tooltip> */}

                  <Tooltip title="Edit Crop">
                     <IconButton aria-label="edit row" size="small" onClick={() => onClickEdit(row?.crop_id)}>
                        <EditIcon />
                     </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Crop">
                     <IconButton aria-label="delete row" size="small" onClick={() => onClickEdit(row?.crop_id)}>
                        <DeleteIcon />
                     </IconButton>
                  </Tooltip>
               </Grid>
            </TableCell>
         </TableRow>
      </React.Fragment>
   );
}

export default Row