<template>
  <div class="border-8 p-5 text-2xl flex flex-col items-center">
    <AdminAccountSearch></AdminAccountSearch>
  </div>

  <div v-for="i in pageSize" :key="i" class="border-8 p-5 text-2xl">{{ `회원 관리 ${(this.page - 1) * 10 + i}` }}</div>
  <div class="flex justify-center">
    <v-pagination
      v-model="page"
      :pages="pageSize"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="updateHandler"
    />
  </div>
</template>

<script>
import VPagination from '@hennge/vue3-pagination';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';
import AdminAccountSearch from './AdminAccountSearch.vue';

export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      isSearchVisible: false, // 검색 컴포넌트의 가시성을 관리하는 상태
    };
  },
  components: {
    VPagination,
    AdminAccountSearch,
  },
  methods: {
    updateHandler(currentPage) {
      console.log(this.page);
      console.log('updateHandler 호출 : ' + currentPage);
    },
    toggleSearch() {
      // 검색 컴포넌트의 가시성을 토글하는 메서드
      this.isSearchVisible = !this.isSearchVisible;
    },
  },
};
</script>

<style></style>
