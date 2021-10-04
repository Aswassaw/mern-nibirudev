import React from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const PostItem = ({ posts }) => {
  const auth = useSelector(state => state.auth)

  return (
    <div className="posts">
      {posts.map(post => <div key={post._id} className="post bg-white my-1 p-1">
        <div>
          <Link to={`/profile/${post._id}`}>
            <img className="round-img shadow-img" src={post.user.avatar} alt="Profile" />
            <h4>{post.user.name}</h4>
          </Link>
        </div>

        <div>
          <p>
            {post.text}
          </p>
          <p className="post-date">Posted on {<Moment format="YYYY/MM/DD">{post.date}</Moment>}</p>
          <button className="btn">
            <i className="fas fa-thumbs-up"></i> {" "}<span>{post.likes.length}</span>
          </button>
          <button className="btn">
            <i className="fas fa-thumbs-down"></i> {" "}<span>{post.likes.length}</span>
          </button>
          <Link to={`/post/${post._id}`} className="btn btn-primary">
            Discussion {" "} {
              post.comments.length > 0 && (<span className="comment-count">{post.comments.length}</span>)
            }
          </Link>
          {!auth.loading && post.user._id === auth.user._id && (
            <button type="button" class="btn btn-danger">
              <i class="fas fa-times">Delete</i>
            </button>
          )}
        </div>
      </div>)}
    </div>
  )
}

export default PostItem
