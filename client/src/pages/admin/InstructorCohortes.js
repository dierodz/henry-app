import React, { useEffect, useMemo} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { USER_FULL } from "apollo/querys/users";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function InstructorCohortes(datos) {

  const { id } = useParams();
  const variables = { id: parseInt(id) };
  const { push } = useHistory();


  const {data: preData, loading: queryLoading, error, refetch} = useQuery(USER_FULL, {variables})


const usercohorte = useMemo (() => {
      if (datos.datos && Array.isArray(preData?.users)) {
        const usuario = preData.users.find((user) => user.id === datos.datos).cohortes
        return usuario
      }
})

  const data = useMemo(() => {
    if(datos.datos) {
      return usercohorte;
    }
    if (Array.isArray(preData?.users)) {
      return preData.users[0].cohortes.map((item) => {
        return {
          ...item,
          name: item.name,
        };
      });
    } return preData;
  }, [preData, usercohorte]);

  
   useEffect(() => {
    if (!preData) {
      refetch();
    }
  }, [refetch]);

  const loading = useMemo(
    () => queryLoading,
    [queryLoading]
  );


  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: data || usercohorte,
      columns: [
        { key: "name", label: "Nombre del cohorte", align: "left" },
        { key: "id", label: "ID", align: "left" },
      ],
       actions: {
        view: {
          onSubmit: (id) => push(`/admin/cohorte/${id}`),
        },
       }

     })
  );


  return (
    <div style={{ height: "calc(100vh - 65px)" }}>
    <Tabla data={tableData} />
    </div>
  );
}

export default InstructorCohortes;