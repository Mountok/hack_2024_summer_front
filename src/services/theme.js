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