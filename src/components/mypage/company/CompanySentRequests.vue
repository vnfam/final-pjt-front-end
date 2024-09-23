<template>
  <div>
    <h3 class="font-medium text-[18px] mb-4">보낸 요청 목록</h3>

    <!-- 로딩 상태 표시 -->
    <div v-if="isLoading" class="mb-4">로딩 중...</div>

    <!-- 에러 메시지 표시 -->
    <div v-if="error" class="mb-4 text-red-500">
      {{ error }}
    </div>

    <!-- 보낸 요청 목록 -->
    <ul v-if="!isLoading && !error" class="list-none p-0">
      <li
        v-for="(request, index) in sentRequests"
        :key="request.estimateId"
        class="border border-gray-300 p-4 mb-2 rounded-lg"
      >
        <div class="flex justify-between items-center">
          <div>
            <span>{{ '견적 ' + (index + 1) }}</span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-500">
              {{ '요청 날짜: ' + formatDate(request.requestDate) }}
            </span>
            <button @click="toggle(index)">
              <span v-if="isOpen[index]">▲</span>
              <span v-else>▼</span>
            </button>
          </div>
        </div>

        <!-- 상세 정보 토글 -->
        <div v-if="isOpen[index]" class="bg-gray-100 mt-2 p-4 shadow rounded">
          <div class="border border-gray-300 rounded-lg pb-4 px-4 bg-white">
            <!-- 견적 상세 정보 표시 -->
            <p><strong>견적 ID:</strong> {{ request.estimateId }}</p>
            <p><strong>건물 유형:</strong> {{ request.buildingTypeName }}</p>
            <p><strong>시공 유형:</strong> {{ request.constructionTypes.join(', ') }}</p>
            <p><strong>예산:</strong> {{ request.budget }}</p>
            <p><strong>일정:</strong> {{ request.schedule }}</p>
            <p><strong>주소:</strong> {{ request.fullAddress }}</p>
            <p><strong>층수:</strong> {{ request.floor }}</p>
            <p><strong>상태:</strong> {{ request.status }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import authInstance from '@/utils/axiosUtils';

// Reactive variables
const sentRequests = ref([]);
const isLoading = ref(false);
const error = ref(null);
const isOpen = ref([]);

// 날짜 형식 변환 함수
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

// 보낸 요청 목록을 백엔드 API에서 가져오는 함수
const fetchSentRequests = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await authInstance.get('/api/estimaterequests/sent');
    sentRequests.value = response.data;
    isOpen.value = sentRequests.value.map(() => false); // 토글 상태 초기화
    console.log('보낸 요청 목록:', sentRequests.value);
  } catch (err) {
    console.error('보낸 요청 리스트를 가져오는데 실패했습니다.', err);
    error.value = '보낸 요청 목록을 불러오는데 실패했습니다. 다시 시도해주세요.';
  } finally {
    isLoading.value = false;
  }
};

// 토글 기능: 각 견적의 상세 정보를 표시하거나 숨김
const toggle = (index) => {
  isOpen.value[index] = !isOpen.value[index];
};

// 컴포넌트가 마운트되었을 때 데이터 가져오기
onMounted(() => {
  fetchSentRequests();
});
</script>

<style scoped>
/* 필요에 따라 스타일 추가 */
</style>
