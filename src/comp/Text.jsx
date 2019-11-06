import React, { useState } from "react";
import { TextField } from "@material-ui/core";

const Tetx = () => {
  const [text, setText] = useState("");

  const searchHendler = ev => {
    if (ev.key === "Enter") {
      window.location.replace(
        `https://www.google.com/search?q=${text}&oq=${text}&aqs=chrome..69i57j69i60j0l4.1200j0j7&client=ubuntu&sourceid=chrome&ie=UTF-8`
      );
    }
  };

  return (
    <TextField
      onChange={ev => setText(ev.target.value)}
      style={{
        margin: "auto",
        minWidth: "750px",
        borderRadius: "20px",
        height: "40px",
        backgroundColor: "white"
      }}
      onKeyPress={searchHendler}
      value={text}
    />
  );
};

export default Tetx;
