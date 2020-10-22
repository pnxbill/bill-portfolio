import React, { useState } from 'react'

const Replier = ({ isOpen, closeBtn, onSubmit, hasTitle, replyTo }) => {
  const [reply, setReply] = useState({ title: '', content: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setReply({ ...reply, [name]: value })
  }

  const resetReplier = () => {
    setReply({ title: '', content: '' });
  }

  return (
    <div className={`reply-controls ${isOpen ? 'is-open' : null}`}>
      <div className="reply-area">
        {replyTo &&
          <div className="reply-to">
            Reply To: <span className="text ml-2">{replyTo}</span>
          </div>
        }
        {hasTitle &&
          <div className="fj-editor-input">
            <input
              name="title"
              onChange={handleChange}
              value={reply.title}
              placeholder="Topic title"
              type="text"
            />
          </div>
        }
        <div className="fj-editor">
          <div className="fj-editor-textarea-wrapper">
            <textarea
              name="content"
              value={reply.content}
              onChange={handleChange}
              placeholder="Type here">
            </textarea>
          </div>
          <div className="fj-editor-preview-wrapper">
            <div className="preview">
              <p></p>
            </div>
          </div>
        </div>
        <div className="submit-area">
          <div className="send mr-auto">
            <button
              onClick={async () => {
                await onSubmit(reply);
                resetReplier();
              }}
              className="btn btn-main bg-blue py-2 ttu">Reply</button>
            {closeBtn}
          </div>
          <div>
            <a className="btn py-2 ttu gray-10">hide preview</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Replier
