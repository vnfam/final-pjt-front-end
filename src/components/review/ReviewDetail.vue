<template>
  <div class="flex flex-col px-20 py-10">
    <div class="my-carousel">
      <swiper
        v-if="reviewDetail.reviewImageResponses.length > 1"
        :modules="[Navigation, Pagination]"
        :navigation="true"
        :pagination="{ clickable: true }"
        :loop="true"
        class="h-[400px] w-[1100px] rounded-[8px]"
      >
        <swiper-slide v-for="(image, index) in reviewDetail.reviewImageResponses" :key="index">
          <img
            class="w-full h-full object-fill"
            :src="image.imageUrl || require('@/assets/replaceHouse.png')"
            alt="Review Image"
          />
        </swiper-slide>
      </swiper>

      <!-- When there is only 1 image, display it without the Swiper -->
      <img
        v-else
        class="w-full h-[400px] rounded-[8px] object-fill"
        :src="reviewDetail.reviewImageResponses[0]?.imageUrl || require('@/assets/replaceHouse.png')"
        alt="Review Image"
      />
    </div>

    <div class="flex flex-col mt-10 rounded border-4 rounded-lg">
      <h2 class="text-2xl font-bold p-4">{{ reviewDetail.title }}</h2>
      <ul class="flex flex-row justify-between my-5 text-lg">
        <ul class="pl-40">
          업체정보
          <li class="mt-3">
            <font-awesome-icon class="text-midGreen" :icon="['fas', 'star']" />&nbsp; {{ reviewDetail.rating }}점
          </li>
          <li>{{ reviewDetail.companyName }}</li>
          <li>
            <!-- constuctionType이 배열 그자체로 나오지 않게 하려고  -->
            <span v-for="(constructionType, index) in reviewDetail.reviewConstructionTypeResponses" :key="index">
              {{ constructionType.constructionType }}
              <span v-if="index < reviewDetail.reviewConstructionTypeResponses.length - 1">, </span>
            </span>
          </li>
          <li>{{ schedule }}</li>
        </ul>
        <ul class="pr-40">
          고객정보
          <li class="mt-3">{{ reviewDetail.memberNickName }}</li>
          <li>{{ reviewDetail.buildingTypeName }} / {{ reviewDetail.floor }}</li>
          <li>{{ reviewDetail.totalPrice }} 만원</li>
          <li>{{ formattedRegDate }}</li>
        </ul>
      </ul>
    </div>

    <div>
      <div class="flex flex-col items-center" v-html="reviewDetail.content"></div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

export default {
  data() {
    return {
      reviewDetail: {
        title: '',
        content: '',
        rating: '',
        companyName: '',
        floor: '',
        memberNickName: '',
        workStartDate: '',
        workEndDate: '',
        buildingTypeName: '',
        reviewConstructionTypeResponses: [],
        totalPrice: '',
        regDate: '',
        updatable: false,
        reviewImageResponses: [],
      },
    };
  },

  components: {
    Swiper,
    SwiperSlide,
  },

  computed: {
    // 게시일에 불필요한 시간 자르기
    formattedRegDate() {
      if (!this.reviewDetail || !this.reviewDetail.regDate) return '';

      const date = new Date(this.reviewDetail.regDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      // Return the formatted date as YYYY.MM.DD
      return `${year}.${month}.${day}`;
    },

    // 시공 기간 계산하기
    schedule() {
      if (!this.reviewDetail.workStartDate || !this.reviewDetail.workEndDate) return '';

      const startDate = new Date(this.reviewDetail.workStartDate);
      const endDate = new Date(this.reviewDetail.workEndDate);

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

  async mounted() {
    const userStore = useUserStore();
    const token = userStore.accessToken;

    const reviewId = this.$route.params.id;
    console.log(reviewId);
    const reviewDetailRequest = await axios.get(`http://localhost:8080/api/reviews/${reviewId}`, {
      headers: {
        Authorization: token,
      },
    });
    const reviewDetail = reviewDetailRequest.data;
    // review 데이터 set
    this.reviewDetail.title = reviewDetail.title;
    this.reviewDetail.content = reviewDetail.content;
    this.reviewDetail.rating = reviewDetail.rating;
    this.reviewDetail.companyName = reviewDetail.companyName;
    this.reviewDetail.floor = reviewDetail.floor;
    this.reviewDetail.workStartDate = reviewDetail.workStartDate;
    this.reviewDetail.workEndDate = reviewDetail.workEndDate;
    this.reviewDetail.buildingTypeName = reviewDetail.buildingTypeName;
    this.reviewDetail.reviewConstructionTypeResponses = reviewDetail.reviewConstructionTypeResponses;
    this.reviewDetail.regDate = reviewDetail.regDate;
    this.reviewDetail.totalPrice = reviewDetail.totalPrice;
    this.reviewDetail.memberNickName = reviewDetail.memberNickName;
    this.reviewDetail.updatable = reviewDetail.updatable;
    this.reviewDetail.reviewImageResponses = reviewDetail.reviewImageResponses;
    console.log(reviewDetail);

    console.log(this.reviewDetail.updatable);
  },

  setup() {
    return {
      Navigation,
      Pagination,
      Autoplay,
    };
  },
};
</script>

<style scoped>
.my-carousel {
  display: flex;
}
</style>
