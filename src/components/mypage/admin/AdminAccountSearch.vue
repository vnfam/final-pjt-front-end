<template>
  <div class="w-full text-center" @click="showSearchMenu">검색 창 열기</div>

  <div v-show="isSearchVisible" class="w-full search-menu p-4 bg-white shadow-md rounded-lg">
    <!-- 검색 텍스트와 검색 필드를 토글하는 부분 -->

    <!-- 검색 필드 -->
    <div key="search-fields">
      <!-- 이름 검색 -->
      <div class="search-field mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">이름</label>
        <input
          type="text"
          v-model="filters.name"
          placeholder="이름 입력"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- 이메일 검색 -->
      <div class="search-field mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
        <input
          type="email"
          v-model="filters.email"
          placeholder="이메일 입력"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- 회원 상태 검색 -->
      <div class="search-field mb-4">
        <label for="verified" class="block text-sm font-medium text-gray-700 mb-1">회원 상태</label>
        <select
          v-model="filters.verified"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">전체</option>
          <option value="true">활성화</option>
          <option value="false">비활성화</option>
        </select>
      </div>

      <div class="search-field mb-4">
        <label for="accountType" class="block text-sm font-medium text-gray-700 mb-1">회원 유형</label>
        <select
          v-model="filters.accountType"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">전체</option>
          <option value="MEMBER">사용자</option>
          <option value="COMPANY">파트너</option>
        </select>
      </div>

      <!-- 가입일 검색 -->
      <div class="search-field mb-4">
        <label for="signupDate" class="block text-sm font-medium text-gray-700 mb-1">가입일</label>
        <input
          type="date"
          v-model="filters.signupDate"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- 검색 버튼 -->
      <button
        @click="onSearch"
        class="w-full bg-blue-500 p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
      >
        검색
      </button>
    </div>
  </div>
</template>

<script>
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
      isSearchVisible: false, // 검색 필드의 가시성을 관리
    };
  },
  methods: {
    showSearchMenu() {
      this.isSearchVisible = !this.isSearchVisible;
    },

    onSearch() {
      // 검색 기능을 수행하는 메서드
      // `filters` 객체에 저장된 값을 사용하여 검색 요청을 수행
      console.log('검색 필터:', this.filters);
      this.$emit('search-event', this.filters);
      // 실제로는 검색 결과를 얻기 위해 API 호출이나 다른 로직을 수행합니다.
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 이전 버전에서는 fade-leave-active 대신 사용 */ {
  opacity: 0;
}
</style>
