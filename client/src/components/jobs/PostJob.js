import React from "react";
import { Link } from 'react-router-dom'

const PostJob = props => {
  return (
    <div>
      <Link to='/jobs/new'>Post a new vacancy </Link>
    </div>
  );
};

export default PostJob;
