import React from "react";
import ReactDOM from "react-dom";
import MEDitor from "@uiw/react-md-editor";

import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from  "@material-ui/core"; 



const mkdStr = `# 
HOLA ALEXANDER
`;


export default function App() {
  const [value, setValue] = React.useState();
  return (
    <div className="container">
      <MEDitor height={800} value={value} onChange={setValue} />
        <div style={{ padding: "50px 0 0 0" }} />
        {/* VISTA PREVIA DEL MARKDONW */}
        <button>Guardar</button>
        <MEDitor.Markdown source={value} />

        {/* REPRODUCTOR CLASE GLABADA */}
        <div>
            <h1>ACA VA EL REPRODUCTOR
            </h1>
        </div>
    </div>
  );
}

