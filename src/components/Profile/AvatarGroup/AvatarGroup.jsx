import React, { useEffect, useState } from 'react';
import './AvatarGroup.css'; // Import styles
import Settings from '../../../../settings';
import { GetUserOnSubject } from '../../../services/subject';
import Avatar from '../Avatar/Avatar';

const AvatarGroup = ({ subjectId, max = 3 }) => {
    const [courseLearner, setCourseLearner] = useState([])
    const [courseLearnerA, setCourseLearnerA] = useState([])

    useEffect(() => {
        GetUserOnSubject(subjectId).then(resp => {
            console.log(resp)
            if (resp.data == null) {
                setCourseLearner([])
            } else {
                console.log(resp.data)
                const arrAdmin = resp.data.filter(item => item.image === "admin.png");
                const arrGood = resp.data.filter(item => item.image != "admin.png");
                console.log(arrAdmin)
                console.log(arrGood)
                setCourseLearner(arrGood)
                setCourseLearnerA(arrAdmin)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])


    const visibleAvatars = courseLearner.slice(0, max); // Limit the number of avatars
    const extraCount = courseLearner.length - max; // Count extra avatars 
    return (
        <div className="avatar-group">
            {courseLearnerA.map((avatar, index) => (
                <Avatar size={40} name={avatar.full_name} />
            ))}
            {visibleAvatars.map((avatar, index) => (
                    <img
                        key={index}
                        className="avatar"
                        src={`http://${Settings.PORT}/images?id=${avatar.image}`}
                        alt={avatar.id}
                    />
            ))}
            {extraCount > 0 && (
                <div className="extra-avatar">+{extraCount}</div>
            )}

            <p className='group-title'>{visibleAvatars.length == 1 ?
                "Вы проходите курс" : courseLearner.length + " проходят"}</p>
        </div>
    );
};

export default AvatarGroup;
