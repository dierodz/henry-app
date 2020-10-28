import React, { useEffect, useState } from "react";
import MEDitor from "@uiw/react-md-editor";

import { useQuery } from "@apollo/client";
import { CONTENT_ID } from "apollo/querys/contents";
import { useParams } from "react-router-dom";

const ContentDetailStudent = ({ moduleId }) => {

  const [readme, setReadme] = React.useState("### Escribe el Readme");
  const [values, setValues] = useState({
    topicName: "",
    durationTime: "",
    moduleId: 0,
    link: "",
  });

  
  
  const {link} = values;
  const { id } = useParams();
  const variables = {
    id: id && parseInt(id),
  };
  const { data } = useQuery(CONTENT_ID, { variables });

  useEffect(() => {
    if (!isNaN(id)) {
      if (data && data) {
        console.log(data);
        setReadme(data.contents[0].readme);
        setValues((state) => {
          return {
            ...state,
            link: data.contents[0]?.lessons[0]?.link,
            topicName: data.contents[0]?.topicName,
            durationTime: data.contents[0]?.durationTime,
            moduleId: data.contents[0]?.moduleId,
          };
        });
      }
    }
  }, [data, id]);
  console.log(link);
  return (
    <div className="container">
      <div style={{ padding: "50px 0 0 0" }} />
      <iframe 
        X-Frame-Options
        title="Video"
        src={link}
        width="640" 
        height="360" 
        frameborder="0" 
        allow="autoplay; fullscreen" 
        allowfullscreen>
      </iframe>
       <MEDitor.Markdown source={readme} /> 
    </div>
  );
};

export default ContentDetailStudent;
