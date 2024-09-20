<template>
  <div class="container mx-auto p-6">
    <!-- Sidebar -->
    <div class="flex max-w-7xl">
      <div class="basis-1/4 bg-white shadow-md rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">마이페이지</h2>
        <ul class="text-gray-800">
          <!-- 기본정보 -->
          <li class="mb-2">
            <button
              @click="activeTab = 'info'"
              :class="{'bg-gray-200': activeTab === 'info'}"
              class="block p-2 rounded hover:bg-gray-200 w-full text-left"
            >
              기본정보
            </button>
          </li>
          <!-- 견적내역 -->
          <li class="mb-2">
            <button
              @click="toggleRequestList"
              class="block w-full text-left p-2 rounded hover:bg-gray-200"
            >
              견적내역
            </button>
            <!-- 보낸 요청, 받은 요청 토글 버튼 -->
            <div v-if="showRequestOptions" class="ml-4 mt-2">
              <button
                @click="activeTab = 'sent'"
                :class="{'bg-gray-200': activeTab === 'sent'}"
                class="block w-full text-left p-2 rounded hover:bg-gray-100"
              >
                견적 요청 목록
              </button>
            </div>
          </li>
          <li class="mb-2">
            <button
              @click="activeTab = 'reviewlist'"
              :class="{'bg-gray-200': activeTab === 'reviewlist'}"
              class="block p-2 rounded hover:bg-gray-200 w-full text-left"
            >
              후기내역
            </button>
          </li>
        </ul>
      </div>
      <!-- Main Content Area -->
      <div class="basis-3/4 bg-white shadow-2xl rounded-lg p-6 ml-4">
        <!-- 동적 컴포넌트 렌더링 -->
        <component :is="activeComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import UserSaveRequests from './UserSaveRequests.vue';
import UserReviewList from './review/UserReviewList.vue';
import UserBaseInfo from './UserBaseInfo.vue';

export default {
  data() {
    return {
      showRequestOptions: false, // 견적내역 클릭 시 보낸/받은 요청 버튼을 보여줄지 여부
      activeTab: 'info', // 기본값은 info 컴포넌트
    };
  },
  computed: {
    // activeTab에 따라 보여줄 컴포넌트 선택
    activeComponent() {
      switch (this.activeTab) {
        case 'info':
          return UserBaseInfo;
        case 'sent':
          return UserSaveRequests;
        case 'reviewlist':
          return UserReviewList;
        default:
          return UserBaseInfo;
      }
    },
  },
  methods: {
    toggleRequestList() {
      this.showRequestOptions = !this.showRequestOptions; // 견적내역 버튼 클릭 시 토글
    },
  },
};
</script>

<style scoped></style>
