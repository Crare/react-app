
/**
 * used for defining how to handle table column in Table-component
 * @param headerText show in head element on the column.
 * @param dataColumn text shown in body element column.
 * @param type type of TableColumnDataType
 */
class TableColumnData {
  constructor(headerText = "", dataColumn = "", type = TableColumnDataType.TEXT, showText=true) {
    // type checks
    if (typeof headerText != "string") { throw Error("headerText is not string") }
    if (typeof dataColumn != "string") { throw Error("dataColumn is not string") }
    if (!TableColumnDataType[type]) { throw Error("type is not TableColumnDataType") }
    if (typeof showText != "boolean") { throw Error("showText is not boolean") }

    this.headerText = headerText; // string
    this.dataColumn = dataColumn; // string
    this.type = type; // TableColumnDataType
    this.showText = showText; // bool
  }
}

/**
 * table column type, defines how column is rendered
 */
const TableColumnDataType = {
  TEXT: "TEXT",
  BUTTON: "BUTTON",
  HEAD: "HEAD",
  EDITABLE_TEXT: "EDITABLE_TEXT"
}

export { TableColumnDataType, TableColumnData };