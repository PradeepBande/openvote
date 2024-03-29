import * as React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Tooltip } from '@mui/material';
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
    console.log("Row --", row)
    const onClickEdit = (id) => {
        localStorage.setItem('candidate_id', id)
        //   navigate('/crop-details')
    }

    const onClickDelete = (id) => {

    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{ fontSize: 20 }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <Typography style={{ fontSize: 20 }}>
                        {row?.resolution_name}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography style={{ fontSize: 20 }}>
                        {row?.city}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography style={{ fontSize: 20 }}>
                        {row?.state}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography style={{ fontSize: 20 }}>
                        {moment(row?.created_at).format('hh:mm:ss a')}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Grid>
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
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: '15px 5px' }} component={Paper}  >
                            <Grid container spacing={2}>
                                {
                                    row?.candidates.map((c, index) =>
                                        <Grid item xs={12} md={6}>
                                            <Card sx={{ maxWidth: 345 }}>
                                                <CardMedia
                                                    sx={{ height: 130, width:100, margin:'auto',margintop:10 }}
                                                    image={process.env.REACT_APP_SERVER_URL + 'api/images/' + c?.candidate_image}
                                                    // image="/static/images/cards/contemplative-reptile.jpg"
                                                    title="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {c.candidate_name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {c.candidate_info}
                                                    </Typography>
                                                </CardContent>
                                                {/* <CardActions>
                                                    <Button size="small">Share</Button>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions> */}
                                            </Card>
                                        </Grid>
                                    )
                                }

                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Row