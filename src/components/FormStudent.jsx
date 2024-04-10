import { useState, useEffect } from "react";
import { BASE_URL } from "./../const/baseURL";
import { useFormik } from "formik";
import { studentSchema } from "../utils/validationSchema/studentSchema.js";
import { Box,Button,Dialog,DialogContent,DialogTitle,Divider,TextField, Typography } from "@mui/material";
import { StudentsServices } from "../services/index.js";

function FormStudent({isOpenForm,isEdit,student,onClose}){
 
    const initialValuesSaveNote = {
        id_student:"",
        name:"",
        note_Math:0,
        note_Phy:0,
    }

    const [initialValues,setInitialValues] = useState(initialValuesSaveNote);
    const [openForm,setOpenForm] = useState(isOpenForm);
    const [saving,setSaving] = useState(false);

    useEffect(() => {
        setOpenForm(isOpenForm);
    },[isOpenForm]);

    useEffect(()=>{
        if(isEdit){
            setInitialValues({...student});
        }else{
            setInitialValues({...initialValuesSaveNote});
        }
    },[student,isEdit]);

    const handleClickCancel = () => {
        setOpenForm(false);
        onClose();
    };
    
    useEffect(() => {
        if (!isEdit) {
            formik.resetForm();
        }
    },[openForm, isEdit]);

    const formik = useFormik({
        initialValues,
        validationSchema:studentSchema,
        onSubmit: (values) => {
            if(!isEdit){
                StudentsServices.addNewStudent(values,setOpenForm,setSaving);
            }else{
                StudentsServices.updateStudent(values,setOpenForm,setSaving);
            }
        },    
        enableReinitialize: true,
    });        


    return (
            <Dialog open={openForm} onClose={!openForm}>
                <DialogTitle sx={{backgroundColor:"#4285F4",opacity:.8,display:"flex",justifyContent:"space-between"}}>
                    { !isEdit ? (<Typography color="#fff">
                                     Add new student note
                                    </Typography>)
                                :
                                (<Typography color="#fff">
                                    Edit student
                                </Typography>)
                    }
                    <Box>
                        <Button style={{color:"#fff"}} onClick={()=> handleClickCancel()}>X</Button>
                    </Box>
                </DialogTitle>
                <Divider sx={{mb:3}}/>
                <DialogContent>
                    <form  onSubmit={formik.handleSubmit}>
                        <Box>
                            <TextField 
                                type='text' 
                                size="small"
                                color="primary"
                                label="Student ID*"
                                name="id_student"
                                placeholder="Enter ID Student"
                                value={formik.values.id_student}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.id_student && Boolean(formik.errors.id_student)}
                                helperText={formik.touched.id_student && formik.errors.id_student}
                                sx={{mb:4}}
                                variant="standard"
                                fullWidth              
                                disabled ={isEdit}
                            />
                            <TextField 
                                type='text' 
                                size="small"
                                color="primary"
                                label="Name*"
                                name="name"
                                placeholder="enter student's name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                sx={{mb:4}}
                                variant="standard"
                                fullWidth
                            />
                            <TextField 
                                type='number' 
                                size="small"
                                color="primary"
                                label="Math Note*"
                                name="note_Math"
                                placeholder="Enter MATHS NOTE"
                                value={formik.values.note_Math}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.note_Math && Boolean(formik.errors.note_Math)}
                                helperText={formik.touched.note_Math && formik.errors.note_Math}
                                sx={{mb:4}}
                                variant="standard"
                                fullWidth
                            />
                            <TextField 
                                type='number'
                                size="small"
                                color="primary"
                                label="PC Note*"
                                name="note_Phy"
                                placeholder="Enter PC NOTE"
                                value={formik.values.note_Phy}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.note_Phy && Boolean(formik.errors.note_Phy)}
                                helperText={formik.touched.note_Phy && formik.errors.note_Phy}
                                sx={{mb:4}}
                                variant="standard"
                                fullWidth
                                />
                            </Box>
                            <Box sx={{float:"right"}}>
                                <Button autFocus color="primary" type='button' onClick={()=> handleClickCancel()}>cancel</Button> 
                                {saving ?
                                    (<Button Button autoFocus  color="primary" sx={{marginLeft:"15px"}}  >saving ...</Button>)
                                    :
                                    ( <Button autoFocus  color="primary" sx={{marginLeft:"15px"}} type="submit">save</Button>)
                                }
                               
                            </Box>
                    </form>
                </DialogContent>
            </Dialog>
        )
}
export default FormStudent;