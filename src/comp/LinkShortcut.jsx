import React, { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CardActionArea, CardContent, Avatar } from "@material-ui/core";

export const LinkShortcut = ({ item, setOpen, index, memoFunc, closure }) => {
  const [state, setState] = useState({ opacity: "0" });

  return (
    <div
      className="card-shortcut"
      onMouseEnter={() => setState({ opacity: "1" })}
      onMouseLeave={() => setState({ opacity: "0" })}
      onDragStart={ev => {
        closure.first = memoFunc(item.name);
      }}
      onDrop={ev => {
        closure.first(item.name);
      }}
      onDragOver={ev => ev.preventDefault()}
      draggable
    >
      <CardActionArea>
        <div
          className="keter"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            ...state
          }}
          onClick={() => setOpen(index)}
        >
          <MoreVertIcon />
        </div>
        <CardContent onClick={ev => window.open(item.url, "_blank")}>
          <Avatar src={require("../accets/icon.png")}> </Avatar>
          <h5 style={{ color: "white" }}>{item.name}</h5>
        </CardContent>
      </CardActionArea>
    </div>
  );
};
