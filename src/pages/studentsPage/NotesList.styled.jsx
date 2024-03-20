import {TableContainer,styled } from '@mui/material';

const StyledTableContainer =styled(TableContainer)(() =>({
    marginTop:"5px",
    marginBottom:"30px !important",
    borderRadius:"5px !important",
    '& .MuiTableHead-root':{
      position:"sticky !important",
      top:0
    },
    '& .MuiTableHead-root tr th':{
      color:"#000 !important",
      // backgroundColor:"#000 !important"
    },
    '& .MuiTableBody-root .MuiTableRow-root:nth-child(odd)':{
      backgroundColor:"#F4F4F4 !important",
    },  
    '& .MuiTableRow-root td':{
      color:"#000",
      fontFamily:"Roboto !important",
      fontWeigth:700,
      fontSize:"16px !important"
    }
}));

export default StyledTableContainer;