<template>
  <div class="scroll-wrapper" :class="{ open: this.isOpen }">
    <div class="scroll-content">
      <div class="scroll-text">
        <p>{{ content.title }}</p>
        <sub>{{ content.auth }}</sub>
        <span>{{ content.text }}</span>
      </div>
    </div>
    <div class="videos-content" @click="handleopne">
      <img src="@/assets/images/ht.png" alt="视频讲解">
    </div>
    <a-modal v-model="visible" :title="content.title" width="800px" :footer="null" :destroyOnClose="true"  :after-close="handleCancel" >
      <video src="@/assets/videos/wuhuxian.mp4" ref="myVideo" :controls="true" ></video>
    </a-modal>
  </div>
</template>

<script>
import '@/assets/less/Roll.less';
export default {
  name: 'RollComponent',
  props: {
    content: {},
    isOpen: { type: Boolean, default: false },
    playMusic:{type: Boolean, default: true },
  },
  data() {
    return {
      visible:false
    };
  },
  methods: {
    handleopne(){
      this.visible =true;
      // this.clickMusic();
      this.$emit('videoIsOpen', false);
      setTimeout(() => {
          // 俩秒之后让模块消失
          // eslint-disable-next-line vue/no-mutating-props
          // this.playMusic=false;
          this.$refs.myVideo.play()
        }, 500);
    },
    handleCancel(){
      this.visible =false
      this.$emit('videoIsOpen', true);
      // this.$refs.myVideo.pause()
    }
  }
};
</script>
