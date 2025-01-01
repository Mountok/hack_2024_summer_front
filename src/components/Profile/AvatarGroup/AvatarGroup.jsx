import React, { useEffect, useState } from 'react';
import './AvatarGroup.css'; // Import styles
import Settings from '../../../../settings';
import { GetUserOnSubject } from '../../../services/subject';

const AvatarGroup = ({ subjectId, max = 3 }) => {
    const [courseLearner, setCourseLearner] = useState([])

    useEffect(() => {
        GetUserOnSubject(subjectId).then(resp => {
            console.log(resp)
            if (resp.data == null) {
                setCourseLearner([])
            } else {

                setCourseLearner(resp.data)
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

            <p className='group-title'>{ visibleAvatars.length == 1 ? 
            "Вы проходите курс" : courseLearner.length  + " проходят"}</p>
        </div>
    );
};

export default AvatarGroup;
