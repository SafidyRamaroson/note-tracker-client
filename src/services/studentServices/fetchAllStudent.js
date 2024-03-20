export const fetchAllStudent = async(url_to_fetch_data,set) =>{
    try{
      const res = await fetch(url_to_fetch_data,{
        headers:{
          'Content-Type':'application/json',
      }
      });
      const data = await res.json();
      set(data);
    }catch(err){
      console.error(err);
    }
  }

