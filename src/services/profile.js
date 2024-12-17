import axios from "axios"

export const GetLastSubject = async () => {
    const {data} = await axios.get(`/api/profile/subject`,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    return data
}

export const SetLastSubject = async (subjectId) => {
    const {data} = await axios.post(`/api/profile/subject/${subjectId}`,undefined,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    return data
}

export const GetProfile = async () => {
    const {data} = await axios.get('/api/profile',{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    return data
}