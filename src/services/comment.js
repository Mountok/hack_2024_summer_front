import axios from 'axios'


export const getComments = async (themeId) => {
    const {data} = await axios.get(`api/comments/${themeId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('SKUToken')}`
        }
    })
 
    return data
}

export const addComment = async (themeId, comment) => {
    console.log('Отправляем комментарий:', {
        theme_id: themeId,
        content: comment
    });
    
    const resp = await axios.post(`api/comments`, {
        theme_id:  parseInt(themeId),
        content: comment
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('SKUToken')}`
        }
    })

    return resp
}

export const getCommentReplies = async (commentId) => {
    const {data} = await axios.get(`api/admin/reply/${commentId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('SKUToken')}`
        }
    })

    return data
}


export const addReply = async (commentId, content) => {
    console.log('Отправляем ответ на комментарий:', {
        comment_id: commentId,
        content: content
    });

    const resp = await axios.post(`api/admin/reply`, {
        comment_id: commentId,
        content: content
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('SKUToken')}`
        }
    })

    return resp


}



export const deleteComment = async (commentId) => {
    console.log("Удаление комментария")
    const resp = await axios.delete(`api/comments/${commentId}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('SKUToken')}`
        }
    })
    return resp
}