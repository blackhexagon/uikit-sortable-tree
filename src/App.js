import React, { useState } from "react";
import SortableTree, {
  changeNodeAtPath,
  addNodeUnderParent,
  removeNodeAtPath,
  getTreeFromFlatData,
  getFlatDataFromTree,
} from "react-sortable-tree";
import "react-sortable-tree/style.css";
import theme from "./theme";
import uniqueString from "unique-string";

const getNodeKey = ({ treeIndex }) => treeIndex;

function App({
  initialData,
  onSave,
  onEdit,
  translations,
  height,
  locales,
  defaultLocale = locales[0][0],
}) {
  const [locale, setLocale] = useState(defaultLocale);
  const [isExpanded, setIsExpanded] = useState(true);
  const [data, setData] = useState(() =>
    getTreeFromFlatData({
      flatData: initialData.map((node) => ({
        ...node,
        title: node.title,
        expanded: true,
      })),
      getKey: (node) => node.id, // resolve a node's key
      getParentKey: (node) => node.parent, // resolve a node's parent's key
      rootKey: null, // The value of the parent key when there is no parent (i.e., at root level)
    })
  );

  const createNewNode = () => ({
    title: locales.reduce((acc, [key]) => {
      acc[key] = translations.empty;
      return acc;
    }, {}),
    id: uniqueString(),
  });

  const handleChange = (newData) => {
    setData(newData);
  };

  const handleAddRootItem = () => {
    const newData = [createNewNode(), ...data];
    setData(newData);
  };

  const handleAddChildItem = (path) => {
    const { treeData: newData } = addNodeUnderParent({
      treeData: data,
      parentKey: path[path.length - 1],
      expandParent: true,
      getNodeKey,
      newNode: createNewNode(),
      addAsFirstChild: false,
    });
    setData(newData);
  };

  const handleRemoveItem = (path) => {
    setData(
      removeNodeAtPath({
        treeData: data,
        path,
        getNodeKey,
      })
    );
  };

  const handleChangeTitle = (path, node, { target: { value } }) => {
    setData(
      changeNodeAtPath({
        treeData: data,
        path,
        getNodeKey,
        newNode: { ...node, title: { ...node.title, [locale]: value } },
      })
    );
  };

  const handleExport = () => {
    onSave(
      getFlatDataFromTree({
        treeData: data,
        getNodeKey: ({ node }) => node.id,
        ignoreCollapsed: false,
      }).map(({ node, path }) => ({
        id: node.id,
        title: node.title,
        // The last entry in the path is this node's key
        // The second to last entry (accessed here) is the parent node's key
        parent: path.length > 1 ? path[path.length - 2] : null,
      }))
    );
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    isExpanded
      ? setData(data.map((it) => ({ ...it, expanded: false })))
      : setData(data.map((it) => ({ ...it, expanded: true })));
  };

  return (
    <>
      <div style={{ height }} className={"uk-padding-small uk-overflow-hidden"}>
        {locales.length > 0 && (
          <ul className={"uk-tab"}>
            {locales.map(([key, name]) => (
              <li
                key={key}
                className={key === locale ? "uk-active" : ""}
                onClick={() => setLocale(key)}
              >
                <a href={"#"}>{name}</a>
              </li>
            ))}
          </ul>
        )}
        <button
          title={translations.add}
          className={"uk-icon-button uk-margin-left"}
          data-uk-icon="git-branch"
          style={{ transform: "rotate(90deg)" }}
          onClick={handleAddRootItem}
        />
        <button
          title={isExpanded ? translations.shrink : translations.expand}
          className={"uk-icon-button uk-margin-left"}
          data-uk-icon={isExpanded ? "shrink" : "expand"}
          onClick={toggleExpansion}
        />
        <SortableTree
          treeData={data}
          onChange={handleChange}
          theme={theme}
          generateNodeProps={({ node, path }) => ({
            buttons: [
              <button
                className={"uk-icon-button"}
                onClick={() => handleAddChildItem(path)}
                data-uk-icon="git-branch"
                style={{ transform: "rotate(90deg)" }}
                key={"add"}
              />,
              typeof node.id === "number" && onEdit ? (
                <button
                  className={"uk-icon-button"}
                  onClick={() => onEdit(node.id)}
                  data-uk-icon="pencil"
                  key={"edit"}
                />
              ) : null,
              <button
                className={"uk-icon-button"}
                onClick={() => handleRemoveItem(path)}
                data-uk-icon="trash"
                key={"remove"}
              />,
            ],
            title: (
              <input
                className={"uk-input"}
                value={node.title[locale]}
                onChange={(event) => handleChangeTitle(path, node, event)}
              />
            ),
          })}
        />
      </div>
      <button
        className={"uk-button uk-button-primary uk-margin-top"}
        onClick={handleExport}
      >
        {translations.save}
      </button>
    </>
  );
}

export default App;
