import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.css";

export default function initUIKitSortableTree({
  element = document.querySelector("[uk-tree]"),
  data = [],
  onSave = () => {},
  locale = {
    add: "Add",
    save: "Save",
    empty: "(Empty)",
  },
  height = 400,
}) {
  UIkit.use(Icons);
  if (element) {
    ReactDOM.render(
      <App
        initialData={data}
        onSave={onSave}
        locale={locale}
        height={height}
      />,
      element
    );
  } else {
    console.error("Provided element is not valid");
  }
}

initUIKitSortableTree({
  element: document.getElementById("root"),
  data: [
    { id: 1, name: "Novinky", parent: null },
    { id: 2, name: "Galerie", parent: null },
    { id: 3, name: "Interiéry", parent: 2 },
    { id: 4, name: "Praha", parent: 3 },
  ],
  onSave: (data) => {
    console.log(data);
  },
  height: "80vh",
  locale: {
    add: "Přidat",
    save: "Uložit",
    empty: "(Prázdné)",
  },
});
