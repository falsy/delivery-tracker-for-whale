class WebStorage {
  
  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key) {
    return JSON.parse(this.localStorage.getItem(key));
  }

  set(key, value) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  clear() {
    this.localStorage.clear();
  }

  remove(key) {
    this.localStorage.removeItem(key);
  }

}

export default WebStorage;