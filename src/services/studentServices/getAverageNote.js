
export const getAverageNote = async(url_to_fetch_data) => {
    try{
        const res = await fetch(url_to_fetch_data);
        const data = await res.json();
        return data;
    }catch(err){
        console.error("Eror occured during the fetch Average list: "+err);
    }
};