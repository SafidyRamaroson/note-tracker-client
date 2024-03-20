import { addNewStudent } from "./studentServices/addNewStudent";
import { deleteOneStudent } from "./studentServices/deleteStudent";
import { fetchAllStudent } from "./studentServices/fetchAllStudent";
import { updateStudent } from "./studentServices/udpateStudent";
import { getAverageNote } from "./studentServices/getAverageNote";

export const  StudentsServices = Object.freeze({
    addNewStudent,
    deleteOneStudent,
    fetchAllStudent,
    updateStudent,
    getAverageNote,
});
