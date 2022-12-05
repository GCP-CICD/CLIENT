class _cache {
  setItem(key: string, value: any, type = "local") {
    //瀏覽器關閉 session消失

    value && (window as { [key: string]: any })[`${type}Storage`].setItem(key, JSON.stringify(value));
  }
  getItem(key: string, type = "local") {
    // obj => string => obj
    const value = (window as { [key: string]: any })[`${type}Storage`].getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteItem(key: string, type = "local") {
    (window as { [key: string]: any })[`${type}Storage`].removeItem(key);
  }

  clear() {
    // window.localStorage.clear();
    window.sessionStorage.clear();
  }

  logout() {
    window.sessionStorage.clear();
  }
}

export default new _cache();
