import { Box, Paper, Typography, styled } from "@mui/material";

function StatsNotePaper({average,backgroundColor,color,type}){
    const StyledPaper = styled(Paper)(() =>({
        width:"280px",
        height:"160px",
        padding:"10px",
        marginBottom:"25px",
        "&:hover":{
            opacity:.8,
        }
    }));
    return <StyledPaper elevation={2}>
                <Box style={{display:"flex",flexDirection:"column", justifyContent: "center",alignContent:"flex-start"}}>
                    <Typography variant="h3" style={{color:color,borderRadius:"2px", padding:"5px",textAlign:"center",fontFamily:"Arial",fontSize:"30px",fontWeight:"20px"}}>{type}</Typography>
                    <Typography style={{fontFamily:"Roboto",fontSize:"40px",fontWeight:900,textAlign:"center",padding:"10px",color:color}} >{average}</Typography>
                </Box>
           </StyledPaper>    
}

export default StatsNotePaper;
