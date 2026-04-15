export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  authenticate(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.autoLogoutValue;
  },
  userEmail(state) {
    console.log(state.email);

    return state.email;
  },
};
