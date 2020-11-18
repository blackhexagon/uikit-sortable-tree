import React, { Component } from "react";
import { isDescendant } from "react-sortable-tree";

function classnames(...classes) {
  return classes.filter(Boolean).join(" ");
}

class NodeRendererDefault extends Component {
  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      subtitle,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      buttons,
      className,
      style,
      didDrop,
      treeId,
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      rowDirection,
      ...otherProps
    } = this.props;
    const nodeTitle = title || node.title;
    const nodeSubtitle = subtitle || node.subtitle;
    const rowDirectionClass = rowDirection === "rtl" ? "rst__rtl" : null;

    let handle;
    if (canDrag) {
      if (typeof node.children === "function" && node.expanded) {
        // Show a loading symbol on the handle when the children are expanded
        // and yet still defined by a function (a callback to fetch the children)
        handle = (
          <div className="rst__loadingHandle">
            <div className="rst__loadingCircle">
              {[...new Array(12)].map((_, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={classnames(
                    "rst__loadingCirclePoint",
                    rowDirectionClass
                  )}
                />
              ))}
            </div>
          </div>
        );
      } else {
        // Show the handle used to initiate a drag-and-drop
        handle = connectDragSource(
          <div className={"uk-sortable-handle uk-padding-small uk-margin-right"}>
            <span data-uk-icon={"table"} />
          </div>,
          {
            dropEffect: "copy",
          }
        );
      }
    }

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    let buttonStyle = { left: -0.5 * scaffoldBlockPxWidth };
    if (rowDirection === "rtl") {
      buttonStyle = { right: -0.5 * scaffoldBlockPxWidth };
    }

    return (
      <div style={{ height: "100%" }} {...otherProps}>
        {toggleChildrenVisibility &&
          node.children &&
          (node.children.length > 0 || typeof node.children === "function") && (
            <div>
              <button
                type="button"
                aria-label={node.expanded ? "Collapse" : "Expand"}
                className={classnames(
                  node.expanded ? "rst__collapseButton" : "rst__expandButton",
                  rowDirectionClass
                )}
                style={buttonStyle}
                onClick={() =>
                  toggleChildrenVisibility({
                    node,
                    path,
                    treeIndex,
                  })
                }
              />

              {node.expanded && !isDragging && (
                <div
                  style={{ width: scaffoldBlockPxWidth }}
                  className={classnames("rst__lineChildren", rowDirectionClass)}
                />
              )}
            </div>
          )}

        <div className={classnames("rst__rowWrapper", rowDirectionClass)}>
          {/* Set the row preview to be used during drag and drop */}
          {connectDragPreview(
            <div
              className={classnames(
                "rst__row",
                isLandingPadActive && "rst__rowLandingPad",
                isLandingPadActive && !canDrop && "rst__rowCancelPad",
                isSearchMatch && "rst__rowSearchMatch",
                isSearchFocus && "rst__rowSearchFocus",
                rowDirectionClass,
                className
              )}
              style={{
                opacity: isDraggedDescendant ? 0.5 : 1,
                ...style,
              }}
            >
              {handle}
              <div className={"uk-flex uk-flex-middle"}>
                {typeof nodeTitle === "function"
                  ? nodeTitle({
                      node,
                      path,
                      treeIndex,
                    })
                  : nodeTitle}

                {nodeSubtitle && (
                  <span className="rst__rowSubtitle">
                    {typeof nodeSubtitle === "function"
                      ? nodeSubtitle({
                          node,
                          path,
                          treeIndex,
                        })
                      : nodeSubtitle}
                  </span>
                )}

                <div className="uk-margin-left">{buttons}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default {
  nodeContentRenderer: NodeRendererDefault,
  scaffoldBlockPxWidth: 50,
  rowHeight: 70,
  slideRegionSize: 50,
};
