<template>
  <div id="login">
    <loading-message v-if="loading" :message="'loading'"></loading-message>
    <section>
      <div class="col1 text-center">
        <h1>Vue SNS</h1>
        <p>Welcome to Vue SNS.</p>
      </div>
      <div class="col2">
        <form action="">
          <div class="testEmail">
            <p>Test email : email@email.com</p>
            <p>Test Password : password</p>
          </div>
          <label for="email">Email</label>
          <input
            v-model.trim="loginForm.email"
            type="text"
            id="email"
            placeholder="email@email.com"
          />
          <label for="password">Password</label>
          <input
            v-model.trim="loginForm.password"
            type="password"
            id="password"
            placeholder="password"
          />
          <button @click.prevent="onSubmit" type="submit" class="button">
            Submit
          </button>
          <error-message
            v-if="errorMessage"
            :message="errorMessage"
          ></error-message>
          <div class="extras" style="margin: 10px;">
            <router-link to="/signup">
              Create an Account
            </router-link>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import * as fb from '../firebaseConfig';
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';
export default {
  components: {LoadingMessage, ErrorMessage},
  data() {
    return {
      loginForm: {
        email: null,
        password: null,
      },
      loading: false,
      errorMessage: false,
    };
  },
  methods: {
    onSubmit() {
      if (!this.loginForm.email || !this.loginForm.password) return;
      this.loading = true;
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then((user) => {
          this.$store.commit('setCurrentUser', user.user);
          this.$store.dispatch('fetchUserProfile');
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.errorMessage = err.message;
        });
    },
  },
};
</script>
