<template>
  <div class="w-full flex items-center flex-wrap gap-[20px] pb-[40px]">
    <portfolio-card v-for="portfolio in portfolios" :key="portfolio.id" :portfolio="portfolio"></portfolio-card>
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

<style></style>
