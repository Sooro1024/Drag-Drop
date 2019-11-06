import nanoid from "nanoid";
import React from "react";
import { AddShortcut } from "./AddShotcut.jsx";
import { LinkShortcut } from "./LinkShortcut.jsx";
const addId = nanoid();

const Links = ({ items, setOpen, dispatchItem }) => {
  const memoFunc = first => {
    return second => {
      dispatchItem({
        type: "SWAP",
        payload: { draged: first, droped: second }
      });
    };
  };

  const closure = {};

  if (items.length !== 0) {
    return items.map((item, index) => {
      const id = nanoid();
      if (items.length < 10 && index === items.length - 1) {
        return (
          <React.Fragment key={index}>
            <LinkShortcut
              index={index}
              setOpen={setOpen}
              item={item}
              key={id}
              memoFunc={memoFunc}
              closure={closure}
            />
            <AddShortcut key={addId} setOpen={setOpen} />
          </React.Fragment>
        );
      } else {
        return (
          <LinkShortcut
            index={index}
            item={item}
            key={id}
            setOpen={setOpen}
            memoFunc={memoFunc}
            closure={closure}
          />
        );
      }
    });
  } else {
    return <AddShortcut key={addId} setOpen={setOpen} />;
  }
};

export default React.memo(Links);
