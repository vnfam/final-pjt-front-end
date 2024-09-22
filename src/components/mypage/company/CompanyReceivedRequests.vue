<template>
  <div>
    <h3 class="font-medium text-[18px] mb-4">견적 요청 목록</h3>
    <ul class="flex">
      <li v-for="(estimate, index) in estimates" :key="index" class="bg-gray-100 mb-4 p-4 shadow rounded">
        <p><strong>Requested by:</strong> {{ estimate.nickName }}</p>
        <p><strong>Request Date:</strong> {{ estimate.regDate }}</p>
        <p><strong>Building Type:</strong> {{ estimate.buildingTypeName }}</p>
        <p><strong>Construction Types:</strong> {{ estimate.constructionTypes.join(', ') }}</p>
        <p><strong>Budget:</strong> {{ estimate.budget }}</p>
        <p><strong>Schedule:</strong> {{ estimate.schedule }}</p>
        <p><strong>Address:</strong> {{ estimate.fullAddress }}</p>
        <p><strong>Floor:</strong> {{ estimate.floor }}</p>
        <div class="text-right">
          <button class="mr-4 bg-white rounded-xl py-2 px-4">거절</button>
          <button class="bg-midGreen text-white rounded-xl py-2 px-4" @click="openModal(estimate)">견적 보내기</button>
        </div>
      </li>
    </ul>
  </div>
  <!-- 모달 -->
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-[400px] shadow-lg">
      <h2 class="text-lg font-semibold mb-4">견적 보내기</h2>

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

      <!-- 모달 액션 -->
      <div class="mt-4 flex justify-end">
        <button class="bg-gray-300 text-black rounded-lg py-2 px-4 mr-2" @click="closeModal">취소</button>
        <button class="bg-midGreen text-white rounded-lg py-2 px-4" @click="submitEstimate">보내기</button>
      </div>
    </div>
  </div>
</template>

<script>
import authInstance from '@/utils/axiosUtils';

export default {
  data() {
    return {
      selectedRegion: '서울 강남구',
      estimates: [],
      showModal: false, // 모달 표시 여부를 제어하는 변수
      selectedEstimate: {}, // 선택된 견적 정보를 저장하는 객체
      constructionTypeInputs: [], // 각 시공 타입별 입력 필드 값을 저장하는 배열
      estimateDetails: [],
      test: [],
      test2: [],
    };
  },
  created() {
    this.fetchEstimates(); // 컴포넌트가 생성될 때 견적 요청 목록을 가져옴
  },
  methods: {
    async fetchEstimates() {
      try {
        const response = await authInstance.get('/api/estimaterequests/received');
        this.estimates = response.data; // API의 응답 데이터에 맞춰 수정
        console.log('여기');
        console.log(this.estimates);
      } catch (error) {
        console.error('견적 리스트를 가져오는데 실패했습니다.', error);
      }
    },

    // "견적 보내기" 버튼 클릭 시 모달을 열고 견적 정보를 보여주는 함수
    async openModal(estimate) {
      this.selectedEstimate = estimate; // 선택된 견적 정보를 저장
      this.constructionTypeInputs = estimate.constructionTypes.map(() => ''); // 각 시공 타입에 대한 입력 필드 초기화
      // typeIds
      try {
        // 선택된 견적의 상세 정보를 API로부터 가져옴
        const response = await authInstance.get(`/api/estimaterequests/${estimate.requestId}/write`);
        this.estimateDetails = response.data; // 2 list

        // 가져온 데이터를 입력 필드에 설정
        this.estimateDetails.forEach((detail, index) => {
          this.constructionTypeInputs[index] = detail.estimatedPrice || ''; // 가격이 있으면 설정, 없으면 빈 문자열
        });

        console.log(this.estimateDetails);

        this.showModal = true; // 데이터를 다 가져온 후 모달을 표시
      } catch (error) {
        console.error('견적 상세 정보를 가져오는데 실패했습니다.', error); // 에러 발생 시 콘솔에 로그 출력
      }
    },

    // 모달을 닫는 함수
    closeModal() {
      this.showModal = false; // 모달을 숨김
    },

    // 견적 금액을 제출하는 함수
    async submitEstimate() {
      try {
        // 시공 타입별 입력 금액 데이터를 서버로 전송할 형식으로 변환
        const constructionPrices = {};
        console.log(this.estimateDetails);
        this.constructionTypeInputs.forEach((price, index) => {
          constructionPrices[`${this.estimateDetails[index].estimateConstructionTypeId}`] = price; // 시공 타입
          console.log(price);
        });

        console.log(constructionPrices);

        // 서버로 POST 요청 전송
        await authInstance.post(`/api/estimaterequests/${this.selectedEstimate.requestId}/write`, {
          constructionPrices, // 전송할 데이터
        });

        console.log('견적 금액이 성공적으로 제출되었습니다.');
        this.closeModal(); // 전송 후 모달 닫기

        window.location.reload(); // 전송 후 새로고침
      } catch (error) {
        console.error('견적 금액을 제출하는 데 실패했습니다.', error); // 에러 발생 시 콘솔에 로그 출력
      }
    },
  },
};
</script>

<style scoped></style>
