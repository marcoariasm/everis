export default class Persistence {

    constructor() { }

    static addValue(key, value) {
      const newValue = JSON.stringify(value);
      localStorage.setItem(key, newValue);
    }
  
    static getValue(key) {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    }
  
    static removeValue(key) {
      localStorage.removeItem(key);
    }
  
    static clear() {
      localStorage.clear();
    }
  
  }
  