<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    // 监听路由变化，设置站点标题
    $route(to) {
      document.title = to.meta.title || 'Hello';
    }
  }
};
</script>
