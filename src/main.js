import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSearchTemplate} from "./components/search.js";
import {createFilterTemplate} from "./components/filter.js";

import {createContentTemplate} from "./components/content.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createButtonLoadMoreTemplate} from "./components/button-load-more.js";

import {getFilterData} from "./data/filter.data";
import {getTaskData, generateTaskData} from "./data/task.data";

function renderComponent(selector, templateArray) {
  const templateList = templateArray.map((t) => t.template).join(`\n`);

  [...document.querySelectorAll(selector)].forEach((element) => {
    element.insertAdjacentHTML(`beforeend`, templateList);
  });
}

const TASK_PER_PAGE = 8;
let currentTaskSlot = 1;
let taskData = generateTaskData(getTaskData, ((TASK_PER_PAGE * 3) + 1)); // generate 3 slots of cards + 1 for first editable card
const firstTaskData = taskData.shift();

const prepareTaskTemplate = (template, data, quant) => {
  return new Array(quant)
    .fill(``)
    .map((e, i) => {
      return template(data[i]);
    })
    .join(``);
};

const prepareFilterData = () => {
  const filterData = getFilterData(taskData);
  return createFilterTemplate(filterData);
};

document.addEventListener(`DOMContentLoaded`, () => {
  renderComponent(`.main__control`, [{template: createSiteMenuTemplate()}]);
  renderComponent(`.main`, [{template: createSearchTemplate()}, {template: prepareFilterData()}, {template: createContentTemplate()}]);
  renderComponent(`.board__tasks`, [
    {template: createTaskEditTemplate(firstTaskData)},
    {template: prepareTaskTemplate(createTaskTemplate, taskData, (TASK_PER_PAGE - 1))} // exclude first editable task
  ]);
  renderComponent(`.board`, [{template: createButtonLoadMoreTemplate()}]);

  document.addEventListener(`click`, function (event) {
    if (event.target && event.target.classList.contains(`load-more`)) {
      const dataFrom = currentTaskSlot * TASK_PER_PAGE;
      const dataTo = dataFrom + TASK_PER_PAGE;
      const moreTaskData = taskData.slice(dataFrom, dataTo);

      renderComponent(`.board__tasks`, [
        {template: prepareTaskTemplate(createTaskTemplate, moreTaskData, TASK_PER_PAGE)}
      ]);

      currentTaskSlot++;

      if (dataTo === taskData.length) {
        event.target.classList.add(`visually-hidden`);
      }
    }
  });
});
