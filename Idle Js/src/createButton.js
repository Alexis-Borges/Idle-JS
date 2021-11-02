import createElement from "./createElement";

const createButton = (text, props, parent) =>
  createElement(parent)("button", {
    className: "bg-blue-600 text-white py-1 px-3",
    textContent: text,
    ...props
  });

export default createButton;
