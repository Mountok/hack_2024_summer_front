import axios from "axios";


export const CreateTheme = async(formData) => {
    const {data} = await axios.post('/api/themes', formData);
    alert("Id созданного темы " + data.data.theme_id)
    return data
}

export const DeleteTheme = async(theme_id) => {
    const {data} = await axios.delete(`/api/themes/${theme_id}`)
    return data
}

export const DoneThemes = async(userId,subjectId) => {
    const {data} = await axios.get(`/api/themes/complete/${userId}/${subjectId}`)
    if (data.data == null) {
        return []
    }else { 
        return data.data
    }
}


export const DoneThemesForAllSubjects = async(userId) => {
    const {data} = await axios.get(`/api/themes/complete/${userId}`)
    if (data.data == null) {
        return []
    }else { 
        return data.data
    }
}


export const AddContentInTheme = async (theme_id,text) => {

    
       const formData = new FormData();
       formData.append('theme_id', theme_id);
       formData.append('theme_html', text);

       try {
           const response = await axios.post('/api/lessons', formData);
           console.log('Ответ от сервера:', response.data);
            return response.data
       } catch (error) {
           console.error('Ошибка при отправке формы:', error);
           return error
       }
}