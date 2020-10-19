import React from 'react';
import Post from './Posts'

const MapPosts = (props) => {
  const { data } = props
  return(
    <div>{
      data.map(datos => {
        return (
          <div>
            <Post tittle={datos.tittle} content={datos.content}/>
          </div>
        )
      })
      }
      
    </div>
  )
}

export default MapPosts;
