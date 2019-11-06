import { filter, findIndex } from "lodash";
import React, { useReducer, useState } from "react";
import { AlertDialog } from "./comp/DialogForm.jsx";
import Links from "./comp/Links";
import Text from "./comp/Text.jsx";

const initialItems = [
  { url: "http://www.youtube.com", name: "Youtube" },
  { url: "http://www.faceboo.com", name: "Facebook" },
  { url: "http://www.instagram.com", name: "Instagram" }
];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { ...action.payload, url: `http://${action.payload.url}` }
      ];
    case "DELETE":
      return del(state, action);
    case "EDIT":
      return edit(state, action.payload);
    case "SWAP":
      return swap(action.payload, state);
    default:
      return state;
  }
};

const del = (state, action) => {
  const index = findIndex(state, action.payload);
  state[index] = null;
  return filter(state, function(o) {
    return o;
  });
};

const edit = (state, { textValue, initial }) => {
  const index = findIndex(state, initial);
  state[index] = textValue;
  return [...state];
};

const swap = (action, state) => {
  const { draged, droped } = action;
  let pos2 = state.findIndex(object => {
    return object.name === draged;
  });
  let pos1 = state.findIndex(object => {
    return object.name === droped;
  });
  let samplearray = state;
  let temp = state[pos1];
  samplearray[pos1] = state[pos2];
  samplearray[pos2] = temp;
  return [...samplearray];
};

function App() {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const [items, dispatchItem] = useReducer(reducer, initialItems);
  const [id, setId] = useState(null);

  const openHandler = id => {
    setOpen(true);
    setId(id);
  };

  const drag = ev => {
    ev.preventDefault();
  };

  return (
    <>
      <img
        style={{ position: "absolute", zIndex: "-1" }}
        className={loaded ? "background-image-new" : "background-image"}
        src="https://source.unsplash.com/random/1920x1080"
        onLoad={ev => {
          setLoaded(true);
        }}
        alt=""
      />
      <div style={{ maxWidth: "750px", margin: "auto" }}>
        <div className="logo-transparant" />
        <Text />
        <div onDragOver={drag} className="shortcuts">
          <Links
            items={items}
            setOpen={openHandler}
            dispatchItem={dispatchItem}
          />
        </div>
      </div>
      {id !== null && (
        <AlertDialog
          initial={items[id]}
          dispatch={dispatchItem}
          open={open}
          setOpen={setOpen}
          setId={setId}
        />
      )}
    </>
  );
}

export default App;
