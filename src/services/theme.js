import axios from "axios";


export const CreateTheme = async(formData) => {
    const {data} = await axios.post('/api/themes', formData,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    });
    console.log("Id созданного темы " + data.theme_id)
    return data
}

export const DeleteTheme = async(theme_id) => {
    const {data} = await axios.delete(`/api/themes/${theme_id}`,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    return data
}

export const DoneThemes = async(subjectId) => {
    const {data} = await axios.get(`/api/themes/complete/${subjectId}`,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    if (data.data == null) {
        return []
    }else { 
        return data.data
    }
}




export const DoneThemesForAllSubjects = async(userId) => {
    const {data} = await axios.get(`/api/themes/completed/${userId}`,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("SKUToken")
        }
    })
    return data
}


export const AddContentInTheme = async (theme_id,text) => {

       const formData = new FormData();
       formData.append('theme_id', theme_id);
       formData.append('theme_html', text);
       try {
           const response = await axios.post('/api/lessons', formData,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("SKUToken")
            }
        });
           console.log('Ответ от сервера:', response.data);
            return response.data
       } catch (error) {
           console.error('Ошибка при отправке формы:', error);
           return error
       }
}

export const PutContentInTheme = async (theme_id,text) => {

    const formData = new FormData();
    formData.append('theme_id', theme_id);
    formData.append('theme_html', text);
    try {
        const response = await axios.put('/api/lessons', formData,{
         headers: {
             Authorization: "Bearer " + localStorage.getItem("SKUToken")
         }
     });
        console.log('Ответ от сервера:', response.data);
         return response.data
    } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        return error
    }
}

export const GetContentForTheme = async (theme_id) => {
    const formData = new FormData();
    formData.append('theme_id', "");
    formData.append('theme_html', "");
    try {
        const response = await axios.get(`/api/lessons?theme_id=${theme_id}`, formData,{
         headers: {
             Authorization: "Bearer " + localStorage.getItem("SKUToken")
         }
     });
        console.log('Ответ от сервера:', response.data);
         return response.data
    } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        return error
    }
} 