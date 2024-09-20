<template>
  <div class="container mx-auto p-6">
    <div v-if="portfolio.title" class="bg-white shadow-md rounded-lg p-6">
      <h1 class="text-[26px] font-bold mb-4">{{ portfolio.title }}</h1>

      <div class="portfolio-content mb-6">
        <p v-html="sanitizedContent"></p>
      </div>

      <div class="grid grid-cols-2 gap-6 mb-6">
        <div class="flex items-center">
          <h2 class="text-lg font-semibold">시공면적:&nbsp;</h2>
          <p class="text-gray-600">{{ portfolio.projectArea }}평</p>
        </div>
        <div class="flex items-center">
          <h2 class="text-lg font-semibold">예산:</h2>
          <p class="text-gray-600">{{ portfolio.projectBudget.toLocaleString() }} 만원</p>
        </div>
        <div class="flex items-center">
          <h2 class="text-lg font-semibold">시공지역:&nbsp;</h2>
          <p class="text-gray-600">{{ portfolio.projectLocation }}</p>
        </div>
        <div>
          <h2 class="text-lg font-semibold">빌딩 타입:&nbsp;</h2>
          <p class="text-gray-600">{{ portfolio.buildingType }}</p>
        </div>
      </div>

      <div class="mb-6 flex items-center">
        <h2 class="text-lg font-semibold">시공 기간:&nbsp;</h2>
        <p class="text-gray-600">{{ formatDate(portfolio.startDate) }} ~ {{ formatDate(portfolio.endDate) }}</p>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-semibold">시공 서비스:&nbsp;</h2>
        <ul class="list-disc ml-6 text-gray-600">
          <li v-for="(service, index) in portfolio.services" :key="index">{{ service }}</li>
        </ul>
      </div>

      <hr />

      <div
        class="flex pt-6 gap-10 cursor-pointer hover:bg-gray-300"
        @click="this.$router.push(`/company/${portfolio.companyId}`)"
      >
        <div class="mb-6 flex items-center">
          <h2 class="text-lg font-semibold">업체 이름:&nbsp;</h2>
          <p class="text-gray-600">{{ portfolio.companyName }}</p>
        </div>

        <div class="mb-6 flex items-center">
          <h2 class="text-lg font-semibold">업체 주소:&nbsp;</h2>
          <p class="text-gray-600">{{ portfolio.companyAddress }}</p>
        </div>

        <div class="mb-6 flex items-center">
          <h2 class="text-lg font-semibold">업체 번호:&nbsp;</h2>
          <p class="text-gray-600">{{ portfolio.companyPhone }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Loading portfolio details...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DOMPurify from 'dompurify';

export default {
  data() {
    return {
      portfolio: {},
    };
  },
  mounted() {
    this.fetchPortfolio();
  },
  computed: {
    sanitizedContent() {
      // DOMPurify로 content를 필터링
      return DOMPurify.sanitize(this.portfolio.content);
    },
  },
  methods: {
    async fetchPortfolio() {
      const id = this.$route.params.id;

      try {
        const response = await axios.get(`/api/portfolio/${id}`);
        console.log(response.data);
        this.portfolio = response.data;
      } catch (error) {
        console.error('Error fetching portfolio data: ', error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('ko-KR', options);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}

.portfolio-content img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

.portfolio-content p {
  margin-bottom: 10px;
  color: #555;
}
</style>
