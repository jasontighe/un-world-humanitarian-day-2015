/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import EventEmitter from 'eventemitter3';
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import DefaultComponents from '../content/DefaultComponents';
const CHANGE_EVENT = 'change';

var pages = {};
Object.keys(DefaultComponents).forEach(path => {
  pages[path] = {
    component: DefaultComponents[path],
    path: path
  };
});
var loading = false;

var AppStore = Object.assign({}, EventEmitter.prototype, {

  isLoading() {
    console.log('AppStore.isLoading');
    return loading;
  },

  /**
   * Gets page data by the given URL path.
   *
   * @param {String} path URL path.
   * @returns {*} Page data.
   */
   getPage(path) {
     console.log('AppStore.getPage - path: ', path);
    return path in pages ? pages[path] : null;
  },

  /**
   * Emits change event to all registered event listeners.
   *
   * @returns {Boolean} Indication if we've emitted an event.
   */
      emitChange() {
    console.log('AppStore.emitChange');
    return this.emit(CHANGE_EVENT);
  },

  /**
   * Register a new change event listener.
   *
   * @param {function} callback Callback function.
   */
      onChange(callback) {
      console.log('AppStore.onChange - callback: ', callback);
      this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
      off(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppStore.dispatchToken = Dispatcher.register((action) => {

  switch (action.type) {

    case ActionTypes.GET_PAGE:
      loading = true;
      AppStore.emitChange();
      break;

    case ActionTypes.RECEIVE_PAGE:
      loading = false;
      if (!action.err) {
        pages[action.page.path] = action.page;
      }
      AppStore.emitChange();
      break;

    default:
    // Do nothing
  }

});

export default AppStore;
