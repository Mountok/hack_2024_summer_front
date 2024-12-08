import axios from "axios"


export const GetTestsBySubjectId = async (subjectId) => {
    const { data } = await axios.get(`api/test/${subjectId}`)
    return data.data
}

export const GetCompletedTests = async (userId,subjectId) => {
    const {data} = await axios.get(`api/test/result/${userId}/${subjectId}`)
    return data
}  

export const CheckQuestionsForTestId = async (testId,subjectId,userId, selectedQueston) => {
    const {data} = await axios.post(`/api/test/check/${testId}/${subjectId}/${userId}`, selectedQueston)
    return data
}

export const GetAllCompletedTest = async(userId) => {
    const {data} = await axios.get(`/api/test/${userId}/all`)
    return data.data
}

