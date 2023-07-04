import View from "./view.js";

class SearchView extends View {
  _parentEl = document.querySelector(".search");

  getQuery() {
    // gets query
    const query = this._parentEl.querySelector('.search__field').value;
    // clears the inputfield
    this._clearInput();
    return query;
  }

  // clears the inputfield after search
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  // listens when search is submitted
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

// Here we export an instance of the class. This way there can only be 1 searchView
export default new SearchView();


