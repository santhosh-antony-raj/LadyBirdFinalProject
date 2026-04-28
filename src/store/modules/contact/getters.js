export default {
  getMsg(state, getters, rootState, rootGetters) {
    const coachId = rootGetters['userAuthMod/userId'];
    return state.msg.filter((msg) => msg.coachId === coachId);
  },
  lastMsg(state) {
    return state.msg[state.msg.length - 1]; // return last added msg
  },
};
