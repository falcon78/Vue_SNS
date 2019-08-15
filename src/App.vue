<template>
  <div id="app">
    <navigation v-if="currentUser"></navigation>
    <div @click="clearError" v-if="error">
      <loading-message
        :message="`An error occurred : ${error}`"
      ></loading-message>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import LoadingMessage from './components/LoadingMessage';
import Navigation from './components/Navigation';
import {mapState} from 'vuex';
export default {
  components: {LoadingMessage, Navigation},
  computed: mapState(['error', 'currentUser']),
  methods: {
    clearError() {
      this.$store.commit('setErrorClear');
    },
  },
};
</script>
