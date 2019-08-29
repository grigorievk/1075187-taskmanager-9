export const createTaskEditTemplate = ({ description, dueDate, repeatingDays, tagList, color, isFavorite, isArchive }) => {
  return `<article class="card card--edit card--${color}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites card__btn--disabled"
                  >
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${description}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">no</span>
                      </button>

                      <fieldset class="card__date-deadline" disabled>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder="23 September"
                            name="date"
                            value="${new Date(dueDate).toDateString()}"
                          />
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">no</span>
                      </button>

                      <fieldset class="card__repeat-days" disabled>
                        <div class="card__repeat-days-inner">
                        ${Array.from(repeatingDays).map((day) => `
                            <input
                              class="visually-hidden card__repeat-day-input"
                              type="checkbox"
                              id="repeat-${day}-1"
                              name="repeat"
                              value="${day}"
                            />
                            <label class="card__repeat-day" for="repeat-${day}-1"
                              >${day}</label
                            >`).join(``)}
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list"></div>
                       ${Array.from(tagList).map((tag) => `<label>
                        <input
                          type="text"
                          class="card__hashtag-input"
                          name="hashtag-input"
                          placeholder="${tag}"
                        />
                      </label>`).join(``)}
                    </div>
                  </div>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      ${Array.from([`black`, `yellow`, `blue`, `green`, `pink`])
                        .map((tagColor) => ` 
                            <input
                              type="radio"
                              id="color-${tagColor}-1"
                              class="card__color-input card__color-input--${tagColor} visually-hidden"
                              name="color"
                              value="${tagColor}"
                              ${tagColor === color ? ' checked' : ''}
                            />
                            <label
                              for="color-${tagColor}-1"
                              class="card__color card__color--${tagColor}"
                              >${tagColor}</label
                            >`)
                        .join(``)}
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`;
};
