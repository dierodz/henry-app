import React from 'react';

const Post = (props) => {
return (
  <div>
    <div>{
      props.title? <h2>{props.title}</h2>: null
      }
    </div>
    <div>{postMessage.content}</div>

  </div>
)
}

export default Post;
