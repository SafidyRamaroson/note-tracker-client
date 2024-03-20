import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../const/baseURL';
export const deleteOneStudent = async(student,setStudent,setLoading)=>{
    setLoading(true)
    try{
      const res = await fetch(BASE_URL+`/students/${student.id_student}`,{
        method:"DELETE",
        headers:{
          'Content-Type':'application/json',
        }
      });
        setLoading(false)
        if(res.ok){
            toast.success("Student note deleted successfully!",{
                  position:toast.POSITION.TOP_CENTER,
                  duration:500,
             });
        }
      setStudent(student);
      }catch(err){
        console.error(err);
      }
  }