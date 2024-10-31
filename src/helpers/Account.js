class Account {
  static set(data) {
    localStorage.setItem('account', JSON.stringify(data));
  }

  static setToken(token, remember) {
    if (remember) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  static get() {
    try {
      const account = localStorage.getItem('account') || sessionStorage.getItem('account');
      return JSON.parse(account) || {};
    } catch (e) {
      return {};
    }
  }

  static add(data) {
    this.set({ ...this.get(), ...data });
  }

  static getToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  }

  static setScopes(scopes) {
    localStorage.setItem('scopes', JSON.stringify(scopes));
  }

  static getScopes() {
    const scopes = localStorage.getItem('scopes');
    return JSON.parse(scopes) || [];
  }

  static delete() {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    localStorage.removeItem('scopes');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('account');
  }
}

export default Account;
