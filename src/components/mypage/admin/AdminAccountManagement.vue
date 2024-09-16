<template>
  <div class="border-8 p-5 text-2xl flex flex-col items-center">
    <AdminAccountSearch @search-event="selectCondition"></AdminAccountSearch>
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
import authInstance from '@/utils/axiosUtils';

export default {
  data() {
    return {
      filters: {
        name: '',
        email: '',
        verified: '',
        signupDate: '',
        accountType: '',
      },

      accounts: [],
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
    async updateHandler() {
      console.log(this.page);
      const accounts = await authInstance.get(`/api/admin/accounts`, {
        params: {
          page: this.page,
          size: this.pageSize,
          name: this.filters.name,
          email: this.filters.email,
          verified: this.filters.verified,
          signupDate: this.filters.signupDate,
          accountType: this.filters.accountType,
        },
      });
      console.log(accounts.data.data);
    },

    selectCondition(filters) {
      this.filters.name = filters.name;
      this.filters.email = filters.email;
      this.filters.verified = filters.verified;
      this.filters.signupDate = filters.signupDate;
      this.filters.accountType = filters.accountType;
      this.updateHandler();
    },

    toggleSearch() {
      // 검색 컴포넌트의 가시성을 토글하는 메서드
      this.isSearchVisible = !this.isSearchVisible;
    },
  },
};
</script>

<style></style>
