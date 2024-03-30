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
        localStorage.setItem('candidate_id', id)
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{ fontSize: 20 }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    <img src={process.env.REACT_APP_SERVER_URL + 'api/images/' + row?.candidate_image}
                        alt={"Crop_Image"} width="100" height="100" />
                </TableCell>
                <TableCell align="center">
                    <Typography style={{ fontSize: 20 }}>
                        {row?.candidate_name}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={process.env.REACT_APP_SERVER_URL + 'api/images/' + row?.party?.party_logo}
                            alt={"party image"} width="40" height="40" />
                        &nbsp;&nbsp;
                        <Typography style={{ fontSize: 20 }}>
                            {row?.party?.party_name}
                        </Typography>
                    </Grid>
                </TableCell>
                <TableCell align="center">
                    <Typography style={{ fontSize: 20 }}>
                        {row?.constituency?.constituency}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography style={{ fontSize: 20 }}>
                        {row?.city}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography style={{ fontSize: 20 }}>
                        {row?.district}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography style={{ fontSize: 20 }}>
                        {row?.state}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography style={{ fontSize: 20 }}>
                        {moment(row?.created_at).format('DD-MM-YYYY')}
                    </Typography>
                </TableCell>
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
            <TableRow>
                <TableCell></TableCell>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: '15px 5px' }} component={Paper}  >
                            <Typography variant="h5" gutterBottom component="div"
                                style={{ textAlign: 'center', textDecoration: 'underline', fontWeight: 'bold' }}
                            >
                                Candidate Info
                            </Typography>
                            {
                                row?.candidate_info ?
                                    <Typography style={{ padding: '10px 30px', fontSize: 20 }}>
                                        {row?.candidate_info}
                                    </Typography>
                                    :
                                    <Typography style={{ textAlign: 'center' }}>
                                        No Info avaialble
                                    </Typography>

                            }
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Row