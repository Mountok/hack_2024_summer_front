import React, {useEffect, useState} from 'react'
import "./liderbord.css"
import { GiLaurelCrown } from "react-icons/gi";
import axios from "axios";
import Settings from "../../../settings.js";

const LiderBord = () => {
    const [liderBoard,setLiderBoard] = useState([])

    useEffect(()=>{
        const apiUrl = '/api/profiles';
        axios.get(apiUrl).then((resp) => {
            const allSubjects = resp.data.data;
            console.log(resp.data)
            setLiderBoard(resp.data.data)
        });
    },[])

    return (
        <main className='main rating'>
            <div className="rating_header">
                <GiLaurelCrown className='rating_header_icon' />
                <p>Топ 10 пользователей</p>
            </div>

            <div className="rating_bottom_board">

                {liderBoard.map((el,idx,array)=>(
                    <div key={idx} className="rating_bottom_item">
                    <p>{idx+1}</p>
                    <div className="bottom_rating_board_image">
                        <img src={`http://${Settings.PORT}/images?id=${el.image}`} alt="" />
                    </div>
                    <h2>{el.username} - <span>{el.score}</span></h2>
                </div>
                ))}
                                
            </div>

        </main>
    )
}

export default LiderBord