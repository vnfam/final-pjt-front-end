<template>
  <div class="w-full pb-[40px]">
    <div v-if="portfolios.length > 0" class="flex items-center flex-wrap gap-[20px]">
      <portfolio-card v-for="portfolio in portfolios" :key="portfolio.id" :portfolio="portfolio"></portfolio-card>
    </div>

    <div v-else class="pt-20 text-center text-gray-600 text-lg font-medium">시공 사례가 없습니다.</div>

    <div v-if="portfolios.length > 0" class="flex justify-center">
      <button
        class="py-4 px-20 my-10 font-medium text-midGreen border-[1px] border-midGreen rounded hover:bg-midGreen hover:text-white transition duration-300"
      >
        더보기
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PortfolioCard from './PortfolioCard.vue';

export default {
  components: { PortfolioCard },
  data() {
    return {
      portfolios: [],
    };
  },
  mounted() {
    this.fetchPortfolios();
  },
  methods: {
    async fetchPortfolios() {
      try {
        const response = await axios.get('/api/portfolio/list');
        console.log(response.data);
        this.portfolios = response.data;
      } catch (error) {
        console.error('Error fetching portfolio data: ', error);
      }
    },
  },
};
</script>

<style scoped></style>
