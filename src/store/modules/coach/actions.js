export default {
  addCoach(context, data) {
    const id = context.rootGetters['userAuthMod/userId'];

    const coachData = {
      //id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate,
    };

    context.commit('addCoach', {
      ...coachData,
      id,
    });
  },
  deleteCoach(context, id) {
    context.commit('deleteCoach', id);
  },
  updateCoach(context, payload) {
    context.commit('updateCoach', payload);
  },
};
