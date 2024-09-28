import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React from 'react'
import { useRef } from 'react'

const Certificate = () => {
    const certificateRef = useRef()
    const generatePDF = () => {

        html2canvas(certificateRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            // Определяем размеры страницы A4 в пикселях (при 96 DPI)
            const pdfWidth = 297; // ширина A4 в мм
            const pdfHeight = 210; // высота A4 в мм
            const pdfAspectRatio = pdfWidth / pdfHeight;

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const imgAspectRatio = imgWidth / imgHeight;

            let finalWidth, finalHeight;

            if (imgAspectRatio > pdfAspectRatio) {
                // Изображение шире, чем страница
                finalWidth = pdfWidth;
                finalHeight = pdfWidth / imgAspectRatio;
            } else {
                // Изображение выше, чем страница
                finalHeight = pdfHeight;
                finalWidth = pdfHeight * imgAspectRatio;
            }

            const pdf = new jsPDF({
                orientation: 'landscape', // или 'portrait'
                unit: 'mm',
                format: [pdfWidth, pdfHeight],
                putOnlyUsedFonts: true,
                floatPrecision: 16 // точность
            });


            pdf.addImage(imgData,'PNG',0,0,finalWidth, finalHeight)
            pdf.save("praxis_certificate.pdf")
        })
    }
    return (
        <div>
            <div ref={certificateRef} style={{ textAlign: 'center', padding: '20px', border: '2px solid black', width: '300px', margin: 'auto' }}>
                <h1>Сертификат</h1>
                <p>Это удостоверяет, что</p>
                <h2>Islam Dashuev</h2>
                <p>успешно прошел курс</p>
                <h2>БАЗЫ ДАННЫХ</h2>
            </div>
            <button onClick={generatePDF}>Скачать сертификат</button>
        </div>

    )
}

export default Certificate