export default {
  addMsg(state, payload) {
    state.msg.push(payload);
    console.log('mutations');
  },
  delMsg(state, id) {
    state.msg = state.msg.filter((msg) => msg.id !== id);
  },
};
