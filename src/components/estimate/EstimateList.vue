<template>
  <div class="p-4 flex items-center justify-start shadow">
    <div class="mr-10">
      <p class="text-midGreen font-medium text-[14px]">지역</p>
      <div class="flex-column justify-start items-center font-medium text-[16px]">
        <font-awesome-icon class="mr-2" :icon="['fas', 'location-dot']" />
        <span>{{ selectedRegion }}</span>
      </div>
    </div>

    <div class="mr-3 w-[1px] h-[32px] bg-[#ddd]"></div>

    <div class="mr-10">
      <p class="text-midGreen font-medium text-[14px]">유형</p>
      <div class="flex-column justify-start items-center font-medium text-[16px]">
        <span>주거 인테리어</span>
      </div>
    </div>

    <div class="mr-3 w-[1px] h-[32px] bg-[#ddd]"></div>

    <div class="mr-10">
      <p class="text-midGreen font-medium text-[14px]">시공</p>
      <div class="flex-column justify-start items-center font-medium text-[16px]">
        <span>종합시공</span>
      </div>
    </div>
  </div>
  <div>
    <h3 class="font-medium text-[18px] mb-4">견적 요청 목록</h3>
    <!-- List rendering for estimates -->
    <ul>
      <li v-for="(estimate, index) in estimates" :key="index" class="mb-4 p-4 shadow rounded">
        <p><strong>Requested by:</strong> {{ estimate.username }}</p>
        <p><strong>Request Date:</strong> {{ estimate.requestDate }}</p>
        <p><strong>Building Type:</strong> {{ estimate.buildingType }}</p>
        <p><strong>Construction Types:</strong> {{ estimate.constructionTypes.join(', ') }}</p>
        <p><strong>Budget:</strong> {{ estimate.budget }}</p>
        <p><strong>Schedule:</strong> {{ estimate.schedule }}</p>
        <p><strong>Address:</strong> {{ estimate.constructionAddress }}</p>
        <p><strong>Floor:</strong> {{ estimate.floor }}</p>
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
        const response = await authInstance.get('/api/estimates/list');
        this.estimates = response.data.data; // API의 응답 데이터에 맞춰 수정
      } catch (error) {
        console.error('견적 리스트를 가져오는데 실패했습니다.', error);
      }
    },
  },
};
</script>

<style scoped>
/* 스타일은 필요에 따라 추가 */
</style>
