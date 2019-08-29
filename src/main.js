import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSearchTemplate} from "./components/search.js";
import {createFilterTemplate} from "./components/filter.js";

import {createContentTemplate} from "./components/content.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createButtonLoadMoreTemplate} from "./components/button-load-more.js";

import {getFilterData} from "./data/filter.data";
import {getTaskData} from "./data/task.data";

let taskData = [];

function renderComponent(selector, templateArray) {
  const templateList = templateArray.map((t) => t.template).join(`\n`);

  [...document.querySelectorAll(selector)].forEach((element) => {
    element.insertAdjacentHTML(`beforeend`, templateList);
  });
}

const prepareTaskTemplate = (template, data, quant) => {
  return new Array(quant)
    .fill(``)
    .map(() => {
      const result = data();
      taskData.push(result);
      console.log(result);
      return result;
    })
    .map(template)
    .join(``);
};
const getTaskTemplate = prepareTaskTemplate(createTaskTemplate, getTaskData, 3);

const prepareFilterData = () => {
  console.log(taskData);
  const filterData = getFilterData([...taskData]);
  return createFilterTemplate(filterData);
};

document.addEventListener(`DOMContentLoaded`, () => {
  renderComponent(`.main__control`, [{template: createSiteMenuTemplate()}]);
  renderComponent(`.main`, [{template: createSearchTemplate()}, {template: prepareFilterData()}, {template: createContentTemplate()}]);
  renderComponent(`.board__tasks`, [
    {template: createTaskEditTemplate()},
    {template: getTaskTemplate}
  ]);

  console.log(taskData);
  renderComponent(`.board`, [{template: createButtonLoadMoreTemplate()}]);
});
