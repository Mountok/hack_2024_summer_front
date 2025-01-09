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
                setCourseLearner(resp.data)
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
            {visibleAvatars.map((avatar, index) => (
                <Avatar name={avatar.full_name} />
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
