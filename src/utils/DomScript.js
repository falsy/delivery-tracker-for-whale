class DomScript {

  constructor(element) {
    this.element = null;
    this.selectElement(element);
    return this;
  }

  selectElement(element) {
    if(element === window || element === document) {
      this.element = this.arrayElement([], element);
    } else if(typeof element === 'object') {
      this.element = element;
    }

    if(typeof element === 'string') {
      this.element = this.select(element);
    }
  }

  select(element) {
    element = element.trim();
    if(/[\,\>\: \]\=]/.test(element)) {
      if(!document.querySelectorAll(element).length) element = [];
      else element = this.arrayElement([], document.querySelectorAll(element));
    } else {
      switch(element[0]) {
        case '#' :
          element = this.arrayElement([], document.getElementById(element.substring(1)));
          break;
        case '.' :
          if(!document.getElementsByClassName(element.substring(1)).length) element = [];
          else element = this.arrayElement([], document.getElementsByClassName(element.substring(1)));
          break;
        default :
          if(!document.getElementsByTagName(element).length) element = [];
          else element = this.arrayElement([], document.getElementsByTagName(element));
      }
    }
    return element;
  }

  arrayElement(store, element) {
    if(!element) return store;
    if(!element.length) return this.concat(store, element);
    for(const target of element) {
      store = this.concat(store, target);
    }
    return store;
  }

  oneSelect() {
    return this.element.length ? this.element[0] : this.element;
  }

  compactSplit(str, value) {
    return str.split(value).filter(Boolean);
  }

  finishValue(value) {
    value = typeof value === 'function' ? value() : value;
    return value;
  }

  concat(beforeArr, afterArr) {
    afterArr = Array.prototype.concat.call([], afterArr);
    afterArr.forEach(el => {
      if(beforeArr.indexOf(el) === -1) beforeArr = Array.prototype.concat.call(beforeArr, el);
    });
    return beforeArr;
  }

  findInParent(parent, children) {
    let cacheParent = children.parentNode;
    while(cacheParent !== null) {
      if(parent.indexOf(cacheParent) !== -1) return cacheParent;
      cacheParent = cacheParent.parentNode;
    }
    return null;
  }

  //

  el(idx=0) {
    return this.element[idx];
  }

  length() {
    return this.element.length;
  }

  eq(idx) {
    this.element = [this.element[idx]];
    return this;
  }

  addClass(...className) {
    const el = this.oneSelect();
    el.classList.add(...className);
    return this;
  }

  removeClass(...className) {
    this.element.forEach((el) => {
      el.classList.remove(...className);
    });
    return this;
  }

  hasClass(className) {
    const el = this.oneSelect.call(this);
    const baseClassName = this.compactSplit(el.className, ' ');
    return baseClassName.indexOf(className) !== -1;
  }

  attr(key, value=null) {
    if(value === null) return this.oneSelect().getAttribute(key);
    this.oneSelect().setAttribute(key, this.finishValue(value));
    return this;
  }

  style(key, value=null) {
    if(value === null) return this.oneSelect().style[key];
    this.element.forEach(el => el.style[key] = this.finishValue(value));
    return this;
  }

  styles(styleset) {
    if(typeof styleset !== 'object') return;
    this.element.forEach(el => {
      for(const key in styleset) {
        el.style[key] = this.finishValue(styleset[key]);
      }
    });
    return this;
  }

  next() {
    return new this.constructor(this.element.map(el => el.nextElementSibling).filter(Boolean));
  }

  prev() {
    return new this.constructor(this.element.map(el => el.previousElementSibling).filter(Boolean));
  }

  parent() {
    return new this.constructor(this.element.map(el => el.parentElement).filter(Boolean));
  }

  parents(selectParent) {
    const selectParentEl = this.arrayElement([], this.select(selectParent));
    let store = [];
    this.element.forEach(el => {
      store = this.concat(store, this.findInParent(selectParentEl, el));
    });
    return new this.constructor(store);
  }

  children(selectChild) {
    let store = [];
    this.element.forEach(el => {
      for(const child of el.children) {
        if(!selectChild) {
          store = this.concat(store, child);
        } else {
          const selectChildEl = this.arrayElement([], this.select(selectChild));
          if(selectChildEl.indexOf(child) !== -1) {
            store = this.concat(store, child);
          }
        }
      }
    });
    return new this.constructor(store);
  }

  event(eventName, callback, options) {
    this.element.forEach(el => {
      el.addEventListener(eventName, callback, options);
    });
    return this;
  }

  trigger(eventName=null) {
    if(eventName === null) return this;
    this.element.forEach(el => {
      if(typeof el[eventName] === 'function') el[eventName]();
    });
    return this;
  }

  html(htmlValue=null) {
    if(htmlValue === null) return this.oneSelect().innerHTML;
    this.element.forEach(el => {
      el.innerHTML = this.finishValue(htmlValue);
    });
    return this;
  }

  text(textValue=null) {
    if(textValue === null) return this.oneSelect().innerText;
    this.element.forEach(el => {
      el.innerText = this.finishValue(textValue);
    });
    return this;
  }

  removeAllChild() {
    const el = this.oneSelect();
    while(el.firstChild) {
      el.removeChild(el.firstChild);
    }
    return this;
  }

  append(element) {
    const el = this.oneSelect();
    el.appendChild(element);
  }

  forEach(callback) {
    this.element.forEach(el => {
      callback(new this.constructor([el]));
    });
    return this;
  }

}

export default (element) => {
  return new DomScript(element);
};