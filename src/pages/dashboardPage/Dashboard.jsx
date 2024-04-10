import MainLayout from "./../../layout/MainLayout";
import { Box , Skeleton } from '@mui/material';
import StatsNotePaper from "../../components/StatsNotePaper";
import ChartAverage from "../../components/ChartAverage";
import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import  { StudentsServices } from "./../../services/index";
import { BASE_URL } from "./../../const/baseURL";


function Dashboard(){
    const [averageList, setAverageList] = useState([]);
    const [averageData, setAverageData] = useState(0);
    const [classAverage,setClassAverage ] = useState(0);
    const [studentMaxAverage,setStudentMaxAverage] = useState(0);
    const [studentMinAverage,setStudentMinAverage] = useState(0);
    const [nbPassant, setNbPassant] = useState(0);
    const [nbRedoublant, setNbRedoublant] = useState(0);
    const [ loading , setLoading ] = useState(true);

    useEffect(() => {
        const fetchAverageNotes = async () => {
            try {
                const data = await StudentsServices.getAverageNote(`${BASE_URL}/students/notes/average`);
                setAverageList(data.map((average) => average.average_note));
            } catch (err) {
                console.error("Error occurred during the fetch Average list: " + err);
            }finally{
                setLoading(false);
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
                    {loading ? 
                    <Typography variant="h3">
                        <Skeleton width="25%" />
                    </Typography>
                    :<Typography variant="h4" color="primary">Student statistics</Typography>
                    }
                </Box>
                <Box style={{display:"flex",flexDirection:"column",alignItems:"flex-start",padding:"25px"}}>
                    <Box style={{display:"flex",flexDirection:"row",alignItems:"flex-start",gap:"25px"}}>
                        {loading ? 
                        (<Box style={{display:"flex",flexDirection:"row",alignItems:"flex-start",padding:"25px",gap:"25px"}}>
                            <Skeleton  width="300px"variant="rect" sx={{height:"200px"}}/>
                            <Skeleton  width="300px" variant="rect" sx={{height:"200px"}}/> 
                            <Skeleton  width="300px" variant="rect" sx={{height:"200px"}}/> 
                        </Box>
                        ):(
                        <>
                            <StatsNotePaper average={studentMaxAverage ?? 0 } type="Student Max Average"  color="rgb(255, 99, 132)"/>
                            <StatsNotePaper average={studentMinAverage ?? 0} type="Student Min Average" color="rgb(54, 162, 235)"/>
                            <StatsNotePaper average={Number.isNaN(classAverage) ? 0:classAverage} type="Class Average" color="rgb(255, 205, 86)"/>
                        </>
                        )
                        }
                    </Box>
                    <Box>
                        <Box  style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",width:"990px"}}>
                            <Box style={{width:"400px",borderRadius:"2px",padding:"2px 6px"}}> 
                            {loading ?
                            (<>
                                <Typography variant="h3">
                                  <Skeleton width="80%"/>
                                </Typography>
                                <Box>
                                    <Typography variant="body1">
                                               <Skeleton width="70%"/>
                                               <Skeleton width="70%"/>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Skeleton variant="circle" sx={{height:"250px",width:"250px",borderRadius:"250px",margin:"25px 25px"}}/> 
                                </Box>
                            </>):
                                <ChartAverage data={averageData}/>
                            }
                            </Box>
                            <Paper elevation={0} style={{width:"350px",padding:"8px 12px",borderRadius:"2px",display:"flex",justifyContent:"space-between",flexDirection:"column",marginTop:"20px"}}>
                                {loading ? 
                                (
                                <>
                                <Skeleton  width="300px"variant="rect" sx={{height:"150px"}}/>
                                <Skeleton  width="300px" variant="rect" sx={{height:"150px",marginTop:"10px"}}/>
                                </>)
                                :<>
                                    <StatsNotePaper average={nbPassant ?? 0} type="Number of Passant " color="#3b3b3b"/>
                                    <StatsNotePaper average={nbRedoublant ?? 0} type="Number of redoublant"  color="#ff8b8b"/>
                                </>
                                }
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            </MainLayout>
        </>
            
}

export default Dashboard;