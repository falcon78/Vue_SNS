<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
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
        <div v-if="posts.length">
          <div v-for="post in posts" class="post">
            <h5>{{ post.userName }}</h5>
            <span> {{ post.createdOn | formatDate }}</span>
            <p>{{ post.content | trimLength }}</p>
            <ul>
              <li>
                <a> comments {{ post.comments }}</a>
              </li>
              <li>
                <a> likes {{ post.likes }}</a>
              </li>
              <li>
                <a>view full post</a>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as fb from '../firebaseConfig';
import {mapState} from 'vuex';
import moment from 'moment';
export default {
  data() {
    return {
      post: {
        content: '',
      },
    };
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'posts']),
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
  filters: {
    formatDate(val) {
      if (!val) {
        return '-';
      }
      const date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
  },
};
</script>
