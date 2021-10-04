import React from 'react'

const PostForm = () => {
  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1">
        <textarea cols="30" rows="5" placeholder="Create a post"></textarea>
        <input type="submit" value="Submit" className="btn btn-primary my-1" />
      </form>
    </div>
  )
}

export default PostForm
