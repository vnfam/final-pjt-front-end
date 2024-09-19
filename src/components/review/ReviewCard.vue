<template>
  <!-- 전체 리뷰 공간 -->
  <div class="flex border-b-4 cursor-pointer" @click="goToDetailPage">
    <div class="flex basis-3/4 flex-col w-full mr-20">
      <div>
        <h2 class="text-2xl font-bold">{{ review.title }}</h2>
      </div>
      <div class="mt-5">
        <h2 v-html="truncatedContent"></h2>
        <!-- v-html 사용하면 태그 표시 안 보임 -->
      </div>
      <div class="mt-3">
        <ul class="flex">
          <li class="px-3 ml-3 bg-gray-400 rounded-full">{{ review.buildingType }}</li>
          <li class="px-3 ml-3 bg-gray-400 rounded-full">
            <span v-for="(constructionType, index) in review.constructionTypes" :key="index">
              {{ constructionType }}<span v-if="index !== review.constructionTypes.length - 1">, </span>
            </span>
          </li>
          <li class="px-3 ml-3 bg-gray-400 rounded-full">{{ review.floor }}평</li>
          <li class="px-3 ml-3 bg-gray-400 rounded-full">{{ schedule }}</li>
        </ul>
      </div>
      <div class="mt-3">
        <ul class="flex cust">
          <li class="px-3">
            <font-awesome-icon class="text-midGreen" :icon="['fas', 'star']" />&nbsp;
            {{ review.rating }}
          </li>
          <li class="px-3">{{ review.memberNickName }} 고객님</li>
          <li class="px-3">{{ formattedRegDate }}</li>
        </ul>
      </div>
    </div>
    <div class="basis-1/4">
      <img
        :src="
          review.reviewImageResponses[0]
            ? review.reviewImageResponses[0].imageUrl
            : require('@/assets/replaceHouse.png')
        "
        alt="AD Img"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      required: true,
    },
  },

  computed: {
    // review content 글자수 정하기 및 img태그 숨김
    truncatedContent() {
      if (!this.review || !this.review.content) {
        return '';
      }
      const cleanedContent = this.review.content.replace(/<img[^>]*>/g, ''); // content에 img태그 지우기
      return cleanedContent.length > 150 ? cleanedContent.substring(0, 150) + '...' : cleanedContent;
    },

    // 게시일에 불필요한 시간 자르기
    formattedRegDate() {
      if (!this.review || !this.review.regDate) return '';

      const date = new Date(this.review.regDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      // Return the formatted date as YYYY.MM.DD
      return `${year}.${month}.${day}`;
    },

    // 시공 기간 계산하기
    schedule() {
      if (!this.review.workStartDate || !this.review.workEndDate) return '';

      const startDate = new Date(this.review.workStartDate);
      const endDate = new Date(this.review.workEndDate);

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
        return `${weekDiff} 주`;
      } else {
        return `${dayDiff} 일`;
      }
    },
  },

  methods: {
    goToDetailPage() {
      console.log(this.review);

      this.$router.push(`/reviews/${this.review.id}`);
    },
  },
};
</script>

<style scoped></style>
