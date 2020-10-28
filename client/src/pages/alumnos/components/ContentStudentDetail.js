import React, { useEffect, useState } from "react";
import MEDitor from "@uiw/react-md-editor";

import { useMutation, useQuery } from "@apollo/client";
import { CONTENT_ID } from "apollo/querys/contents";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { MODULES } from "apollo/querys/modules";

const ContentDetailStudent = ({ moduleId }) => {

  const [readme, setReadme] = React.useState("### Escribe el Readme");
  const [values, setValues] = useState({
    topicName: "",
    durationTime: "",
    moduleId: 0,
    link: "",
  });

  const modules = useQuery(MODULES);
  const history = useHistory();
  const { topicName, durationTime, link } = values;
  const { id } = useParams();
  const variables = {
    id: id && parseInt(id),
  };
  const { data, refetch } = useQuery(CONTENT_ID, { variables });

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

  return (
    <div className="container">
      <div style={{ padding: "50px 0 0 0" }} />
      <iframe 
        src="https://player.vimeo.com/video/426051769"
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