import axios from "axios";



export const GetSubject = async () => {
    const {data} = await axios.get("/api/subject");
    return data.data;
}

export const GetSubjectById = async (subjectId) => {
    const {data} = await axios.get(`/api/subject/${subjectId}`,)
    return data.data
}

