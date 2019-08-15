<template>
  <transition name="fade">
    <div class="loading">
      <p>{{message}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading-message',
  props: {
    message: String,
  },
};
</script>
