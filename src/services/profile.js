import axios from "axios"

export const GetLastSubject = async (userId) => {
    const {data} = await axios.get(`/api/profile/subject/${userId}`)
    return data.data
}

export const SetLastSubject = async (userId,subjectId) => {
    const {data} = await axios.post(`/api/profile/subject/${userId}/${subjectId}`)
    return data.data
}