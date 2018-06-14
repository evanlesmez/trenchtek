import React from "react";
import "./Post.css";
const Post = props => (
  <div className="panel post-border post-body">
    <div className="panel-body">{props.postBody}</div>
  </div>
);
export default Post;
