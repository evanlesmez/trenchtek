import React from "react";
import "./Post.css";
import "./App.css";
const Post = props => (
  <div className="panel post-border post-body">
    <div class="directory-title">Directory</div>

    <div className="panel-body">{props.postBody}</div>
  </div>
);
export default Post;
