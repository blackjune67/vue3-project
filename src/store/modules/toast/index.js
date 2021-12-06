export default {
  namespaced: true,
  state: {
    toasts: [],
    toastMessage: '',
    toastAlertType: '',
    showToast: false,
  },
  mutations: {
    UPDATE_TOAST_MESSAGE(state, payload) {
      state.toastMessage = payload;
    },
    UPDATE_TOAST_ALERT_TYPE(state, payload) {
      state.toastAlertType = payload;
    },
    UPDATE_TOAST_STATUS(state, payload) {
      state.showToast = payload;
    },
    ADD_TOAST(state, payload) {
      state.toasts.push(payload);
    },
    // REMOVE_TOAST(state, payload) {

    // },
  },
  actions: {
    triggerToast({ commit }, message, type = 'success') {
      // commit('UPDATE_TOAST_MESSAGE', message);
      // commit('UPDATE_TOAST_ALERT_TYPE', type);
      // commit('UPDATE_TOAST_STATUS', true);
      commit('ADD_TOAST', {
        message,
        type
      });

      setTimeout(() => {
        commit('UPDATE_TOAST_MESSAGE', '');
        commit('UPDATE_TOAST_ALERT_TYPE', '');
        commit('UPDATE_TOAST_STATUS', false);
      }, 10000);
    },
  },
  getters: {
    //vuex에서 사용하는 computed라고 생각하면 될 것 같다.
    toastMessageWithSmile(state) {
      return state.toastMessage + '^_^';
    },
  },
};
