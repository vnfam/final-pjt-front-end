<template>
  <div class="company-list w-full p-6">
    <div class="header text-xl text-center mb-6">요청에 맞는 인테리어 업체들을 추천해드립니다!</div>

    <!-- 업체 리스트가 있을 때만 렌더링 -->
    <div v-if="companies.length" class="border border-gray-300 rounded-lg p-4 pb-2 bg-white">
      <div
        v-for="company in companies"
        :key="company.id"
        class="company-card flex items-center justify-between bg-gray-100 rounded-lg p-4 mb-4"
      >
        <div class="company-logo">
          <img
            :src="company.companyLogoUrl ? company.companyLogoUrl : require('@/assets/logo.png')"
            alt="업체 로고"
            class="w-16 h-16"
          />
        </div>

        <div class="company-info flex-1 pl-4">
          <div class="company-header flex items-center">
            <span class="company-name text-lg font-bold">{{ company.companyName || 'Unknown Company' }}</span>
          </div>
          <div class="flex justify-start">
            <p class="text-xs text-gray-500 mr-2">{{ company.rating }}건의 공사</p>
            <p class="text-xs text-midGreen">
              <font-awesome-icon icon="star" />
              <span class="ml-1">{{ company.rating }}</span>
            </p>
          </div>
        </div>

        <div class="contact ml-4">
          <button
            :disabled="isRequested(company.id)"
            :class="[
              'text-white rounded-xl py-2 px-4 transition-colors duration-300',
              isRequested(company.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-midGreen hover:bg-green-600',
            ]"
            @click="sendEstimateRequest(company.id)"
          >
            {{ isRequested(company.id) ? '요청 완료' : '요청' }}
          </button>
        </div>
      </div>
      <div class="text-right mb-2">
        <button class="text-white rounded-xl py-2 px-4 transition-colors duration-300 bg-midGreen">요청 확인</button>
      </div>
    </div>

    <!-- 로딩 중이거나 에러 메시지 -->
    <div v-else>
      {{ loading ? 'Loading...' : error || 'No companies found' }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['city', 'district', 'constructionTypeIds'], // 부모로부터 props로 데이터를 전달받음
  data() {
    return {
      companies: [], // 전체 업체 데이터를 저장할 변수
      sortedCompanies: {
        PREMIUM: [],
        BASIC: [],
        NO: [],
      }, // 정렬된 업체 데이터를 저장할 변수
      mixedBasicNoCompanies: [], // BASIC과 NO를 합친 배열
      loading: true, // 로딩 상태
      error: null, // 에러 처리
      estimateResult: null, // API 응답 저장
      requestedCompanies: [], // 요청이 완료된 회사 ID를 저장
    };
  },
  watch: {
    // city, district, constructionTypeIds 값이 변동될 때마다 fetchCompanies 호출
    city: 'fetchCompanies',
    district: 'fetchCompanies',
    constructionTypeIds: 'fetchCompanies',
  },
  mounted() {
    this.fetchCompanies(); // 컴포넌트가 마운트되면 회사 리스트를 가져옴
  },
  methods: {
    async fetchCompanies() {
      try {
        let url = '/api/company/list';
        const params = [];

        // 지역 선택이 된 경우
        if (this.city && this.district) {
          params.push(`city=${this.city}&district=${this.district}`);
        } else if (this.city) {
          params.push(`city=${this.city}`);
        }

        // 선택된 시공 서비스가 있을 경우 필터링 추가
        if (this.constructionTypeIds.length > 0) {
          params.push(`services=${this.constructionTypeIds.join(',')}`);
        }

        // URL에 파라미터 추가
        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }

        console.log(params);

        const response = await axios.get(url);
        this.companies = response.data;
        this.sortCompanies();
        console.log(response);
      } catch (error) {
        console.error('Error fetching companies:', error);
        this.error = 'Failed to load companies';
      } finally {
        this.loading = false;
      }
    },

    // 업체 데이터를 Premium과 Basic, No로 나누고, Basic과 No는 섞어서 표시
    sortCompanies() {
      this.sortedCompanies.PREMIUM = this.companies.PREMIUM || [];
      this.sortedCompanies.BASIC = this.companies.BASIC || [];
      this.sortedCompanies.NO = this.companies.NO || [];

      // BASIC과 NO 등급 업체들을 하나의 배열로 합쳐서 관리
      this.mixedBasicNoCompanies = [...this.sortedCompanies.BASIC, ...this.sortedCompanies.NO];
    },

    isRequested(companyId) {
      return this.requestedCompanies.includes(companyId);
    },

    async sendEstimateRequest(companyId) {
      const isConfirm = confirm('요청을 보내시겠습니까?');
      if (!isConfirm) return;

      try {
        // 최신 견적 요청 ID 가져오기
        const estimateResponse = await axios.get('/api/estimates/request/latest');
        const estimateRequestId = estimateResponse.data.data;

        const requestPayload = {
          companyId: companyId,
          estimateRequestId: estimateRequestId,
        };

        // API로 견적 요청 전송
        const response = await axios.post('/api/estimates/send', requestPayload);

        this.estimateResult = response.data;
        this.requestedCompanies.push(companyId); // 요청 완료된 회사 ID 저장
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
