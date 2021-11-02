const createElement = (parent) => (tag, props = {}, attributes) => {
  const el = document.createElement(tag);

  Object.assign(el, props);

  if (parent) {
    parent.appendChild(el);
  }

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) =>
      el.setAttribute(key, value)
    );
  }

  return el;
};

export default createElement;
