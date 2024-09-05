<template>
  <div>
    <category-compo></category-compo>
    <banner-compo></banner-compo>
    <div class="pt-8 pb-4">
      <p class="text-[22px] font-bold text-[#1d1d1d] leading-[22px] tracking-[-0.3px] mb-2 flex items-center">
        시공전문가
      </p>
      <div class="flex items-center">
        <font-awesome-icon class="w-4 h-4 mt-[2px] mr-[4px] text-[#555]" :icon="['fas', 'circle-info']" />
        <span class="text-[14px] font-normal text-[#555] leading-[20px] tracking-[-0.3px]"
          >선택한 지역의 시공전문가를 보여드립니다.</span
        >
      </div>
    </div>
    <div class="w-full flex items-center flex-wrap gap-[20px] pb-[40px]">
      <company-card></company-card>
      <company-card></company-card>
      <company-card></company-card>
      <company-card></company-card>
      <company-card></company-card>
    </div>
    <to-top-compo></to-top-compo>
  </div>
</template>

<script>
import CategoryCompo from './common/CategoryCompo.vue';
import ToTopCompo from './common/ToTopCompo.vue';
import BannerCompo from './company/BannerCompo.vue';
import CompanyCard from './company/CompanyCard.vue';
export default {
  components: { CategoryCompo, BannerCompo, CompanyCard, ToTopCompo },
};
</script>

<style></style>
