<template>
  <div class="p-4 max-w-screen-lg mx-auto">
    <!-- 제목 -->
    <div class="mb-6">
      <h3 class="font-bold text-2xl text-gray-800">보낸 요청 내역</h3>
    </div>

    <!-- 보낸 요청이 있을 경우 목록을 보여주고, 없을 경우 메시지를 보여줌 -->
    <div v-if="sentRequests.length > 0">
      <ul class="space-y-6">
        <li
          v-for="(request, index) in sentRequests"
          :key="index"
          class="bg-white p-6 border border-gray-200 rounded-lg shadow flex flex-col justify-between"
        >
          <!-- 상단 정보 섹션 -->
          <div class="grid grid-cols-2 gap-x-6">
            <p class="text-base text-gray-700 mb-2"><strong>요청자</strong></p>
            <p class="text-base text-gray-800 mb-2">{{ request.memberResponse.nickName }}</p>

            <!-- <p class="text-base text-gray-700 mb-2"><strong>요청 날짜</strong></p>
            <p class="text-base text-gray-800 mb-2">{{ formatDate(request.regDate) }}</p> -->

            <p class="text-base text-gray-700 mb-2"><strong>건물 유형</strong></p>
            <p class="text-base text-gray-800 mb-2">{{ request.estimateResponse.buildingType }}</p>

            <p class="text-base text-gray-700 mb-2"><strong>평수</strong></p>
            <p class="text-base text-gray-800 mb-2">{{ request.estimateResponse.floor }} 평</p>
          </div>

          <!-- 예산, 일정 정보 섹션 -->
          <div class="grid grid-cols-2 gap-x-6 mb-1">
            <p class="text-base text-gray-700 mb-2"><strong>예산</strong></p>
            <p class="text-base text-gray-800 mb-2">{{ request.estimateResponse.budget }}만원</p>

            <p class="text-base text-gray-700 mb-2"><strong>예상 일정</strong></p>
            <p class="text-base text-gray-800 mb-2">{{ request.estimateResponse.schedule }}</p>

            <p class="text-base text-gray-700 mb-2"><strong>주소</strong></p>
            <p class="text-base text-gray-800 mb-2">{{ request.estimateResponse.address }}</p>
          </div>

          <!-- 공사 가격 정보 섹션 -->
          <div v-if="request.constructionPrices">
            <p class="font-semibold text-gray-800 mb-2 text-base">공사 가격</p>
            <ul class="flex flex-wrap gap-2">
              <li v-for="(price, type) in request.constructionPrices" :key="type">
                <span class="font-medium bg-gray-100 text-gray-700 rounded-full text-sm px-3 py-1"
                  >{{ type }}: {{ price }}만원</span
                >
              </li>
            </ul>
          </div>

          <!-- 총 가격 정보 -->
          <p class="font-medium text-gray-700 mt-4 text-right">
            총 가격: <span class="font-semibold">{{ request.totalPrice }}만원 </span>
          </p>

          <!-- 버튼 섹션 -->
          <div class="mt-4">
            <div v-if="request.estimateStatus === 'SENT'" class="flex w-full">
              <button
                class="w-full mr-4 bg-gray-300 text-gray-800 rounded-lg py-2 px-4 font-medium"
                @click="deleteEstimate(request)"
              >
                취소
              </button>
              <button
                class="w-full bg-midGreen text-white rounded-lg py-2 px-4 font-medium"
                @click="openUpdateModal(request)"
              >
                수정
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 보낸 요청이 없을 경우 보여줄 메시지 -->
    <div v-else class="text-center text-gray-500">
      <p class="text-lg font-semibold">보낸 견적 요청이 없습니다.</p>
    </div>
  </div>

  <!-- 수정 모달 -->
  <div v-if="showUpdateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-[400px] shadow-lg">
      <h2 class="text-lg font-semibold mb-4">견적 수정하기</h2>

      <!-- 각 시공 타입별 입력 필드 -->
      <div v-for="(constructionType, index) in selectedEstimate.constructionTypes" :key="index" class="mb-4">
        <label :for="'constructionType-' + index" class="block mb-1 font-medium">{{ constructionType }}</label>
        <input
          type="text"
          :id="'constructionType-' + index"
          v-model="constructionTypeInputs[index]"
          class="w-full border border-gray-300 p-2 rounded"
          placeholder="해당 시공 타입의 금액을 입력하세요"
        />
      </div>
      <div class="text-right">
        <p class="font-semibold">예상 금액: {{ selectedEstimate.totalPrice }}만원</p>
      </div>

      <!-- 모달 액션 -->
      <div class="mt-4 flex justify-end">
        <button class="bg-gray-300 text-black rounded-lg py-2 px-4 mr-2" @click="closeModal">취소</button>
        <button class="bg-midGreen text-white rounded-lg py-2 px-4" @click="submitUpdateEstimate()">수정하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import authInstance from '@/utils/axiosUtils';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const sentRequests = ref([]);
    const status = '';

    const fetchRequests = async () => {
      try {
        const response = await authInstance.get('/api/estimaterequests/sent');
        sentRequests.value = response.data;
        console.log(sentRequests);
      } catch (error) {
        console.error('Failed to fetch sent requests', error);
      }
    };

    onMounted(() => {
      fetchRequests();
    });

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}년 ${month}월 ${day}일`;
    };

    return {
      sentRequests,
      formatDate,
      status,
    };
  },
  methods: {
    // 요청이 온 견적을 삭제(거절) 하기
    async deleteEstimate(estimate) {
      const isConfirm = confirm('정말로 삭제하시겠습니까?');
      if (!isConfirm) {
        return;
      }
      try {
        await authInstance.delete(`/api/estimates/${estimate.estimateId}`);
        window.location.reload();
      } catch (error) {
        console.log('견적 삭제를 실패했습니다.', error);
      }
    },
  },
};
</script>

<style scoped></style>
