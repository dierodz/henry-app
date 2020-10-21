import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import MEDitor from "@uiw/react-md-editor";

import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { CONTENT_ID } from "apollo/querys/contents";
import { CREATE_CONTENIDO } from "apollo/Mutations/contenido";
import { useParams } from "react-router-dom";

export default function App() {
  const [value, setValue] = React.useState("Hola");

  const { id } = useParams();

  const variables = {
    id: id && parseInt(id),
  };

  const { loading, error, data } = useQuery(CONTENT_ID, { variables });
  const [createContent, { loading: createLoading }] = useMutation(
    CREATE_CONTENIDO
  );

  useEffect(() => {
    if (data && data) {
      console.log(data.contents[0].readme);
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
}
