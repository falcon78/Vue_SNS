<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ username }}</h5>
          <div class="create-post">
            <p>create a post</p>
            <form @submit.prevent>
              <textarea v-model="post.content"></textarea>
              <button
                class="button"
                @click="createPost"
                :disabled="post.content === ''"
              >
                post
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as fb from '../firebaseConfig';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      username: this.$store.state.userProfile.name,
      post: {
        content: '',
      },
    };
  },
  computed: {
    ...mapState(['userProfile', 'currentUser']),
  },

  methods: {
    createPost() {
      fb.postsCollection
        .add({
          createdOn: new Date(),
          content: this.post.content,
          userId: this.currentUser.uid,
          userName: this.userProfile.name,
          comments: 0,
          likes: 0,
        })
        .then(() => {
          this.post.content = '';
        })
        .catch((err) => {
          this.$store.commit('setError', err);
        });
    },
  },
};
</script>
