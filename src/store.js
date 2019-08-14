import Vuex from 'vuex';
import Vue from 'vue';
import * as fb from './firebaseConfig';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
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
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
  },
});

export default store;
