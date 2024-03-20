import * as yup from "yup";

export const studentSchema = yup.object({
    id_student:yup
        .string("Enter ID Student")
        .required("ID Student is required"),
    name:yup
        .string("Enter student's name")
        .required("Name is required"),
    note_Math:yup
        .number("Enter Note MATHS")
        .min(0)
        .max(20)
        .required("Note MATHS is required"),
    note_Phy:yup
        .number("Enter Note PC")
        .min(0)
        .max(20)
        .required("Note PC is required")
});


