import { Box, Paper, Typography, styled } from "@mui/material";

function StatsNotePaper({average,backgroundColor,type}){
    const StyledPaper = styled(Paper)(() =>({
        width:"300px",
        height:"220px",
        padding:"10px",
        backgroundColor:backgroundColor,
        "&:hover":{
            opacity:.8,
        }
    }));
    return <StyledPaper elevation={10}>
                <Box style={{height:"100%",display:"flex",flexDirection:"column", justifyContent: "center",alignContent:"flex-start"}}>
                    <Typography variant="h3" style={{color:"#fff",borderRadius:"2px", padding:"5px",textAlign:"center",fontFamily:"Arial",fontSize:"30px",fontWeight:"20px"}}>{type}</Typography>
                    <Typography style={{fontFamily:"Roboto",fontSize:"40px",fontWeight:900,textAlign:"center",padding:"10px",color:"#000"}} >{average}</Typography>
                </Box>
           </StyledPaper>    
}

export default StatsNotePaper;
