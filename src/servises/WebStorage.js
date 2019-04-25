export default class WebStorage {
  static get(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  static set(key, target, value) {
    const storage = WebStorage.get(key) || {};
    storage[target] = value;
    window.localStorage.setItem(key, JSON.stringify(storage));
  }

  static clear() {
    window.localStorage.clear();
  }
}