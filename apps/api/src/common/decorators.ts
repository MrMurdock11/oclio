export function Set(target: any, key: string) {
  const setter = function (newVal: any) {
    if (this['_' + key] !== newVal) {
      this['_' + key] = newVal;
    }
  };

  const getter = target[key].get;
  if (delete target[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }
}

export function Get(target: any, key: string) {
  const getter = function () {
    return this['_' + key];
  };

  const setter = target[key].set;
  if (delete target[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }
}
