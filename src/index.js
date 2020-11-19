import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.css";

export default function initUIKitSortableTree({
  element = document.querySelector("[uk-tree]"),
  data = [],
  defaultLocale,
  locales = [],
  onSave = () => {},
  onEdit = null,
  translations = {
    add: "Add",
    save: "Save",
    empty: "(Empty)",
  },
  height = 400,
}) {
  UIkit.use(Icons);

  if (!element) throw new Error("Provided element is not valid");

  if (locales.length === 0) throw new Error("Provide locales");

  ReactDOM.render(
    <App
      defaultLocale={defaultLocale}
      initialData={data}
      onSave={onSave}
      onEdit={onEdit}
      translations={translations}
      height={height}
      locales={locales}
    />,
    element
  );
}

initUIKitSortableTree({
  element: document.getElementById("root"),
  data: [
    { id: 1, title: { cs: "Novinky", en: "News" }, parent: null },
    { id: 2, title: { cs: "Galerie", en: "Gallery" }, parent: null },
    { id: 3, title: { cs: "Interiéry", en: "Interiors" }, parent: 2 },
    { id: 4, title: { cs: "Praha", en: "Prague" }, parent: 3 },
  ],
  onSave: (data) => {
    console.log(data);
  },
  onEdit: (id) => {
    console.log(id);
  },
  height: "80vh",
  locales: [
    ["cs", "Čeština"],
    ["en", "Angličtina"],
  ],
  defaultLocale: "cs",
  translations: {
    add: "Přidat",
    save: "Uložit",
    empty: "(Prázdné)",
  },
});
