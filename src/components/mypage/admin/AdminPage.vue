<template>
  <div class="max-w-6xl flex">
    <div class="basis-1/4">
      <AdminSideBar></AdminSideBar>
    </div>
    <div class="basis-3/4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminSideBar from './AdminSideBar.vue';
export default {
  components: { AdminSideBar },
};
</script>

<style></style>
