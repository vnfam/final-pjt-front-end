<template>
  <div style="width: 1024px; height: 100vh; margin: 0 auto">
    <header-compo></header-compo>
    <div class="mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderCompo from './components/common/HeaderCompo.vue';
export default {
  name: 'App',
  components: {
    HeaderCompo,
  },
};
</script>

<style></style>
