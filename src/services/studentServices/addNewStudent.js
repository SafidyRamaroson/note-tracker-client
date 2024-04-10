import { toast } from "react-toastify";
import { BASE_URL } from '../../const/baseURL';

export const addNewStudent = async(student,setOpenForm,setSaving)=>{
    setSaving(true);
    try{
        const response = await fetch(BASE_URL+"/students/new",{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(student)
        });

        const data = await response.json();
        setSaving(false)
        setOpenForm(false);
       if(response.status === 201){
          toast.success(data.message,{
                position:toast.POSITION.TOP_CENTER,
                duration:500,
          });
       }

       if(response.status === 409){
           toast.error(data.message,{
                position:toast.POSITION.TOP_CENTER,
                duration:500,
            });
       }

    }catch(error){
        console.error(error);
    }
};