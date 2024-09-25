<template>
  <div class="flex flex-col justify-center items-center w-full mb-8">
    <div class="text-3xl font-bold text-gray-800">
      <p class="text-2xl">내 후기 내역</p>
    </div>
  </div>

  <div
    v-for="review in slice"
    :key="review.id"
    class="flex flex-col space-y-4 cursor-pointer"
    @click="goToReviewsPage(review.id)"
  >
    <div class="flex bg-white rounded-lg p-4 space-x-4 border-[1px] border-gray-200 mb-4">
      <div class="basis-2/3 flex flex-col justify-between">
        <!-- 리뷰 제목 -->
        <div class="text-xl font-bold text-gray-800 mb-2">
          {{ review.title }}
        </div>

        <!-- 건물 유형, 평수, 공사 종류, 기간 -->
        <div class="flex space-x-2 mb-2">
          <span class="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded">
            {{ review.buildingType }}
          </span>
          <span class="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded"> {{ review.floor }}평 </span>
          <span
            v-for="type in review.constructionTypes"
            :key="type"
            class="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded"
          >
            {{ type }}
          </span>
          <span class="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded">
            {{ schedule(review.workStartDate, review.workEndDate) }}
          </span>
        </div>

        <!-- 평점, 작성자, 등록 날짜 -->
        <div class="flex items-center space-x-2 mb-2">
          <p class="text-xs text-midGreen">
            <font-awesome-icon icon="star" />
            <span class="ml-1">{{ review.rating }}</span>
          </p>
          <span class="text-sm text-gray-600">{{ review.memberNickName }} 고객님</span>
          <span class="text-sm text-gray-400">{{ new Date(review.regDate).toLocaleDateString() }}</span>
        </div>
      </div>

      <div class="basis-1/3 flex justify-end items-center">
        <div class="w-24 h-24 rounded-lg bg-gray-100 overflow-hidden">
          <img
            :src="
              review.reviewImageResponses.length
                ? review.reviewImageResponses[0].imageUrl
                : require('@/assets/logo.png')
            "
            alt="리뷰 이미지"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center pt-4">
    <button class="px-6 py-2 bg-midGreen text-white rounded-md shadow-sm transition duration-300">더보기</button>
  </div>
</template>

<script>
import authInstance from '@/utils/axiosUtils';

export default {
  data() {
    return {
      slice: [], // Holds the reviews
      pageSize: 5,
      pageNumber: 0,
    };
  },
  mounted() {
    this.review(); // Load the reviews when component is mounted
  },
  methods: {
    async review() {
      try {
        const response = await authInstance.get('/api/reviews/mypage', {
          params: {
            page: this.pageNumber,
            size: this.pageSize,
          },
        });
        this.slice = response.data.slice; // Assuming slice contains the review data array
        console.log(response.data);
      } catch (error) {
        console.error('유저 정보를 가져오지 못했습니다.', error);
      }
    },
    // 시공 기간 계산하기
    schedule(reviewStartDate, reviewEndDate) {
      if (!reviewStartDate || !reviewEndDate) {
        return '';
      }
      const startDate = new Date(reviewStartDate);
      const endDate = new Date(reviewEndDate);

      if (
        startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate()
      ) {
        return '1 일';
      }

      const timeDiff = Math.abs(endDate - startDate);
      const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if (dayDiff >= 7) {
        const weekDiff = Math.ceil(dayDiff / 7);
        return `${weekDiff}주 소요`;
      } else {
        return `${dayDiff}일 소요`;
      }
    },
    // 페이지 이동 메서드
    goToReviewsPage(reviewId) {
      this.$router.push(`/reviews/${reviewId}`); // /reviews 경로로 이동
    },
  },
};
</script>

<style scoped></style>
