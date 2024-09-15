<template>
  <div class="flex flex-col justify-center items-center w-full h-50 mb-6">
    <div class="text-2xl font-bold">
      <h2>리뷰 리스트</h2>
    </div>
  </div>
  <div class="flex flex-col space">
    <ReviewCompo></ReviewCompo>
    <ReviewCompo></ReviewCompo>
    <ReviewCompo></ReviewCompo>
    <ReviewCompo></ReviewCompo>
    <ReviewCompo></ReviewCompo>
    <div class="flex justify-center">
      <div class="">더보기</div>
    </div>
  </div>
</template>

<script>
import ReviewCompo from './ReviewCompo.vue';

export default {
  components: {
    ReviewCompo,
  },
};
</script>

<style></style>
