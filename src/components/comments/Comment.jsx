import React, { useEffect, useState } from 'react'
import Avatar from '../Profile/Avatar/Avatar'
import "./Comment.css"
import { deleteComment, getCommentReplies, getComments } from '../../services/comment'
import CommentReply from './CommentReply/CommentReply'
import { AiFillDelete } from "react-icons/ai";
import { FaReply } from "react-icons/fa";

const Comment = ({setReloadReplies, themeId,setComments,setReplyCommentId, replyFormView, setReplyFormView, userRole, comment, email, date, commentId }) => {

  const [replies, setReplies] = useState([])






  useEffect(() => {
    getCommentReplies(commentId).then(data => {
      console.log(data.data)
      if (data.data.length > 0) {
        setReplies(data.data)
      }
    })
  }, [setReloadReplies])

  const handleReplyComment = (e) =>  {
    e.preventDefault()
    setReplyFormView(!replyFormView)
    setReplyCommentId(commentId)
  }


  const handleDeleteComment = async (e) => {
    e.preventDefault()

    let res = confirm("Подтвердите ваше действие на удаление комментария")
    if (res == true) {
      try {
        const responce = await deleteComment(commentId)
        console.log(responce)
  
        const updatedComments = await getComments(themeId);
        setComments(updatedComments.data);
  
      } catch (err) {
          console.error(err);
          alert("Ошибка при удалении комментария: " + (err.response || "Неизвестная ошибка"));
      }
    }
    
  }


  return (
    <div className="comment-container">
      <div className="comment">
        <div className="comment-header">
          <Avatar name="sd" />
        </div>
        <div className="comment-body">
          <p className="comment-author">{email}</p>
          <p className="comment-text">{comment}</p>
        </div>
        <div className="comment-footer">
          <p className="comment-date">{date.split("T")[0].split("-").join(".")}</p>
          <div className='comment-button-container'>
            {
              userRole == 'admin' ?
                <button onClick={(e)=>handleReplyComment(e)} className="comment-reply">
                  <FaReply />
                </button>

                : null
            }

            <button onClick={(e)=>handleDeleteComment(e)} className="comment-delete">
              <AiFillDelete />
            </button>

          </div>


        </div>
      </div>
      <div className="comment-replies">
        {replies.map(reply => (
          <CommentReply key={reply.id} email={reply.email} comment={reply.content} date={reply.created_at} commentId={reply.id} />
        ))}
      </div>
    </div>
  )
}

export default Comment