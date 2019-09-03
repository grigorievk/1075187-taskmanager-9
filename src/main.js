import {render} from "./utils";

import {SiteMenu} from "./components/site-menu.js";
import {Search} from "./components/search.js";
import {Filter} from "./components/filter.js";

import {Content} from "./components/content.js";
import {TaskEdit} from "./components/task-edit.js";
import {Task} from "./components/task.js";
import {TaskEmpty} from "./components/task-empty.js";
import {ButtonLoadMore} from "./components/button-load-more.js";

import {getFilterData} from "./data/filter.data";
import {getTaskData, generateTaskData} from "./data/task.data";

const TASK_PER_PAGE = 8;
let currentTaskSlot = 1;
const taskData = generateTaskData(getTaskData, (TASK_PER_PAGE * 3)); // generate 3 slots of cards

const prepareFilterData = () => {
  const filterData = getFilterData(taskData);
  return new Filter(filterData);
};

const siteMenu = new SiteMenu();
const content = (taskData.length) ? new Content() : new TaskEmpty();

document.addEventListener(`DOMContentLoaded`, () => {
  render(`.main__control`, siteMenu.getElement());

  [new Search(), prepareFilterData(), content].forEach((t) => render(`.main`, t.getElement())); // search, filter, content

  const tasksContainer = document.querySelector(`.board__tasks`);
  const renderTask = (itemData) => {
    const task = new Task(itemData);
    const taskEdit = new TaskEdit(itemData);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(tasksContainer, task.getElement());
  };

  const renderButton = () => {
    const buttonLoadMore = new ButtonLoadMore();

    render(`.board`, buttonLoadMore.getElement());

    buttonLoadMore.getElement()
      .addEventListener(`click`, function (event) {
        const dataFrom = currentTaskSlot * TASK_PER_PAGE;
        const dataTo = dataFrom + TASK_PER_PAGE;

        taskData.slice(dataFrom, dataTo).forEach((itemData) => renderTask(itemData));

        currentTaskSlot++;

        if (dataTo === taskData.length) {
          event.target.classList.add(`visually-hidden`);
        }
      });
  };

  if (taskData.length) {
    [...taskData].slice(0, TASK_PER_PAGE).forEach((itemData) => renderTask(itemData));

    renderButton();
  }
});
