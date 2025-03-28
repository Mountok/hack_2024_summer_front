import React, {useEffect, useState} from 'react'
import "./liderbord.scss"
import { GiLaurelCrown } from "react-icons/gi";
import axios from "axios";
import Settings from "../../../settings.js";
import Loading from '../../components/loading/Loading.jsx';

const LiderBord = () => {
    const [liderBoard,setLiderBoard] = useState([])
    const [requestCompleted,setRequestCompleted] = useState(false)
    useEffect(()=>{
        setRequestCompleted(false)
        const apiUrl = '/api/profiles';
        axios.get(apiUrl).then((resp) => {
            const allSubjects = resp.data.data;
            console.log(resp.data)
            setLiderBoard(resp.data.data)
        });
        setRequestCompleted(true)
    },[])

    function truncateText(text, maxLength) {
        const truncatedText =
          text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
      
        return truncatedText;
      }

    return (
        <main className='main rating'>
            <div className="rating_header">
                <p>Топ 10</p>
            </div>

            <div className="rating_bottom_board">

                {(requestCompleted) ? (
                    liderBoard.map((el,idx,array)=>(
                        <div
                        style={{
                            height: (idx+1) > 3 ? "40px": null
                        }}
                         key={idx} className="rating_bottom_item">

                            <p style={{
                                display: (idx+1) > 3 ? "none": "block"
                            }}>{idx+1}</p>
                            {/* <div style={{
                                display: (idx+1) > 3 ? "none": "flex"
                            }} className="bottom_rating_board_image">

                                

                                <img  loading="lazy"  src={`http://${Settings.PORT}/images?id=${el.image}`} alt="" />
                            </div> */}
                            <h2
                            >{(idx+1) > 3 ? truncateText(el.username,25) :  truncateText(el.username,25)} - <span>{el.score}</span></h2>
                        </div>
                ))) : (
                    <p>Загрузка рейтинг</p>
                )}
                                
            </div>

        </main>
    )
}

export default LiderBord