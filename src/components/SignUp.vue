<template>
  <div id="login">
    <loading-message v-if="loading" :message="'loading'"></loading-message>
    <section>
      <div class="col1 text-center">
        <h1>Vue SNS</h1>
        <p>Welcome to Vue SNS.</p>
      </div>
      <div class="col2">
        <form @submit.prevent>
          <label for="name">Name</label>
          <input placeholder="name" type="text" id="name" v-model="name" />
          <label for="email">Email</label>
          <input
            v-model.trim="email"
            type="text"
            id="email"
            placeholder="email@email.com"
          />
          <label for="password1">Password</label>
          <input
            v-model.trim="password.pass1"
            type="password"
            id="password1"
            placeholder="password"
          />
          <label for="password2">Password</label>
          <input
            v-model.trim="password.pass2"
            type="password"
            id="password2"
            placeholder="password"
          />
          <p v-if="!isValidPass">パスワードが一致しません。</p>
          <button @click.prevent="onSubmit" type="submit" class="button">
            Submit
          </button>

          <error-message v-if="errorMessage" :message="errorMessage" />
          <div class="extras" style="margin: 10px;">
            <router-link to="/login">
              Login
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
      email: null,
      name: null,
      username: null,
      password: {
        pass1: null,
        pass2: null,
      },
      error: '',
      loading: false,
      errorMessage: '',
    };
  },
  computed: {
    isValidPass() {
      return this.password.pass1 === this.password.pass2;
    },
  },
  methods: {
    onSubmit() {
      if (!this.isValidPass) return;
      if (!this.name && !this.email) return;
      this.loading = true;
      fb.auth
        .createUserWithEmailAndPassword(this.email, this.password.pass1)
        .then((user) => {
          this.$store.commit('setCurrentUser', user.user);

          return fb.usersCollection.doc(user.user.uid).set({
            name: this.name,
          });
        })
        .then(() => {
          this.$store.dispatch('fetchUserProfile');
          this.router.push('/dashboard');
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.errorMessage = err.message;
          this.loading = false;
        });
    },
  },
};
</script>
