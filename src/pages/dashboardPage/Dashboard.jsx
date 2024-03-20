import MainLayout from "./../../layout/MainLayout";
import { Box } from '@material-ui/core';
import StatsNotePaper from "../../components/StatsNotePaper";
import ChartAverage from "../../components/ChartAverage";
import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import  { StudentsServices } from "./../../services/index";
import { BASE_URL } from "./../../const/baseURL";


function Dashboard(){
    const [averageList, setAverageList] = useState([]);
    const [averageData, setAverageData] = useState(null);
    const [classAverage,setClassAverage ] = useState(0);
    const [studentMaxAverage,setStudentMaxAverage] = useState(0);
    const [studentMinAverage,setStudentMinAverage] = useState(0);
    const [nbPassant, setNbPassant] = useState(0);
    const [nbRedoublant, setNbRedoublant] = useState(0);


    useEffect(() => {
        const fetchAverageNotes = async () => {
            try {
                const data = await StudentsServices.getAverageNote(`${BASE_URL}/students/notes/average`);
                setAverageList(data.map((average) => average.average_note));
            } catch (err) {
                console.error("Error occurred during the fetch Average list: " + err);
            }
        };
        fetchAverageNotes();
    }, []);

    useEffect(() => {
        if (averageList.length > 0) {
            const count = [0, 0, 0, 0];
            averageList.forEach(average => {
                if (average >= 0 && average <=5) {
                    count[0] += 1;
                } else if (average >5 && average <=10) {
                    count[1] += 1;
                } else if (average >10 && average <=15) {
                    count[2] += 1;
                } else if (average >15 && average <= 20) {
                    count[3] += 1;
                }
            });
            setAverageData(count);
        }
    }, [averageList]);


    useEffect(()=>{
        const totalAverage = averageList.reduce((acc, average) => acc + parseFloat(average), 0);
        const newClassAverage = totalAverage / averageList.length;
        setClassAverage(newClassAverage.toFixed(2));

        const maxAverage = Math.max(...averageList);
        setStudentMaxAverage(maxAverage);

        const minAverage = Math.min(...averageList);
        setStudentMinAverage(minAverage);

        const passantCount = averageList.filter(average => average >= 10).length;
        setNbPassant(passantCount);

        setNbRedoublant(averageList.length - passantCount);
    },[averageList])
    return <>
            <MainLayout>
                <Box style={{paddingLeft:"25px"}}>
                    <Typography variant="h4" color="primary">Student statistics</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center",padding:"25px"}}>
                    <StatsNotePaper average={studentMaxAverage} type="Student Max Average" backgroundColor="rgb(253, 212, 151)"/>
                    <StatsNotePaper average={studentMinAverage} type="Student Min Average" backgroundColor="rgb(54, 162, 235)"/>
                    <StatsNotePaper average={classAverage} type="Class Average" backgroundColor="#9dfad3"/>
                </Box>
                <Box  style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",alignContent:"center",padding:"10px",height:"400px",marginTop:"20px"}}>
                    <Paper elevation={0} style={{width:"350px",padding:"8px 12px",borderRadius:"2px",display:"flex",justifyContent:"space-evenly",flexDirection:"column"}}>
                        <Paper elevation={5} style={{height:"130px",margin:"15px",backgroundColor:"rgb(255, 99, 132)",padding:"5px"}}>
                            <Typography variant="h5" component="h2" style={{textAlign:"center",marginTop:"15px"}}>Number of repeating students <br/> <span style={{color:"#6b2222"}}>{nbPassant}</span></Typography>
                        </Paper>
                        <Paper elevation={5} style={{height:"130px",margin:"15px",padding:"5px"}}>
                            <Typography  variant="h5" component="h2" style={{textAlign:"center",marginTop:"15px"}}>Number of students admitted <br/> <span style={{color:"#6b2222 !important"}}>{nbRedoublant}</span></Typography>
                        </Paper>
                    </Paper>
                    <Paper elevation={12} style={{width:"350px",padding:"8px 12px",borderRadius:"2px"}}> 
                        <ChartAverage data={averageData}/>
                    </Paper>
                </Box>
            </MainLayout>
        </>
            
}

export default Dashboard;