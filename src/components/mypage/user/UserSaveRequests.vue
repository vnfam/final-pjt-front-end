<template>
  <div>
    <h3 class="font-medium text-[18px] mb-4">견적 요청 목록</h3>
    <ul>
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
          <button class="mr-4 bg-white rounded-xl py-2 px-4">
            취소
          </button>
          <button
            class="bg-midGreen text-white rounded-xl py-2 px-4"
            @click="openModal"
          >
            상세 보기
          </button>
        </div>
      </li>
    </ul>
  </div>
  <!-- 모달 -->
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-[400px] shadow-lg">
      <h2 class="text-lg font-semibold mb-4">상세 보기</h2>

      <!-- 모달 액션 -->
      <div class="mt-4 flex justify-end">
        <button class="bg-gray-300 text-black rounded-lg py-2 px-4 mr-2" @click="closeModal">취소</button>
        <button class="bg-midGreen text-white rounded-lg py-2 px-4">승인</button>
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
    };
  },
  created() {
    this.fetchEstimates();  // 컴포넌트가 생성될 때 견적 요청 목록을 가져옴
  },
  methods: {
    async fetchEstimates() {
      try {
        const response = await authInstance.get('/api/estimaterequests/users');
        this.estimates = response.data; // API의 응답 데이터에 맞춰 수정
      } catch (error) {
        console.error('견적 리스트를 가져오는데 실패했습니다.', error);
      }
    },
    // // "상세 보기" 버튼 클릭 시 모달을 열고 견적 정보를 보여주는 함수
    // async openModal(estimate) {
    //   this.selectedEstimate = estimate; // 선택된 견적 정보를 저장
    //   this.constructionTypeInputs = estimate.constructionTypes.map(() => ''); // 각 시공 타입에 대한 입력 필드 초기화
    //   // typeIds
    //   try {
    //     // 선택된 견적의 상세 정보를 API로부터 가져옴
    //     const response = await authInstance.get(`/api/estimaterequests/${estimate.requestId}/write`);
    //     this.estimateDetails = response.data;

    //     // 가져온 데이터를 입력 필드에 설정
    //     this.estimateDetails.forEach((detail, index) => {
    //       this.constructionTypeInputs[index] = detail.estimatedPrice || ''; // 가격이 있으면 설정, 없으면 빈 문자열
    //     });

    //     console.log(this.estimateDetails);

    //     this.showModal = true; // 데이터를 다 가져온 후 모달을 표시
    //   } catch (error) {
    //     console.error('견적 상세 정보를 가져오는데 실패했습니다.', error); // 에러 발생 시 콘솔에 로그 출력
    //   }
    // },

    // // 모달을 닫는 함수
    // closeModal() {
    //   this.showModal = false; // 모달을 숨김
    // },
  },
};
</script>

<style scoped>
/* 스타일은 필요에 따라 추가 */
</style>
