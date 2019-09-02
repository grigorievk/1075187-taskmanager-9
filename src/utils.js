const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place) => {
  const containerElement = (typeof container === `string`) ? document.querySelector(container) : container;

  if (!containerElement) {
    return;
  }

  switch (place) {
    case Position.AFTERBEGIN:
      containerElement.prepend(element);
      break;
    case Position.BEFOREEND:
    default:
      containerElement.append(element);
      break;
  }
};

export const unrender = (element) => {
  if (!element) {
    return;
  }

  element.remove();
};
