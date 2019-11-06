import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useEffect, useState } from "react";
export const AlertDialog = ({ open, setOpen, initial, dispatch, setId }) => {
  const init = val => (val !== undefined ? val : { url: "", name: "" });

  const [textValue, setText] = useState(init(initial));
  useEffect(() => {
    setText(init(initial));
  }, [initial]);

  const handleChange = ({ target: { value } }, type) => {
    if (type === "name") {
      setText({ ...textValue, name: value });
    } else {
      setText({ ...textValue, url: value });
    }
  };

  const handleSubmit = () => {
    setId(null);
    setOpen(false);
    setText(init(undefined));
    if (initial) {
      dispatch({ type: "EDIT", payload: { textValue, initial } });
    } else {
      dispatch({ type: "ADD", payload: textValue });
    }
  };

  const handleCancell = () => {
    setId(null);
    setOpen(false);
    setText(init(undefined));
  };

  const handleDelete = () => {
    setId(null);
    setOpen(false);
    setText(init(undefined));
    dispatch({ type: "DELETE", payload: initial });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setText(init(undefined));
        setOpen(false);
        setId(null);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{!initial ? "Add a Title" : "Edit Title"}</DialogTitle>
      <DialogContent style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          type="url"
          label="URL"
          value={textValue.url}
          onChange={ev => handleChange(ev, "url")}
        />
        <TextField
          label="Name"
          value={textValue.name}
          onChange={ev => handleChange(ev, "name")}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          style={{ marginRight: "auto" }}
          onClick={handleDelete}
          disabled={initial === undefined ? true : false}
        >
          Delete
        </Button>
        <Button onClick={handleCancell} color="primary">
          Cancell
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
