import React, { useEffect } from "react";
import MEDitor from "@uiw/react-md-editor";

import { useQuery } from "@apollo/client";
import { CONTENT_ID } from "apollo/querys/contents";
import { useParams } from "react-router-dom";

const ContentDetail = () => {
  const [value, setValue] = React.useState("Hola");

  const { id } = useParams();

  const variables = {
    id: id && parseInt(id),
  };

  const { data } = useQuery(CONTENT_ID, { variables });

  useEffect(() => {
    if (data && data) {
      setValue(data.contents[0].readme);
    }
  }, [data]);

  const handleCreate = () => {};

  return (
    <div className="container">
      <MEDitor height={800} value={value} onChange={setValue} />
      <div style={{ padding: "50px 0 0 0" }} />

      {/* VISTA PREVIA DEL MARKDONW */}
      <button onClick={handleCreate}>Guardar</button>

      <MEDitor.Markdown source={value} />

      {/* REPRODUCTOR CLASE GLABADA */}
    </div>
  );
};

export default ContentDetail;
