
/**
 * used for defining how to handle table column in Table-component
 * @param headerText show in head element on the column.
 * @param dataColumn text shown in body element column.
 * @param type type of TableColumnDataType
 */
class TableColumnData {
  constructor(headerText = "", dataColumn = "", type = TableColumnDataType.TEXT, showText = true, component = null, sortable = false) {

    // type checks
    if (typeof headerText != "string") { throw Error("headerText is not string: " + typeof headerText) }
    // dataColumn can be any
    if (!TableColumnDataType[type]) { throw Error("type is not TableColumnDataType: " + type) }
    if (typeof showText != "boolean") { throw Error("showText is not boolean" + typeof showText) }
    if (component != null && component.constructor.name !== "Object") { throw Error("component is not Object:" + component.constructor.name) }


    this.headerText = headerText; // string
    this.dataColumn = dataColumn; // string
    this.type = type; // TableColumnDataType
    this.showText = showText; // bool
    this.component = component; // React.Component
    this.sortable = sortable;
  }

  fromObject = (object) => {
    return new TableColumnData(
      object["headerText"],
      object["dataColumn"],
      object["type"],
      object["showText"],
      object["component"],
      object["sortable"]
    );
  }
}

/**
 * table column type, defines how column is rendered
 */
const TableColumnDataType = {
  TEXT: "TEXT",
  BUTTON: "BUTTON",
  HEAD: "HEAD",
  EDITABLE_TEXT: "EDITABLE_TEXT",
  COMPONENT: "COMPONENT"
}

export { TableColumnDataType, TableColumnData };