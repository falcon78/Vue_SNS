import Vuex from 'vuex';
import Vue from 'vue';
import * as fb from './firebaseConfig';

Vue.use(Vuex);

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('setCurrentUser', user);
    store.dispatch('fetchUserProfile');
  }
});

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    error: null,
  },
  actions: {
    fetchUserProfile({commit, state}) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then((res) => {
          commit('setUserProfile', res.data());
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout({commit}) {
      fb.auth
        .signOut()
        .catch((err) => {
          commit('error'.err.message);
        })
        .finally(() => {
          setTimeout(() => {
            commit('error', '');
          });
        });
      commit('setCurrentUser', null);
      commit('setUserProfile', {});
    },
    clearError({commit}) {
      commit('setErrorClear');
    },
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setErrorClear(state) {
      state.error = '';
    },
    setError(state, error) {
      state.error = error;
    },
  },
});

export default store;
