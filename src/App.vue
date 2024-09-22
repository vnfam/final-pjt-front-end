<template>
  <div>
    <div class="w-[1100px] mx-auto height pb-20">
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

<style scoped>
.height {
  min-height: calc(100vh - 276px);
}
</style>
