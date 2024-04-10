import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../const/baseURL.js';
import { StudentsServices } from '../../services/index.js';
import MainLayout from '../../layout/MainLayout';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Typography,Paper} from '@mui/material';
import StyledTableContainer from './NotesList.styled';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import FormStudent from '../../components/FormStudent.jsx';
import Tooltip from '@mui/material/Tooltip';
import {Skeleton } from '@mui/material';


function NotesList() {
    const [studentsList, setStudentsList] = useState([]);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [student, setStudent] = useState({
        id_student: "",
        name: "",
        note_Math: 0,
        note_Phy: 0
    });
    const [classAverage, setClassAverage] = useState(0);
    const [studentMinAverage, setStudentMinAverage] = useState(20);
    const [studentMaxAverage, setStudentMaxAverage] = useState(0);
    const [nbPassant, setNbPassant] = useState(0);
    const [nbRedoublant, setNbRedoublant] = useState(0);
    const [loading,setLoading] = useState(false);
    const [loadingData,setLoadingData] = useState(true);

    useEffect(() => {
        StudentsServices.fetchAllStudent(`${BASE_URL}/students/notes`, setStudentsList);
        setLoadingData(false);
    }, [student]); 

    useEffect(() => {
        const averageList = studentsList.map(student => ((student.note_Math + student.note_Phy) / 2).toFixed(2));
        
        const totalAverage = averageList.reduce((acc, average) => acc + parseFloat(average), 0);
        const newClassAverage = totalAverage / averageList.length;
        setClassAverage(newClassAverage.toFixed(2));

        const minAverage = Math.min(...averageList);
        setStudentMinAverage(minAverage);

        const maxAverage = Math.max(...averageList);
        setStudentMaxAverage(maxAverage);

        const passantCount = averageList.filter(average => average >= 10).length;
        setNbPassant(passantCount);

        setNbRedoublant(averageList.length - passantCount);
    }, [studentsList]);

    const handleOpenForm = () => {
        setIsOpenForm(true);
        setIsEdit(false);
    };

    const handleOnClickEdit = (studentToEdit) => {
        setIsOpenForm(true);
        setIsEdit(true);
        setStudent({ ...student, ...studentToEdit });
    };

    return (
        <>
            <MainLayout>
               <Box style={{display: "flex",alignItems: "center",justifyContent:"space-between",margin:"10px"}}>
                    <Typography variant="h4" component="h6" style={{color:"rgb(54, 162, 235)"}}>
                        {loadingData ? <Skeleton width="200px"/> : "Students List"}</Typography>
                    {loading &&<Paper style={{padding:"10px"}} variant={4}>Deletion in Progress ...</Paper>}
                    {loadingData ? <Skeleton width="70px" height="70px"/>:<Button color="primary" variant="outlined" onClick={handleOpenForm}><AddIcon />
                           New Student
                    </Button>}
               </Box>
                <StyledTableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Note MATHS</TableCell>
                                <TableCell>Note PHYSIQUE</TableCell>
                                <TableCell>Average Note</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {loadingData ? 
                        (
                            <TableBody>
                                <TableRow>
                                <TableCell>{loadingData ? <Skeleton variant="rectangular" width="100%"/>: student.id_student}</TableCell>
                                    <TableCell>{loadingData ? <Skeleton variant="rectangular" width="100%"/>: student.name}</TableCell>
                                    <TableCell>{loadingData ? <Skeleton variant="rectangular" width="100%"/>: student.note_Math}</TableCell>
                                    <TableCell>{loadingData ? <Skeleton variant="rectangular" width="100%"/>: student.note_Phy}</TableCell>
                                    <TableCell>{loadingData ? <Skeleton variant="rectangular" width="100%"/>: ((student.note_Math + student.note_Phy) / 2).toFixed(2)}</TableCell>
                                    <TableCell> 
                                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                                            <Tooltip title="Delete">
                                                <Skeleton width="70px" height="70px"/>
                                            </Tooltip>
                                            <Tooltip title="Edit" border="dotted">
                                                <Skeleton width="70px" height="70px" sx={{marginLeft:"10px"}}/>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ):(
                      
                        <TableBody>
                            {studentsList?.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{student.id_student}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.note_Math}</TableCell>
                                    <TableCell>{student.note_Phy}</TableCell>
                                    <TableCell>{((student.note_Math + student.note_Phy) / 2).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                                           <Tooltip title="Delete">
                                                <Button
                                                  border="dotted"
                                                  variant="contained"
                                                  color="error"
                                                  onClick={() => StudentsServices.deleteOneStudent(student,setStudent,setLoading)}
                                                  style={{ padding:"12px 0px"}}
                                                >
                                                    <DeleteIcon/>
                                                </Button>                                
                                            </Tooltip>
                                            <Tooltip title="Edit" border="dotted">
                                                <Button
                                                  variant="contained"
                                                  color="primary"
                                                  onClick={() => handleOnClickEdit(student)}
                                                  style={{ marginLeft: '10px',padding:"12px 0px"}}
                                                >
                                                <EditIcon/>
                                                </Button>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>)}
                            </Table>
                </StyledTableContainer>
               <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Paper style={{ border: "2px solid #FFC0CB", padding: '10px', borderRadius: '5px' }}>
                        {loadingData ? 
                        <Skeleton variant='rectangular' width="100px" height="25px"/>:
                        <Typography component="h5" style={{color:"#FFC0CB"}}>Class Average: { isNaN(classAverage)? 0:classAverage}</Typography>
                        }
                    </Paper>
                    <Paper style={{ border: "2px solid #87CEEB", padding: '10px', borderRadius: '5px' }}>
                    {loadingData ? 
                        <Skeleton variant='rectangular' width="100px" height="25px"/>:
                        <Typography component="h5" style={{color:"#87CEEB"}}>Student Min Average: {(studentMinAverage ==="Infinity") ? 0:studentMinAverage}</Typography>
                    }
                    </Paper>
                    <Paper style={{ border: "2px solid #98FB98", padding: '10px', borderRadius: '5px' }}>
                    {loadingData ? 
                        <Skeleton variant='rectangular' width="100px" height="25px"/>:
                        <Typography component="h5" style={{color:"#98FB98"}}>Student Max Average: {(studentMaxAverage ==="Infinity") ? 0:studentMaxAverage}</Typography>
                        }
                    </Paper>
                    <Paper style={{ border: "2px solid #FFD700", padding: '10px', borderRadius: '5px' }}>
                    {loadingData ? 
                        <Skeleton variant='rectangular' width="100px" height="25px"/>:
                        <Typography component="h5" style={{color:"#FFD700"}}>Number of Passant: {nbPassant}</Typography>
                        }
                    </Paper>
                    <Paper style={{ border: "3px solid #FFA07A", padding: '10px', borderRadius: '5px' }}>
                    {loadingData ? 
                        <Skeleton variant='rectangular' width="100px" height="25px"/>:
                        <Typography component="h5" style={{color:"#FFA07A"}}>Number of Redoublant: {nbRedoublant}</Typography>
                    }
                    </Paper>
               </Box>
            </MainLayout>
            <FormStudent isOpenForm={isOpenForm} isEdit={isEdit} student={student} onClose={() => setIsOpenForm(false)} />
        </>
    );
}

export default NotesList;
