import axios from "axios"

export const CertificateVerification = async (userId, subjectId) => {
    try {
        const { data } = await axios.get(`/api/certificate/${userId}/${subjectId}`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("SKUToken")
            }
        });
        console.log(data);
        return data;
    } catch (error) {
        // Обработка ошибки
        // console.error('Ошибка при получении сертификата:', error);
        // Можно вернуть ошибку или сообщение об ошибке
        throw new Error('Не удалось получить сертификат. Пожалуйста, попробуйте позже.');
    }

}