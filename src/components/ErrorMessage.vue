<template>
  <transition name="fade">
    <div class="error-msg">
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
