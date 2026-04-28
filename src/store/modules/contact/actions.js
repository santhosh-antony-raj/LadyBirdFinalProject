export default {
  addMsg(context, payload) {
    const msg = {
      id: new Date().toISOString(),
      email: payload.email,
      msg: payload.msg,
      coachId: payload.coachId,
    };

    context.commit('addMsg', msg);
  },
  delMsg(context, id) {
    context.commit('delMsg', id);
  },
};
