<template>
  <div class="py-5">
    <p v-if="reviews && reviews.length" class="text-lg font-medium mb-6">
      총
      <strong class="text-xl">{{ reviews.length }}개의 고객 후기</strong>
    </p>

    <p v-else class="pt-20 text-center text-gray-600 text-lg font-medium">고객 후기가 없습니다.</p>
  </div>

  <div class="flex flex-col space-y-6">
    <ReviewCard
      v-for="review in reviews"
      :key="review.id"
      :review="review"
      class="p-6 bg-white rounded-lg"
    ></ReviewCard>

    <div v-if="reviews.length > 0" class="flex justify-center">
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
import ReviewCard from './ReviewCard.vue';

export default {
  data() {
    return {
      reviews: [],
    };
  },

  async mounted() {
    const reviewList = await axios.get('http://localhost:8080/api/reviews');
    this.reviews = reviewList.data;
    console.log(this.reviews);
  },

  components: {
    ReviewCard,
  },
};
</script>

<style scoped></style>
