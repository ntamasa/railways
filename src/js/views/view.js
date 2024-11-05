export default class View {
  _data;

  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[]} data The data to be rendered
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Tamás Nagy
   */
  render(data, render) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    // if (!render) return markup;
    if (render) {
      this._parentElement.insertAdjacentHTML("beforeend", markup);
      return;
    }

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {}

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {}

  // TODO error model markup and styling
  renderError(message = this._errorMessage) {
    const markup = `<div class="error-model">
            <p class="error-text">${message}</p>
            <button class="error-btn">OK</button>
          </article>`;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage() {}
}
