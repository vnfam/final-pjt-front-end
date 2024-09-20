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
            <button class="mr-4 bg-white rounded-xl py-2 px-4" @click="cancelEstimate(estimate.estimateRequestId)">
              거절
            </button>
            <button
              class="bg-midGreen text-white rounded-xl py-2 px-4"
              @click="approvalEstimate(estimate.estimateRequestId)"
            >
              견적 보내기
            </button>
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
      };
    },
    created() {
      this.fetchEstimates();  // 컴포넌트가 생성될 때 견적 요청 목록을 가져옴
    },
    methods: {
      async fetchEstimates() {
        try {
          const response = await authInstance.get('/api/estimaterequests/received');
          this.estimates = response.data; // API의 응답 데이터에 맞춰 수정
        } catch (error) {
          console.error('견적 리스트를 가져오는데 실패했습니다.', error);
        }
      },
  
      // async cancelEstimate(estimateRequestId) {
      //   const comfirmed = confirm('정말로 취소하시겠습니까?');
      //   if (comfirmed) {
      //     try {
      //       await authInstance.post(`/api/estimates/${estimateRequestId}/cancel`);
      //       // 취소 후 견적 리스트를 다시 가져와서 화면 갱신
      //       this.fetchEstimates();
      //     } catch (error) {
      //       console.error('견적 취소에 실패했습니다.', error);
      //     }
      //   }
      // },
  
      // async approvalEstimate(estimateRequestId) {
      //   try {
      //     alert('승인되었습니다.');
      //     await authInstance.post(`/api/estimates/approval/${estimateRequestId}`);
      //     // 취소 후 견적 리스트를 다시 가져와서 화면 갱신
      //     this.fetchEstimates();
      //   } catch (error) {
      //     console.error('견적 승인에 실패했습니다.', error);
      //   }
      // },
    },
  };
  </script>
  
  <style scoped>
  /* 스타일은 필요에 따라 추가 */
  </style>
  