import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeAlert } from '../../actions/alert';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = () => {
  const { page, alerts } = useSelector((state) => state.alert);
  const { posts, loading } = useSelector(state => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "NibiruDev - Posts";

    if (page !== "posts") {
      dispatch(removeAlert());
    }

    dispatch(getPosts())
  }, [dispatch, page]);

  return (
    <div className="container">
      <h1 className="large text-primary">
        Posts
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome To The Community
      </p>

      {
        loading ? <Spinner /> : (
          <Fragment>
            <PostForm />
            <PostItem posts={posts} />
          </Fragment>
        )
      }
    </div>
  )
}

export default Posts
