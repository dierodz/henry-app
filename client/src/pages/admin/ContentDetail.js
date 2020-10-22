import React, { useEffect, useState } from "react";
import MEDitor from "@uiw/react-md-editor";

import { useMutation, useQuery } from "@apollo/client";
import { CONTENT_ID } from "apollo/querys/contents";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CREATE_CONTENT } from "apollo/Mutations/content";
import { MODULES } from "apollo/querys/modules";
import { InputLabel } from "@material-ui/core";
import Select from "react-select";

const ContentDetail = () => {
  const [createMutation, resultCreate] = useMutation(CREATE_CONTENT);
  const [readme, setReadme] = React.useState("### Escribe el Readme");
  const [values, setValues] = useState({
    topicName: "",
    durationTime: 0,
    moduleId: 0,
  });

  const modules = useQuery(MODULES);
  const history = useHistory();
  const { topicName, durationTime } = values;

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const { id } = useParams();

  const variables = {
    id: id && parseInt(id),
  };

  const { data, refetch } = useQuery(CONTENT_ID, { variables });

  useEffect(() => {
    if (!isNaN(id)) {
      if (data && data) {
        setReadme(data.contents[0].readme);
      }
    }
  }, [data, id]);

  const handleCreate = (e) => {
    e.preventDefault();

    createMutation({
      variables: {
        ...values,
        durationTime: parseInt(values.durationTime),
        moduleId: parseInt(values.moduleId),
        readme,
      },
    });
    return history.push("/admin/modules/");
  };

  const handleModuleInputChange = function (e) {
    setValues({
      ...values,
      moduleId: parseInt(e.value),
    });
  };

  useEffect(() => {
    if (!resultCreate.loading && resultCreate.called) {
      refetch();
    }
  }, [resultCreate, refetch]);

  return (
    <div className="container" onSubmit={handleCreate}>
      <MEDitor height={800} value={readme} onChange={setReadme} />
      <div style={{ padding: "50px 0 0 0" }} />

      <form action="">
        <label>TopicName</label>
        <input
          type="text"
          name="topicName"
          value={topicName}
          onChange={handleInputChange}
        />
        <label>Duración</label>
        <input
          placeholder="Duracion"
          type="text"
          name="durationTime"
          value={durationTime}
          onChange={handleInputChange}
        />
        <InputLabel id="Modulo">Modulos</InputLabel>
        <Select
          placeholder="Select Module"
          onChange={handleModuleInputChange}
          options={modules.data?.modules.map((opt) => ({
            label: opt.name,
            value: opt.id,
          }))}
        />

        <button type="submit">Crear</button>
      </form>

      {/* VISTA PREVIA DEL MARKDONW */}

      {/* <MEDitor.Markdown source={value} /> */}

      {/* REPRODUCTOR CLASE GLABADA */}
    </div>
  );
};

export default ContentDetail;
