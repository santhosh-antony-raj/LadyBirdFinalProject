export default {
  addMsg(state, payload) {
    state.msg.push(payload);
  },
  delMsg(state, id) {
    state.msg = state.msg.filter((msg) => msg.id !== id);
  },
};
