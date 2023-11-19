declare module 'mbr-state' {
  interface Options {
    localStorageKey?: string;
  }

  class LocalStore<T> {
    constructor(name: string);

    name: string;

    read(): T;
    write(value: T): T;
    init(value: T): T;
  }

  class State<T> {
    constructor(initial: T, options?: Options);

    state: T;
    localStorage: null | LocalStore<T>;
    listeners: Array<(value: T) => T>;

    set(value: T): void;
    assign(value: Partial<T>): void;
    listen(listener: (value: T) => void);
    unlisten(listener: (value: T) => void);
  }
}
