import axios from "axios"


export const GetTestsBySubjectId = async (subjectId) => {
    const { data } = await axios.get(`api/test/${subjectId}`,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    return data.data
}

export const GetCompletedTests = async (subjectId) => {
    const {data} = await axios.get(`api/test/for/${subjectId}`,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    return data
}  

export const CheckQuestionsForTestId = async (testId,subjectId, selectedQueston) => {
    const {data} = await axios.post(`/api/test/check/${testId}/${subjectId}`, selectedQueston,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    return data
}

export const GetAllCompletedTest = async(userId) => {
    const {data} = await axios.get(`/api/test/${userId}/all`,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    return data.data
}

