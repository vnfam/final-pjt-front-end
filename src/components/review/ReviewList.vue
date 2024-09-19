<template>
  <div class="py-5">
    <p v-if="reviews && reviews.length">
      총
      <strong>{{ reviews.length }} 개의 고객 후기</strong>
    </p>
    <p v-else>고객 후기가 없습니다.</p>
  </div>

  <div class="flex flex-col">
    <ReviewCard v-for="review in reviews" :key="review.id" :review="review"></ReviewCard>
    <div class="flex justify-center">
      <button class="py-4 px-20 my-10 font-size border-4">더보기</button>
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
    console.log(reviewList.data);
    console.log(this.reviews);
  },

  components: {
    ReviewCard,
  },

  methods: {
    goToDetailPage(id) {
      console.log(id);
      this.$router.push(`/reviews/${id}`);
    },
  },
};
</script>

<style scoped></style>
