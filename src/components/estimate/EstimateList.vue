<template>
  <div>
    <!-- 제목 -->
    <div class="p-4 flex items-center justify-start">
      <h3 class="font-semibold text-xl text-gray-800">견적 요청 목록</h3>
    </div>

    <!-- 견적 요청 목록 -->
    <div class="p-4">
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <li
          v-for="(estimate, index) in estimates"
          :key="index"
          class="p-6 border border-gray-200 rounded-lg transition hover:shadow-sm"
        >
          <p class="text-base font-semibold mb-2"><span class="text-gray-700">요청자:</span> {{ estimate.nickName }}</p>
          <p class="text-sm text-gray-600 mb-2">
            <span class="font-medium">요청 날짜:</span> {{ formatDate(estimate.regDate) }}
          </p>
          <p class="text-sm text-gray-600 mb-2">
            <span class="font-medium">건물 유형:</span> {{ estimate.buildingTypeName }}
          </p>

          <!-- 시공 서비스 목록 -->
          <div class="mb-4">
            <p class="text-sm font-semibold text-gray-700 mb-2">시공 서비스</p>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="(service, index) in estimate.constructionTypes"
                :key="index"
                class="bg-gray-100 text-gray-700 rounded-full text-sm px-3 py-1"
              >
                {{ service }}
              </div>
            </div>
          </div>

          <p class="text-sm text-gray-600 mb-2"><span class="font-medium">예산:</span> {{ estimate.budget }} 원</p>
          <p class="text-sm text-gray-600 mb-2"><span class="font-medium">예상 일정:</span> {{ estimate.schedule }}</p>
          <p class="text-sm text-gray-600 mb-2"><span class="font-medium">주소:</span> {{ estimate.fullAddress }}</p>
          <p class="text-sm text-gray-600 mb-4"><span class="font-medium">평수:</span> {{ estimate.floor }} 평</p>

          <!-- 버튼 -->
          <div class="text-right">
            <button
              v-if="!estimate.send"
              class="bg-midGreen text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700"
              @click="openModal(estimate)"
            >
              견적 보내기
            </button>
            <div v-else-if="estimate.send && estimate.status !== null">
              <button class="bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-400 mr-2">
                취소
              </button>
              <button class="bg-midGreen text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700">수정</button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 견적 보내기 모달 -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 class="text-lg font-semibold mb-4">견적 보내기</h2>

        <!-- 시공 타입별 입력 필드 -->
        <div v-for="(constructionType, index) in selectedEstimate.constructionTypes" :key="index" class="mb-4">
          <label :for="'constructionType-' + index" class="block mb-1 font-medium">{{ constructionType }}</label>
          <input
            type="text"
            :id="'constructionType-' + index"
            v-model="constructionTypeInputs[index]"
            class="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-midGreen focus:outline-none"
            placeholder="해당 시공 타입의 금액을 입력하세요"
          />
        </div>

        <!-- 모달 액션 -->
        <div class="mt-4 flex justify-end">
          <button
            class="bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg mr-2 hover:bg-gray-400"
            @click="closeModal"
          >
            취소
          </button>
          <button
            class="bg-midGreen text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700"
            @click="submitEstimate"
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authInstance from '@/utils/axiosUtils';

export default {
  data() {
    return {
      estimates: [],
      showModal: false,
      selectedEstimate: {},
      constructionTypeInputs: [],
      estimateDetails: [],
    };
  },
  created() {
    this.fetchEstimates();
  },
  methods: {
    async fetchEstimates() {
      try {
        const response = await authInstance.get('/api/estimaterequests', {
          params: { status: 'WAITING' },
        });
        this.estimates = response.data;
      } catch (error) {
        console.error('견적 리스트를 가져오는데 실패했습니다.', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1);
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}년 ${month}월 ${day}일`;
    },
    async openModal(estimate) {
      this.selectedEstimate = estimate;
      this.constructionTypeInputs = estimate.constructionTypes.map(() => '');
      try {
        const response = await authInstance.get(`/api/estimaterequests/${estimate.requestId}/write`);
        this.estimateDetails = response.data;
        this.estimateDetails.forEach((detail, index) => {
          this.constructionTypeInputs[index] = detail.estimatedPrice || '';
        });
        this.showModal = true;
      } catch (error) {
        console.error('견적 상세 정보를 가져오는데 실패했습니다.', error);
      }
    },
    closeModal() {
      this.showModal = false;
    },
    async submitEstimate() {
      const isConfirm = confirm('견적을 보내시겠습니까?');
      if (!isConfirm) return;

      try {
        const constructionPrices = {};
        this.constructionTypeInputs.forEach((price, index) => {
          constructionPrices[`${this.estimateDetails[index].estimateConstructionTypeId}`] = price;
        });
        await authInstance.post(`/api/estimaterequests/${this.selectedEstimate.requestId}/write`, {
          constructionPrices,
        });
        this.closeModal();
        window.location.reload();
      } catch (error) {
        console.error('견적 금액을 제출하는 데 실패했습니다.', error);
      }
    },
  },
};
</script>

<style scoped></style>
