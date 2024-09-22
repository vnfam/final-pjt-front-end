<template>
  <div class="flex flex-col justify-center items-center w-full mb-8">
    <div class="text-3xl font-bold text-gray-800">
      <p class="text-2xl">내 후기 내역</p>
    </div>
  </div>

  <div class="flex flex-col space-y-4">
    <ReviewCompo></ReviewCompo>
    <ReviewCompo></ReviewCompo>
    <ReviewCompo></ReviewCompo>
    <ReviewCompo></ReviewCompo>
    <ReviewCompo></ReviewCompo>
    <div class="flex justify-center pt-4">
      <button class="px-6 py-2 bg-midGreen text-white rounded-md shadow-sm transition duration-300">더보기</button>
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

<style scoped></style>
