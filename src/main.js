import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSearchTemplate} from "./components/search.js";
import {createFilterTemplate} from "./components/filter.js";

import {createContentTemplate} from "./components/content.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createButtonLoadMoreTemplate} from "./components/button-load-more.js";

function renderComponent(selector, templateArray) {
  const templateList = templateArray.map((t) => {
    let template = t.template();

    if (t.hasOwnProperty(`quant`) && t.quant > 1) {
      template = template.repeat(t.quant);
    }
    return template;
  }).join(`\n`);

  [...document.querySelectorAll(selector)].forEach((element) => {
    element.insertAdjacentHTML(`beforeend`, templateList);
  });
}

document.addEventListener(`DOMContentLoaded`, () => {
  renderComponent(`.main__control`, [{template: createSiteMenuTemplate}]);
  renderComponent(`.main`, [{template: createSearchTemplate}, {template: createFilterTemplate}, {template: createContentTemplate}]);
  renderComponent(`.board__tasks`, [{template: createTaskEditTemplate}, {template: createTaskTemplate, quant: 3}]);
  renderComponent(`.board`, [{template: createButtonLoadMoreTemplate}]);
});
