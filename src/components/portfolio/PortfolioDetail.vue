<template>
  <div class="container mx-auto p-6">
    <div v-if="portfolio.title" class="bg-white rounded-lg border-gray-300 border-[1px]">
      <div class="border-gray-300 border-b-[1px] p-6 rounded-t-lg flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-800 mb-2">{{ portfolio.title }}</h1>
          <div class="text-gray-500 text-sm mt-3">
            <span v-if="isUpdated">{{ formatDate(portfolio.updatedAt) }} (수정됨)</span>
            <span v-else>{{ formatDate(portfolio.createdAt) }}</span>
          </div>
        </div>
        <!-- 수정 및 삭제 버튼 -->
        <div class="flex gap-4">
          <button @click="goToEditPage" class="text-gray-400 hover:text-gray-600 text-sm rounded-lg">수정</button>
          <button @click="confirmDelete" class="text-gray-400 hover:text-gray-600 text-sm rounded-lg">삭제</button>
        </div>
      </div>

      <div class="portfolio-content p-6 leading-relaxed">
        <h2 class="text-xl font-bold mb-4">내용</h2>
        <p v-html="sanitizedContent"></p>
      </div>

      <div class="bg-gray-50 py-6 px-6">
        <h2 class="text-2xl font-bold mb-4">시공 정보</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div class="flex items-center">
            <h3 class="text-lg font-semibold text-gray-700">시공 면적:</h3>
            <p class="text-gray-600 ml-2">{{ portfolio.floor }}평</p>
          </div>
          <div class="flex items-center">
            <h3 class="text-lg font-semibold text-gray-700">예산:</h3>
            <p class="text-gray-600 ml-2">{{ portfolio.projectBudget.toLocaleString() }} 만원</p>
          </div>
          <div class="flex items-center">
            <h3 class="text-lg font-semibold text-gray-700">건물 종류:</h3>
            <p class="text-gray-600 ml-2">{{ portfolio.buildingType }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div class="flex items-center">
            <h3 class="text-lg font-semibold text-gray-700">시공 지역:</h3>
            <p class="text-gray-600 ml-2">{{ portfolio.projectLocation }}</p>
          </div>
          <div class="flex items-center">
            <h3 class="text-lg font-semibold text-gray-700">시공 기간:</h3>
            <p class="text-gray-600 ml-2">
              {{ formatDateWithoutTime(portfolio.startDate) }} ~ {{ formatDateWithoutTime(portfolio.endDate) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white py-6 px-6">
        <h2 class="text-2xl font-bold mb-4">시공 서비스</h2>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(service, index) in portfolio.services"
            :key="index"
            class="flex items-center bg-[#f1f2f3] rounded-[40px] h-[32px] text-[14px] font-normal leading-[20px] tracking-[-0.3px] px-4 py-2"
          >
            {{ service }}
          </div>
        </div>
      </div>

      <hr class="my-6" />

      <div
        class="flex pt-6 gap-6 items-center cursor-pointer hover:bg-gray-100 p-6 rounded-b-lg transition-all duration-300"
        @click="this.$router.push(`/company/${portfolio.companyId}`)"
      >
        <div class="w-24 h-24 rounded-full border border-gray-300 overflow-hidden">
          <img
            v-if="portfolio.companyLogo"
            :src="portfolio.companyLogo"
            alt="업체 로고"
            class="w-full h-full object-cover"
          />
          <img v-else src="@/assets/logo.png" alt="대체 이미지" class="w-full h-full object-cover" />
        </div>

        <div class="flex-grow">
          <h2 class="text-xl font-semibold text-gray-700 mb-1">{{ portfolio.companyName }}</h2>
          <p class="text-gray-500">{{ portfolio.companyAddress }}</p>
          <p class="text-gray-500">{{ portfolio.companyPhone }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-gray-500">시공사례 데이터를 불러오는 중입니다...</p>
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
      return DOMPurify.sanitize(this.portfolio.content);
    },
    isUpdated() {
      const updatedAt = new Date(this.portfolio.updatedAt);
      const createdAt = new Date(this.portfolio.createdAt);

      return updatedAt.setSeconds(0, 0) > createdAt.setSeconds(0, 0);
    },
  },
  methods: {
    async fetchPortfolio() {
      const id = this.$route.params.id;

      try {
        const response = await axios.get(`/api/portfolio/${id}`);
        this.portfolio = response.data;
      } catch (error) {
        console.error('Error fetching portfolio data: ', error);
      }
    },
    async deletePortfolio() {
      const id = this.$route.params.id;
      console.log('delete portfolio id: ', id);

      // try {
      //   await axios.delete(`/api/portfolio/${id}`);
      //   alert('포트폴리오가 삭제되었습니다.');
      //   this.$router.push('/portfolio');
      // } catch (error) {
      //   console.error('Error deleting portfolio: ', error);
      // }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString('ko-KR', options);
    },
    formatDateWithoutTime(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('ko-KR', options);
    },
    goToEditPage() {
      this.$router.push(`/portfolio/edit/${this.$route.params.id}`);
    },
    confirmDelete() {
      if (confirm('정말로 이 포트폴리오를 삭제하시겠습니까?')) {
        this.deletePortfolio();
      }
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
  border-radius: 8px;
}

.portfolio-content p {
  margin-bottom: 10px;
  color: #555;
  line-height: 1.75;
}
</style>
