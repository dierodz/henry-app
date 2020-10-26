import React, { useMemo, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { getUserRol } from "apollo/querys/users";
import { ADD_ROLE } from "apollo/Mutations/role";

function PM({ className }) {
  const { loading, error, data, refetch } = useQuery(getUserRol, {
    variables: { role: "pm" },
  });

data && console.log(data)

  const [addRoleMutation, resultAddRole] = useMutation(ADD_ROLE);

  useEffect(() => {
    if (!resultAddRole.loading && resultAddRole.called) {
      refetch();
    }
  }, [resultAddRole, refetch]);

     function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: data ? data.getUserRol.map((user)=> {
         return {__typename: user.__typename,
         familyName: capitalizeFirstLetter(user.familyName),
         givenName: capitalizeFirstLetter(user.givenName),
         id: user.id,
         roles: user.roles,
         cohortes: user.cohortes.length,
         groups: user.groups.length,
         }
         }) : undefined,
      /*data: data ? data.getUserRol : undefined,*/
      columns: [
        { key: "givenName", label: "Nombre", align: "left" },
        { key: "familyName", label: "Apellido", align: "left" },
        { key: "cohortes", label: "Cohortes", align: "left" },
        { key: "groups", label: "Grupos", align: "left" },
      ],
      addButtonLabel: "Agregar PM",
      actions: {
        create: {
          initialValues: {
            email: "",
          },
          inputs: [{ key: "email", label: "Email" }],
          onSubmit: async (values) => {
            const data = {
              variables: {
                ...values,
                roleName: "pm",
              },
            };
            await addRoleMutation(data);
          },
          submitButtonLabel: "Añadir",
          title: "Añadir PM",
        },
        delete: {
          onSubmit: (id) => alert(id),
        },
      },
    }),
    [addRoleMutation, data, error, loading]
  );

  return (
    <div className={className}>
      <Tabla data={tableData} />
    </div>
  );
}

export default PM;
