<template>
  <div class="company-list w-full p-6">
    <div class="header text-xl text-center mb-6">요청에 맞는 인테리어 업체들을 추천해드립니다!</div>

    <!-- 업체 리스트가 있을 때만 렌더링 -->
    <div v-if="companies.length">
      <div
        v-for="company in companies"
        :key="company.id"
        class="company-card flex items-center justify-between bg-gray-100 rounded-lg p-4 mb-4"
      >
        <div class="company-logo">
          <img :src="company.companyLogoUrl" alt="업체 로고" class="w-12 h-12" />
        </div>

        <div class="company-info flex-1 pl-4">
          <div class="company-header flex items-center">
            <span class="company-name text-lg font-bold">{{ company.companyName || 'Unknown Company' }}</span>
          </div>
          <div class="company-stats mt-2 text-sm text-gray-500">
            <span>상담수: {{ company.rating || '0' }}건</span> ·
            <span>시공수: {{ company.services.length || '0' }}건</span>
          </div>
        </div>

        <div class="construction-images flex gap-2">
          <div
            v-for="image in 4"
            :key="image"
            class="construction-image w-12 h-12 bg-gray-200 flex items-center justify-center text-xs text-gray-500"
          >
            시공 이미지
          </div>
        </div>

        <div class="contact ml-4">
          <button @click="sendEstimateRequest(company.id)">요청</button>
        </div>
      </div>
    </div>

    <!-- 로딩 중이거나 에러 메시지 -->
    <div v-else>
      {{ loading ? 'Loading...' : 'No companies found' }}
    </div>
  </div>
</template>

<script>
import authInstance from '@/utils/axiosUtils'; // Axios 인스턴스

export default {
  data() {
    return {
      companies: [], // 회사 리스트 저장
      loading: true, // 로딩 상태
      error: null, // 에러 처리
      estimateResult: null, // API 응답 저장
    };
  },
  mounted() {
    this.fetchCompanies(); // 컴포넌트가 마운트되면 회사 리스트를 가져옴
  },
  methods: {
    async fetchCompanies() {
      try {
        this.loading = true;
        const response = await authInstance.get('/api/company/list');
        this.companies = response.data;
      } catch (error) {
        console.error('Error fetching companies:', error);
        this.error = 'Failed to load companies';
      } finally {
        this.loading = false;
      }
    },

    async sendEstimateRequest(companyId) {
      try {
        // 로그인한 유저의 최신 견적 요청 ID를 가져옴
        const estimateResponse = await authInstance.get('/api/estimates/request/latest');
        // 백엔드에서 객체로 반환하기 때문에 그 안에 있는 data(estimateRequestId) 추출하기
        const estimateRequestId = estimateResponse.data.data;

        console.log(estimateRequestId);

        const requestPayload = {
          companyId: companyId,
          estimateRequestId: estimateRequestId, // 실제 견적 요청 ID로 교체 필요
        };

        // API로 견적 요청 전송
        const response = await authInstance.post('/api/estimates/send', requestPayload);

        // 응답을 estimateResult에 저장하여 UI에 표시
        this.estimateResult = response.data;
      } catch (error) {
        console.error('Error sending estimate:', error);
        this.estimateResult = { message: '견적 요청 실패.' };
      }
    },
  },
};
</script>

<style scoped>
/* Tailwind CSS 클래스 사용 */
</style>
