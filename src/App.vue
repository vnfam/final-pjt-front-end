<template>
  <div class="w-[1100px] h-screen mx-auto">
    <header-compo></header-compo>
    <div class="mt-[85px]">
      <router-view></router-view>
    </div>
    <to-top-compo></to-top-compo>
  </div>
</template>

<script>
import HeaderCompo from './components/common/HeaderCompo.vue';
import ToTopCompo from './components/common/ToTopCompo.vue';
export default {
  name: 'App',
  components: {
    HeaderCompo,
    ToTopCompo,
  },
};
</script>

<style></style>
