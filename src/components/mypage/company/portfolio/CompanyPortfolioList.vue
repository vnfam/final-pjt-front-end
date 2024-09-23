<template>
  <div class="flex flex-col justify-center items-center w-full mb-8">
    <div class="text-3xl font-bold text-gray-800">
      <h2>시공 사례 리스트</h2>
    </div>
  </div>

  <div class="flex flex-col space-y-4">
    <PortfolioCompo></PortfolioCompo>
    <PortfolioCompo></PortfolioCompo>
    <PortfolioCompo></PortfolioCompo>
    <PortfolioCompo></PortfolioCompo>
    <PortfolioCompo></PortfolioCompo>

    <div class="flex justify-center pt-4">
      <button class="px-6 py-2 bg-midGreen text-white rounded-md shadow-sm transition duration-300">더보기</button>
    </div>
  </div>
</template>

<script>
import PortfolioCompo from './PortfolioCompo.vue';

export default {
  components: {
    PortfolioCompo,
  },
};
</script>

<style scoped></style>
