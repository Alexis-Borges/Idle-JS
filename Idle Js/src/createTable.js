import createElement from "./createElement";

const createTable = (headers, rows) => {
  const table = createElement()("table", {
    className:
      "border-2 border-green-200 mt-4 table-auto border-collapse w-full"
  });
  const thead = createElement(table)("thead");
  const tbody = createElement(table)("tbody");

  headers.forEach((header) =>
    createElement(thead)("th", {
      textContent: header,
      className: "border-2  border-grey-600 p-3"
    })
  );
  rows.forEach((cells, index) => {
    const tr = createElement(tbody)("tr", {
      className: index % 2 === 0 ? "bg-blue-100" : ""
    });

    cells.forEach((cell) => {
      const td = createElement(tr)("td", {
        className: "border-2  border-green-200 text-right p-2"
      });

      if (typeof cell === "string") {
        td.textContent = cell;

        return;
      }

      td.appendChild(cell);
    });
  });

  return table;
};

export default createTable;
