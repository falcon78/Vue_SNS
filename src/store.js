import Vuex from 'vuex';
import Vue from 'vue';
import * as fb from './firebaseConfig';

Vue.use(Vuex);

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('setCurrentUser', user);
    store.dispatch('fetchUserProfile');
  }

  fb.usersCollection.doc(user.uid).onSnapshot((doc) => {
    store.commit('setUserProfile', doc.data());
  });
});

fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot((querySnapshot) => {
  let createdByCurrentUser;
  if (querySnapshot.docs.length) {
    createdByCurrentUser =
      store.state.currentUser.uid ===
      querySnapshot.docChanges()[0].doc.data().userId;
  }

  if (
    querySnapshot.docChanges().length !== querySnapshot.docs.length &&
    querySnapshot.docChanges()[0].type === 'added' &&
    !createdByCurrentUser
  ) {
    const post = querySnapshot.docChanges()[0].doc.data();
    post.id = querySnapshot.docChanges()[0].doc.id;
    store.commit('setHiddenPosts', post);
  } else {
    const postsArray = [];

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      post.id = doc.id;
      postsArray.push(post);
    });

    store.commit('setPosts', postsArray);
  }
});

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    posts: [],
    hiddenPosts: [],
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
    clearData({commit}) {
      commit('setCurrentUser', null);
      commit('setUserProfile', null);
      commit('setPosts', null);
    },
    updateProfile({commit, state}, data) {
      const name = data.name;
      fb.usersCollection
        .doc(state.currentUser.id)
        .update({name: name})
        .then((user) => {
          console.log(state.currentUser.uid);
          fb.postsCollection
            .where('userId', '==', state.currentUser.uid)
            .get()
            .then((docs) => {
              docs.forEach((doc) => {
                fb.postsCollection.doc(doc.id).update({
                  userName: name,
                });
              });
            });
        })
        .catch((err) => {
          console.log('error');
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
    setErrorClear(state) {
      state.error = '';
    },
    setError(state, error) {
      state.error = error;
    },
    setPosts(state, posts) {
      if (posts) {
        state.posts = posts;
      } else {
        state.posts = [];
      }
    },
    setHiddenPosts(state, post) {
      if (post) {
        if (!state.hiddenPosts.some((x) => x.id === post.id)) {
          state.hiddenPosts.unshift(post);
        }
      } else {
        state.hiddenPosts = [];
      }
    },
  },
});

export default store;
