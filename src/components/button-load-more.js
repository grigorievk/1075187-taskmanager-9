import {createElement} from "../utils";

export class ButtonLoadMore {
  constructor() {
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
