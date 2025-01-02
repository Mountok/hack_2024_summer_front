import React, { useEffect, useRef, useState } from 'react';
import './Certificate.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { GetProfile } from '../../services/profile';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { CertificateVerification } from '../../services/cerificated';

const Certificate = () => {
    const certificateRef = useRef();
    const [userProfile, setUserProfile] = useState([])
    const [subjectState, setSubjectState] = useState([])
    const [isSertificated,setIsSertificated] = useState([])
    const [date, setDate] = useState()
    const location = useLocation();
    const navigate = useNavigate()
    useEffect(() => {
        GetProfile().then((res) => {
            console.log(res)
            setUserProfile(res.data)

        }).catch((err) => {
            console.log(err)
            if (err.response.status == 401) {
                console.log("unauth")
                navigate("/")
            }
        })



        const apiUrlS = `/api/subject/${location.pathname.split("/")[2]}`;
        axios.get(apiUrlS,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("SKUToken")
                }
            }
        ).then((resp) => {
            const Subject = resp.data.data;
            console.log(resp.data)
            setSubjectState(Subject);
        });

          CertificateVerification(location.pathname.split("/")[2]).then(res => {
                    if (res.courseDone) {
                        setIsSertificated(true)
                        setDate(res.date.split("T")[0].split("-").join("."))
                    } else {
                        navigate("/")
                    }
                

                }).catch(err => {
                    console.log(err)
                    navigate("/")
                })
        

    }, [])





    const generatePDF = () => {
        const input = certificateRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            // Создаем PDF в вертикальном формате (portrait), размеры страницы A4
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Устанавливаем размеры для масштабирования
            const imgWidth = 210;  // Ширина страницы A4 в мм
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Пропорциональная высота

            // Добавляем изображение в PDF
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            // Сохраняем PDF
            pdf.save('certificate.pdf');

            navigate(`/course/${location.pathname.split("/")[2]}`)
        });
    };






    return (
        <>

            <button className='certificate-button' onClick={generatePDF}>Скачать PDF</button>

            <div ref={certificateRef} className="certificate-container">
                {userProfile[0] == undefined ? null : <p className='name'>{userProfile[0].full_name}</p>}
                {subjectState[0] == undefined ? null :  <p className='course'>{subjectState[0].title}</p>}
                {date == undefined || date == null ? null : <p className='date'>{date}</p>}
            </div>

        </>
    );
};

export default Certificate;