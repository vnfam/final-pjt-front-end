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
            <div v-else-if="estimate.send === true && estimate.status === 'SENT'">
              <button class="mr-4 bg-white rounded-xl py-2 px-4" @click="deleteEstimate(estimate)">
                삭제(이름 생각해보기)
              </button>
              <button class="bg-midGreen text-white rounded-xl py-2 px-4" @click="openUpdateModal(estimate)">
                수정
              </button>
            </div>
            <div v-else-if="estimate.send === true && estimate.status === 'RECEIVED'">
              <button class="mr-4 bg-white rounded-xl py-2 px-4" @click="deleteEstimate(estimate)">
                삭제(이름 생각해보기)
              </button>
              <button class="bg-midGreen text-white rounded-xl py-2 px-4" @click="openSendModal(estimate)">
                견적 보내기
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
      estimates: [], // 견적 요청 목록을 저장하는 배열
      showSendModal: false, // 모달 표시 여부를 제어하는 변수
      showUpdateModal: false, // 모달 표시 여부를 제어하는 변수
      selectedEstimate: {}, // 선택된 견적 정보를 저장하는 객체
      constructionTypeInputs: [], // 각 시공 타입별 입력 필드 값을 저장하는 배열
      estimateDetails: [], // 견적 상세 정보를 저장하는 배열
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
    // "수정" 버튼 클릭 시 모달을 열고 견적 정보를 보여주는 함수
    async openUpdateModal(estimate) {
      try {
        // 선택된 견적의 상세 정보를 API로부터 가져옴
        const response = await authInstance.get(`/api/estimates/${estimate.estimateId}`);
        console.log(response.data);

        // 예시: response.data.constructionPrices가 객체로 { typeId: { price: number, ... } } 형태라고 가정
        const constructionPrices = response.data.constructionPrices;

        // constructionPrices 객체를 배열으로 변환하여 estimateDetails에 저장
        this.estimateDetails = Object.keys(constructionPrices).map((typeId) => ({
          estimateConstructionTypeId: typeId,
          price: constructionPrices[typeId].price,
        }));

        // constructionTypeInputs를 설정
        this.constructionTypeInputs = this.estimateDetails.map((detail) => detail.price);

        // totalPrice를 selectedEstimate에 추가
        this.selectedEstimate = {
          ...estimate,
          totalPrice: response.data.totalPrice, // 받아온 totalPrice 값 추가
        };

        this.showUpdateModal = true; // 데이터를 다 가져온 후 모달을 표시
      } catch (error) {
        console.error('견적 상세 정보를 가져오는데 실패했습니다.', error); // 에러 발생 시 콘솔에 로그 출력
      }
    },

    // 모달을 닫는 함수
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
        console.error('견적 금액을 제출하는 데 실패했습니다.', error); // 에러 발생 시 콘솔에 로그 출력
      }
    },

    // 견적 금액 수정 후 제출하는 함수
    async submitUpdateEstimate() {
      const isConfirm = confirm('견적을 수정하시겠습니까?');
      if (!isConfirm) {
        return;
      }
      try {
        // 시공 타입별 입력된 금액 데이터를 전송할 형식으로 변환
        const constructionPrices = {};
        this.constructionTypeInputs.forEach((price, index) => {
          const typeId = this.estimateDetails[index].estimateConstructionTypeId;
          constructionPrices[typeId] = parseFloat(price); // 금액을 숫자 형식으로 변환
        });

        // 요청 페이로드 준비
        const requestData = {
          constructionPrices: constructionPrices,
        };

        await authInstance.patch(`/api/estimates/${this.selectedEstimate.estimateId}`, requestData);
        this.closeModal(); // 수정 후 모달 닫기
        window.location.reload();
      } catch (error) {
        console.error('견적 수정을 실패했습니다.', error); // 에러 발생 시 콘솔에 로그 출력
      }
    },

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
