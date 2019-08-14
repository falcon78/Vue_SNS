<template>
  <div id="login">
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
            type="text"
            id="password"
            placeholder="password"
          />
          <button @click.prevent="onSubmit" type="submit" class="button">
            Submit
          </button>
          <div class="extras" style="margin: 10px;">
            <a href="#">Forgot Password</a>
            <a href="#">Create an Account</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import * as fb from '../firebaseConfig';
export default {
  data() {
    return {
      loginForm: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit() {
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then((user) => {
          this.$store.commit('setCurrentUser', user);
          this.$store.dispatch('fetchUserProfile');
          this.$router.push('/');
        })
        .error((err) => {
          console.log(err);
        });
    },
  },
};
</script>
