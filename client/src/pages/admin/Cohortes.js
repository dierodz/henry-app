import React from "react";
import { useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import COHORTES from "apollo/querys/cohortes";

function Cohortes({ className }) {
   const { loading, error, data } = useQuery(COHORTES);
   const columnas = [
      "Nombre de cohorte",
      "Nombre del instructor",
      "Cant. de Alumnos",
   ];
   const info = [
      { name: "WEBFT01", instructor: "Toni", cantidad: 194 },
      { name: "WEBFT02", instructor: "Franco", cantidad: 159 },
      { name: "WEBFT03", instructor: "Emi", cantidad: 100 },
   ];
   return (
      <div className={className}>
         <Tabla columnas={columnas} info={info} />
      </div>
   );
}

export default Cohortes;
