<template>
  <div class="h-screen">
    <div class="w-[1100px] mx-auto">
      <header-compo></header-compo>
      <div class="mt-[85px]">
        <router-view></router-view>
      </div>
      <to-top-compo></to-top-compo>
    </div>

    <footer-compo></footer-compo>
  </div>
</template>

<script>
import FooterCompo from './components/common/FooterCompo.vue';
import HeaderCompo from './components/common/HeaderCompo.vue';
import ToTopCompo from './components/common/ToTopCompo.vue';
export default {
  name: 'App',
  components: {
    HeaderCompo,
    ToTopCompo,
    FooterCompo,
  },
};
</script>

<style></style>
