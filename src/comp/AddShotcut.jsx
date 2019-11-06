import React from "react";
import PlusOne from "@material-ui/icons/PlusOne";
import { CardActionArea, CardContent, Avatar } from "@material-ui/core";

export const AddShortcut = ({ setOpen }) => {
  return (
    <div className="card-shortcut">
      <CardActionArea>
        <CardContent onClick={ev => setOpen()}>
          <div>
            <Avatar component={PlusOne}> </Avatar>
          </div>
          <h5 style={{ textAlign: "center", color: "white" }}>Add</h5>
        </CardContent>
      </CardActionArea>
    </div>
  );
};
