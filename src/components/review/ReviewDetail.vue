<template>
  <div class="flex flex-col px-20 py-10">
    <div class="my-carousel">
      <swiper
        :modules="[Navigation, Pagination]"
        :navigation="true"
        :pagination="{ clickable: true }"
        :loop="true"
        class="h-[400px] w-[1100px] rounded-[8px]"
      >
        <swiper-slide>
          <img
            class="w-full h-full object-fill"
            src="https://cf.zipdoc.co.kr/zws/res/assets/images/zipdoc_v35/common/banner_lx_long2.png"
            alt="banner1"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            class="w-full h-full object-fill"
            src="https://cf.zipdoc.co.kr/zws/res/assets/images/zipdoc_v35/common/home-banner-pc-01.jpg"
            alt="banner2"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            class="w-full h-full object-fill"
            src="https://cf.zipdoc.co.kr/zws/res/assets/images/zipdoc_v35/common/home-banner-pc-04.jpg"
            alt="banner3"
          />
        </swiper-slide>
      </swiper>
    </div>

    <div class="flex flex-col mt-10 rounded border-4 rounded-lg">
      <h2 class="text-2xl font-bold p-4">{{ reviewDetail.title }}</h2>
      <ul class="flex flex-row justify-between my-5 text-lg">
        <ul class="pl-40">
          업체정보
          <li class="mt-3">{{ reviewDetail.rating }}점</li>
          <li>{{ reviewDetail.companyName }}</li>
          <li>도배 / 샷시</li>
          <li>2주</li>
        </ul>
        <ul class="pr-40">
          고객정보
          <li class="mt-3">{{ reviewDetail.memberNickName }}</li>
          <li>아파트 / {{ reviewDetail.floor }}</li>
          <li>{{ reviewDetail.totalPrice }} 만원</li>
          <li>2024.09.11</li>
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
        constructionType: '',
        totalPrice: '',
        regDate: '',
        updatable: false,
        images: [],
      },
    };
  },

  components: {
    Swiper,
    SwiperSlide,
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
    this.reviewDetail.regDate = reviewDetail.regDate;
    this.reviewDetail.totalPrice = reviewDetail.totalPrice;
    this.reviewDetail.memberNickName = reviewDetail.memberNickName;
    this.reviewDetail.updatable = reviewDetail.updatable;
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
