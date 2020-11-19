import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


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
