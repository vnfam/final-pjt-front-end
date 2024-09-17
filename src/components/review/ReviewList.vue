<template>
  <div class="py-5">
    <p>
      총
      <strong>{{ n }} 개의 고객 후기</strong>
    </p>
  </div>

  <div class="flex flex-col">
    <ReviewCard v-for="n in 5" :key="n"></ReviewCard>
    <!-- <ReviewCard v-for="review in reviews" :key="review.id" :review="review"></ReviewCard> -->
    <div class="flex justify-center">
      <button class="py-4 px-20 my-10 font-size border-4">더보기</button>
    </div>
  </div>
</template>

<script>
import ReviewCard from './ReviewCard.vue';

export default {
  data() {
    return {
      start: 0,
      size: 5,
      n: 0,
      //   reviews: [],
    };
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
