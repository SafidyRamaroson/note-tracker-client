import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../const/baseURL';

export const updateStudent = async(student,setOpenForm,setSaving)=>{
    setSaving(true);
    try{
      const res = await fetch(BASE_URL+`/students/${student.id_student}`,{
        method:"PUT",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          name:student.name,
          note_Math:student.note_Math,
          note_Phy:student.note_Phy
        })
      });
      
      setSaving(false);
      if(res.ok){
          toast.success("Edit note saved!",{
                position:toast.POSITION.TOP_CENTER,
                duration:500
          });
        }
      setOpenForm(false);
      }catch(err){
        console.error(err);
      }
  }