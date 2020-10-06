import React from "react";
import { useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import COHORTES from "apollo/querys/cohortes";

function Cohortes({ className }) {
   const { loading, error, data } = useQuery(COHORTES);
   const columnas = [
      "Nombre de cohorte",
      "Nombre del instructor",
      "Numero de Cohorte",
      "Fecha de inicio",
   ];
   const info = [
      { name: "WEBFT01", instructor: 1, number: 1, startDate: "07/08/2020" },
      { name: "WEBFT02", instructor: 2, number: 2, startDate: "07/08/2020" },
      { name: "WEBFT03", instructor: 3, number: 3, startDate: "07/08/2020"},
   ];
   return (
      <div className={className}>
         <Tabla columnas={columnas} info={info} />
      </div>
   );
}

export default Cohortes;
