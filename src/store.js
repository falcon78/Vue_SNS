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

fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot((querySnapshot) => {
  const postArray = [];
  querySnapshot.forEach((doc) => {
    postArray.push({
      post: doc.data(),
      id: doc.id,
    });
  });
  store.commit('setPosts', postArray);
});

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    posts: [],
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
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
});

export default store;
