import React from 'react'
import "./CommentReply.css"
import Avatar from '../../Profile/Avatar/Avatar'
const CommentReply = ({email, comment, date}) => {
  return (
    <div className="comment-reply">
        <div className="comment-header">
        <Avatar name="ad"/>
      </div>
      <div className="comment-body">
        <p className="comment-author">{email}</p>
        <p className="comment-text">{comment}</p>
      </div>
      <div className="comment-footer">
        <p className="comment-date">{date.split("T")[0].split("-").join(".")}</p>
      </div>
    </div>
  )
}

export default CommentReply