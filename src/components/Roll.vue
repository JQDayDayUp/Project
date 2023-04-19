<template>
  <div class="scroll-wrapper" :class="{ open: this.isOpen }">
    <div class="scroll-content">
      <div class="scroll-text">
        <p>{{ content.title }}</p>
        <sub>{{ content.auth }}</sub>
        <span>{{ content.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/less/Roll.less';
export default {
  name: 'RollComponent',
  props: {
    content: {},
    isOpen: { type: Boolean, default: false }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
