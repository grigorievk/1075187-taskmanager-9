import {createElement} from "../utils";

export class Content {
  constructor() {
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<section class="board container">
         <div class="board__tasks"></div>
    </section>`;
  }
}
