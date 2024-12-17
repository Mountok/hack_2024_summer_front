import axios from "axios"


export const signUp = async (username, email, password) => {

    const { data } = await axios.post('/api/sign-up', {
        username: username,
        email: email,
        password: password,
    })
    return data
}
export const signIn = async (email, password) => {
    const { data } = await axios.post('/api/sign-in', {
        email: email,
        password: password,
    })
    return data
}

export const authorization = async () => {
    const {data} = await axios.post("/api/authorization",undefined,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    return data
}