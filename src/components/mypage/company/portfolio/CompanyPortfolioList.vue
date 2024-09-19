<template>
  <div class="flex flex-col justify-center items-center w-full h-50 mb-6">
    <div class="text-2xl font-bold">
      <h2>시공 사례 리스트</h2>
    </div>
  </div>
  <div class="flex flex-col space">
    <PortfolioCompo></PortfolioCompo>
    <PortfolioCompo></PortfolioCompo>
    <PortfolioCompo></PortfolioCompo>
    <PortfolioCompo></PortfolioCompo>
    <PortfolioCompo></PortfolioCompo>
    <div class="flex justify-center">
      <div class="">더보기</div>
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

<style></style>
