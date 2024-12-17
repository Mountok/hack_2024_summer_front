import axios from "axios";



export const GetSubject = async () => {
    const {data} = await axios.get("/api/subject",{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    });
    return data.data;
}

export const GetSubjectById = async (subjectId) => {
    const {data} = await axios.get(`/api/subject/${subjectId}`,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    return data.data
}

