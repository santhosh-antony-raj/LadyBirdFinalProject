export default {
  addCoach(state, payload) {
    state.coaches.unshift(payload);
    console.log('mutation payload pushed', payload);
  },
  deleteCoach(state, id) {
    state.coaches = state.coaches.filter((coach) => coach.id !== id);
  },
  updateCoach(state, payload) {
    const index = state.coaches.findIndex((c) => c.id === payload.id);
    console.log(index);
    console.log(payload);

    if (index !== -1) {
      state.coaches.splice(index, 1, payload);
    }
  },
};
