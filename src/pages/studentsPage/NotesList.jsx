import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../const/baseURL.js';
import { StudentsServices } from '../../services/index.js';
import MainLayout from '../../layout/MainLayout';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Typography,Paper} from '@material-ui/core';
import StyledTableContainer from './NotesList.styled';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import FormStudent from '../../components/FormStudent.jsx';



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
    useEffect(() => {
        StudentsServices.fetchAllStudent(`${BASE_URL}/students/notes`, setStudentsList);
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
                    <Typography variant="h4" component="h6" style={{color:"rgb(54, 162, 235)"}}>Students List</Typography>
                    {loading &&<Paper style={{padding:"10px"}} variant={2}>Deletion in Progress ...</Paper>}
                    <Button color="primary" variant="outlined" onClick={handleOpenForm}>
                         <AddIcon />
                         New Student
                    </Button>
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
                        <TableBody>
                            {studentsList.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{student.id_student}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.note_Math}</TableCell>
                                    <TableCell>{student.note_Phy}</TableCell>
                                    <TableCell>{((student.note_Math + student.note_Phy) / 2).toFixed(2)}</TableCell>
                                    <TableCell>
                                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                                             <Button
                                                  variant="contained"
                                                  color="secondary"
                                                  startIcon={<DeleteIcon />}
                                                  onClick={() => StudentsServices.deleteOneStudent(student,setStudent,setLoading)}
                                             >
                                                  Delete
                                             </Button>
                                             <Button
                                                  variant="contained"
                                                  color="primary"
                                                  startIcon={<EditIcon />}
                                                  onClick={() => handleOnClickEdit(student)}
                                                  style={{ marginLeft: '10px' }}
                                             >
                                                  Edit
                                             </Button>
                                   </Box>
                              </TableCell>
                         </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
               <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Paper style={{ border: "2px solid #FFC0CB", padding: '10px', borderRadius: '5px' }}>
                         <Typography component="h2" style={{color:"#FFC0CB"}}>Class Average: { isNaN(classAverage)? 0:classAverage}</Typography>
                    </Paper>
                    <Paper style={{ border: "2px solid #87CEEB", padding: '10px', borderRadius: '5px' }}>
                         <Typography component="h2" style={{color:"#87CEEB"}}>Student Min Average: {(studentMinAverage ==="Infinity") ? 0:studentMinAverage}</Typography>
                    </Paper>
                    <Paper style={{ border: "2px solid #98FB98", padding: '10px', borderRadius: '5px' }}>
                         <Typography component="h2" style={{color:"#98FB98"}}>Student Max Average: {(studentMaxAverage ==="Infinity") ? 0:studentMaxAverage}</Typography>
                    </Paper>
                    <Paper style={{ border: "2px solid #FFD700", padding: '10px', borderRadius: '5px' }}>
                         <Typography component="h2" style={{color:"#FFD700"}}>Number of Passant: {nbPassant}</Typography>
                    </Paper>
                    <Paper style={{ border: "3px solid #FFA07A", padding: '10px', borderRadius: '5px' }}>
                         <Typography component="h2" style={{color:"#FFA07A"}}>Number of Redoublant: {nbRedoublant}</Typography>
                    </Paper>
               </Box>
            </MainLayout>
            <FormStudent isOpenForm={isOpenForm} isEdit={isEdit} student={student} onClose={() => setIsOpenForm(false)} />
        </>
    );
}

export default NotesList;
