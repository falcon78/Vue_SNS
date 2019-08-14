<template>
  <div id="login">
    <section>
      <div class="col1 text-center">
        <h1>Vue SNS</h1>
        <p>Welcome to Vue SNS.</p>
      </div>
      <div class="col2">
        <form @submit.prevent>
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
            type="text"
            id="password1"
            placeholder="password"
          />
          <label for="password2">Password</label>
          <input
            v-model.trim="password.pass2"
            type="text"
            id="password2"
            placeholder="password"
          />
          <button @click.prevent="onSubmit" type="submit" class="button">
            Submit
          </button>
          <div class="extras" style="margin: 10px;">
            <router-link to="/forgot">
              Forgot Password
            </router-link>
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
export default {
  data() {
    return {
      email: null,
      username: null,
      password: {
        pass1: null,
        pass2: null,
      },
    };
  },
  computed: {
    isValidPass() {
      return this.pass1 === this.pass2 && this.pass1.length > 5;
    },
  },
};
</script>