<template>
  <div class="HomePage">
    <canvas ref="canvas"></canvas>
    <img src="@/assets/images/bg.jpg" class="bg" />
    <audio src='@/assets/audios/bgm.mp3' ref="audio" loop="true" />
    <div class="HomePage-main">
      <Roll
        :content="item.data"
        :isOpen="item.active"
        :playMusic="shoes"
        v-for="(item, idx) in list"
        :key="idx"
        @videoIsOpen="videoIsOpenFun"
      ></Roll>
      <span class="music" @click="handleClickMusic()">
        <img src="@/assets/images/music.png" alt="">
      </span>
      <div class="map">
        <ul>
          <li
            v-for="(item, idx) in list"
            :key="idx"
            @click="clickPoint(item)"
            :class="
              item.active
                ? item.map + ' ' + item.map + '-' + (idx + 1) + ' ' + 'active'
                : item.map + ' ' + item.map + '-' + (idx + 1)
            "
          ></li>
        </ul>
        <img src="@/assets/images/mp_wh.png" />
      </div>
    </div>
  </div>
</template>

<script>
import Roll from '@/components/Roll.vue';
import '@/assets/less/Home.less';
export default {
  name: 'HomePage',
  components: {
    Roll
  },
  data() {
    return {
      clickS: 0, //点击次数
      shoes: false,//是否播放
      list: [
        {
          data: {
            title: '望天门山',
            auth: '唐·李白',
            text: '天门中断楚江开，碧水东流至此回。两岸青山相对出，孤帆一片日边来。'
          },
          map: 'wh',
          active: false
        },
        {
          data: {
            title: '蝶恋花.怀于湖',
            auth: '宋·张孝祥',
            text: '恰则杏花红一树。捻指来时，结子青无数。漠漠春阴缠柳絮。一天风雨将春去。春到家山须小住。芍药樱桃，更是寻芳处。绕院碧莲三百亩。留春伴我春应许。'
          },
          map: 'wh',
          active: false
        }
      ],
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,
      ctx: null,
      snowflakes: [],
      numSnowflakes: 50,
      windDirection: 1,
      lastExecutedTime: 0, // 记录上一次执行的时间戳
      throttleDelay: 100 // 节流阈值，单位为毫秒
    };
  },
  mounted() {
    this.init();
    window.addEventListener('resize', this.handleResize);
  },
  updated() {
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  created() {},
  methods: {
    init() {
      const canvas = this.$refs.canvas;
      this.ctx = canvas.getContext('2d');
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;

      // 清空雪花数组
      this.snowflakes = [];

      // 初始化雪花
      for (let i = 0; i < this.numSnowflakes; i++) {
        this.snowflakes.push({
          x: Math.random() * this.canvasWidth,
          y: Math.random() * this.canvasHeight,
          r: Math.random() * 6 + 1,
          d: 10
        });
      }

      // 绘制雪花
      this.drawSnow();
    },

    drawSnow() {
      const { ctx, snowflakes, windDirection } = this;
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();

      for (let i = 0; i < this.numSnowflakes; i++) {
        const { x, y, r } = snowflakes[i];
        ctx.moveTo(x, y);
        ctx.arc(x, y, r, 0, Math.PI * 2, true);

        // 雪花下落
        snowflakes[i].y += Math.pow(snowflakes[i].d, 1 / 2) + 1;
        snowflakes[i].x += Math.sin((windDirection * snowflakes[i].y) / 100);

        // 雪花到达底部后重新回到顶部
        if (snowflakes[i].y > this.canvasHeight) {
          snowflakes[i].y = -10;
          snowflakes[i].x = Math.random() * this.canvasWidth;
        }
      }

      ctx.fill();
      requestAnimationFrame(this.drawSnow);
    },
    handleResize() {
      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight;
      this.$refs.canvas.width = this.canvasWidth;
      this.$refs.canvas.height = this.canvasHeight;
    },
    
    handleClickMusic() {
      console.log(2111);
      if (this.shoes == false) {
        this.shoes = true;
        this.$refs.audio.play()
      } else if (this.shoes == true) {
        this.shoes = false;
        this.$refs.audio.pause()
      }
    },
    videoIsOpenFun(params){
      console.log(params)
      params? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    clickPoint(item) {
      this.clickS = this.clickS + 1;
      if (item.active) {
        item.active = false;
      } else {
        this.list.map((item) => {
          item.active = false;
        });
        setTimeout(() => {
          // 俩秒之后让模块消失
          item.active = true;
        }, 500);
      }

      this.clickS === 1 ? this.$refs.audio.play() : '';
    }
  }
};
</script>
