function LocalStore (name) {
  this.name = name;
}
LocalStore.prototype.read = function () {
  var value = localStorage.getItem(this.name);

  return value ? JSON.parse(value) : null;
};
LocalStore.prototype.write = function (value) {
  localStorage.setItem(this.name, JSON.stringify(value));

  return value;
};
LocalStore.prototype.init = function (initial) {
  return this.read() || this.write(initial);
}

export function State (initial, options = {}) {
  this.localStorage = null;

  this.state = initial;
  this.listeners = [];

  if (options.localStorageKey) {
    this.localStorage = new LocalStore(options.localStorageKey);
    this.state = this.localStorage.init(initial);
  }
}
State.prototype.set = function (value) {
  if (value === this.state) {
    return;
  }

  for (var index = 0 ; index < this.listeners.length ; ++index) {
    this.listeners[index](value, this.state);
  }

  this.state = value;
  this.localStorage && this.localStorage.write(value);
};
State.prototype.assign = function (value) {
  this.set(Object.assign({}, this.state, value));
}
State.prototype.listen = function (callback) {
  if (callback instanceof Function) {
    this.listeners.push(callback);
    callback(this.state);
  }
};
State.prototype.unlisten = function (callback) {
  var index = this.listeners.indexOf(callback);

  if (index > -1) {
    this.listeners.splice(index, 1);
  }
}
