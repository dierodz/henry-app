import React from "react";
import ReactDOM from "react-dom";
import MEDitor from "@uiw/react-md-editor";
// No import is required in the WebPack.
// import "@uiw/react-md-editor/dist/markdown-editor.css";

const mkdStr = `# 
asfasffas
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
    </div>
  );
}

