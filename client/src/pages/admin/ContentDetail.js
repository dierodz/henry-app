import React, { useEffect, useState } from "react";
import MEDitor from "@uiw/react-md-editor";

import { useMutation, useQuery } from "@apollo/client";
import { CONTENT_ID } from "apollo/querys/contents";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  CREATE_CONTENT,
  UPDATE_CONTENT,
  DELETE_CONTENT,
} from "apollo/Mutations/content";
import { MODULES } from "apollo/querys/modules";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Autocomplete } from "@material-ui/lab";
import { CREATE_LESSON, UPDATE_LESSON } from "apollo/Mutations/lesson";

const ContentDetail = ({ moduleId }) => {
  const [createMutation, resultCreate] = useMutation(CREATE_CONTENT);
  const [updateMutation, resultUpdate] = useMutation(UPDATE_CONTENT);
  const [updateLesson] = useMutation(UPDATE_LESSON);
  const [createLesson, resultCreateLesson] = useMutation(CREATE_LESSON);
  const [deleteContent] = useMutation(DELETE_CONTENT);
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

  const handleCreate = () => {
    createMutation({
      variables: {
        ...values,
        durationTime: parseInt(values.durationTime),
        moduleId: parseInt(values.moduleId),
        readme,
        link: "https://player.vimeo.com/video/" + values.link,
      },
    });

    return history.push("/admin/modules/");
  };

  const handleUpdate = () => {
    updateMutation({
      variables: {
        id: parseInt(id),
        ...values,
        durationTime: parseInt(values.durationTime),
        moduleId: parseInt(values.moduleId),
        readme,
      },
    });

    if (data && data.contents[0].lessons.length === 0) {
      createLesson({
        variables: {
          link: "https://player.vimeo.com/video/" + values.link,
          contentId: parseInt(id),
        },
      });
    } else {
      updateLesson({
        variables: {
          id: data.contents[0].lessons[0].id,
          link: values.link.includes("https://player.vimeo.com/video/")
            ? values.link
            : "https://player.vimeo.com/video/" + values.link,
        },
      });
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (!isNaN(id)) {
      handleUpdate();
    } else {
      handleCreate();
    }
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

  useEffect(() => {
    if (!resultUpdate.loading && resultUpdate.called) {
      refetch();
    }
  }, [refetch, resultUpdate]);

  useEffect(() => {
    if (!resultCreateLesson.loading && resultCreateLesson.called) {
      refetch();
    }
  }, [refetch, resultCreateLesson]);

  const handleDelete = () => {
    deleteContent({
      variables: {
        id: parseInt(id),
      },
    });

    return history.push("/admin/modules/");
  };

  return (
    <div className="container" onSubmit={handleOnSubmit}>
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
        <TextField
          label="Link de la clase"
          variant="outlined"
          id="Clase"
          placeholder="Link de la clase"
          type="text"
          name="link"
          value={link}
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

        {isNaN(id) ? (
          <Button type="submit" variant="contained" color="primary">
            Crear
          </Button>
        ) : (
          <>
            <Button type="submit" variant="contained" color="primary">
              Actualizar
            </Button>

            <Button
              type="button"
              onClick={handleDelete}
              variant="contained"
              color="warning"
            >
              ELIMINAR
            </Button>
          </>
        )}
      </form>

      {/* VISTA PREVIA DEL MARKDONW */}

      {/* <MEDitor.Markdown source={readme} /> */}

      {/* REPRODUCTOR CLASE GLABADA */}
    </div>
  );
};

export default ContentDetail;
