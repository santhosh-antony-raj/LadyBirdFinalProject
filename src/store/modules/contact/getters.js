export default {
  getMsg(state, getters, rootState, rootGetters) {
    console.log('rootgetters', rootGetters);
    /*  const msg = state.msg;
        console.log(msg);
        return msg; */
    const coachId = rootGetters['userAuthMod/userId'];
    return state.msg.filter((msg) => msg.coachId === coachId);
  },
  lastMsg(state) {
    return state.msg[state.msg.length - 1]; // return last added msg
  },
};
