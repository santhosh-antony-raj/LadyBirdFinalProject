let timer;
export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-qP_yxVMNYqa4_OV1qZkcq0ga9qgVS7g';
    if (payload.mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-qP_yxVMNYqa4_OV1qZkcq0ga9qgVS7g';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.message || 'signup failed');
      throw error;
    }
    console.log(responseData);
    //expire set
    const expiresIn = +responseData.expiresIn * 1000;
    //const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;
    //  const date3 = new Date().getTime(); returns converted today date and current time in millisec . so if expire greater logout
    console.log(expiresIn);
    console.log(expirationDate);

    //local storage
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('email', responseData.email);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);
    //setTimeOut
    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      email: responseData.email,
      //tokenExpiration:responseData.expiresIn,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId && email) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        email: email,
        // tokenExpiration: null,
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('email');
    clearTimeout(timer);
    context.commit('setUser', {
      token: null,
      userId: null,
      //  tokenExpiration:null
    });
  },
  //finally auto logout
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('didAutoLogout');
  },
};
