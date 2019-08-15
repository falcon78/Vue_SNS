<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="dashboard">Home</router-link>
        <ul class="inline">
          <li><router-link to="dashboard">Dashboard</router-link></li>
          <li><router-link to="settings">Settings</router-link></li>
          <li><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
import {mapState} from 'vuex';
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
  computed: mapState(['currentUser']),
};
</script>
