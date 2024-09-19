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
  </template>
  
  <script>
  import authInstance from '@/utils/axiosUtils';
  
  export default {
    data() {
      return {
        selectedRegion: '서울 강남구',
        estimates: [],
      };
    },
    created() {
      this.fetchEstimates();
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
  