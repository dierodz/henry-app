import React, { useEffect, useState } from "react";
import MEDitor from "@uiw/react-md-editor";

import { useMutation, useQuery } from "@apollo/client";
import { CONTENT_ID } from "apollo/querys/contents";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CREATE_CONTENT } from "apollo/Mutations/content";
import { MODULES } from "apollo/querys/modules";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Autocomplete } from "@material-ui/lab";

const ContentDetail = () => {
  const [createMutation, resultCreate] = useMutation(CREATE_CONTENT);
  const [readme, setReadme] = React.useState("### Escribe el Readme");
  const [values, setValues] = useState({
    topicName: "",
    durationTime: "",
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
      <form>
        <TextField
          label="Tema de la clase"
          variant="outlined"
          id="Clase"
          placeholder="Tema de la clase"
          type="text"
          name="topicName"
          value={topicName}
          onChange={handleInputChange}
        />
        <TextField
          label="Duracion"
          variant="outlined"
          id="Duracion"
          placeholder="Duracion"
          type="text"
          name="durationTime"
          value={durationTime}
          onChange={handleInputChange}
        />

        <Autocomplete
          name={"Modulo"}
          options={modules.data?.modules.map((opt) => ({
            label: opt.name,
            value: opt.id,
          }))}
          getOptionLabel={(option) => option.label}
          onChange={(_, e) => handleModuleInputChange(e)}
          value={(() =>
            modules.data?.modules.find((op) => op.id === values.moduleId))()}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Modulo"}
              type="text"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Crear
        </Button>
      </form>

      {/* VISTA PREVIA DEL MARKDONW */}

      {/* <MEDitor.Markdown source={value} /> */}

      {/* REPRODUCTOR CLASE GLABADA */}
    </div>
  );
};

export default ContentDetail;
