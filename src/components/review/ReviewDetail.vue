<template>
  <div class="container w-[850px] mx-auto p-8">
    <!-- 이미지 슬라이더 -->
    <div class="my-carousel mb-8">
      <swiper
        v-if="reviewDetail.reviewImageResponses.length > 1"
        :modules="[Navigation, Pagination]"
        :navigation="true"
        :pagination="{ clickable: true }"
        :loop="true"
        class="w-[850px] h-[400px] rounded-lg overflow-hidden"
      >
        <swiper-slide v-for="(image, index) in reviewDetail.reviewImageResponses" :key="index">
          <img
            class="w-[850px] h-[400px] object-cover rounded-lg"
            :src="image.imageUrl || require('@/assets/replaceHouse.png')"
            alt="Review Image"
          />
        </swiper-slide>
      </swiper>
      <img
        v-else
        class="w-[850px] h-[400px] rounded-lg object-cover"
        :src="reviewDetail.reviewImageResponses[0]?.imageUrl || require('@/assets/replaceHouse.png')"
        alt="Review Image"
      />
    </div>

    <!-- 리뷰 제목 -->
    <div class="bg-white p-6 mb-8 border-b-[1px] border-gray-200">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ reviewDetail.title }}</h2>
      <div class="flex justify-between items-center text-gray-600">
        <div>
          <p class="text-md text-gray-600 mb-1">{{ reviewDetail.memberNickName }} 고객님</p>
          <p class="text-sm text-gray-400">{{ formattedRegDate }}</p>
        </div>
        <div class="flex items-center text-lg text-midGreen">
          <font-awesome-icon class="text-[16px] mr-1 pt-[0.5px]" :icon="['fas', 'star']" />
          <span class="font-semibold">{{ reviewDetail.rating }}점</span>
        </div>
      </div>
    </div>

    <!-- 리뷰 내용 섹션 -->
    <div class="bg-white p-6 pb-20 rounded-lg border-b-[1px] border-gray-200">
      <div v-html="reviewDetail.content" class="text-gray-700 leading-relaxed"></div>
    </div>
  </div>

  <!-- 시공 정보 섹션 -->
  <div class="w-[800px] mx-auto bg-white p-6 mt-10 rounded-lg border-[1px] border-gray-200">
    <!-- 시공 업체 정보 -->
    <div class="border-b-[1px] border-gray-200 pb-4 mb-4">
      <h3 class="text-xl font-semibold text-gray-800 mb-3">시공 업체</h3>
      <p
        @click="this.$router.push(`/company/${reviewDetail.companyId}`)"
        class="px-2 text-md font-semibold cursor-pointer hover:text-midGreen"
      >
        {{ reviewDetail.companyName }}
      </p>
    </div>

    <!-- 나머지 시공 정보 -->
    <h3 class="text-xl font-semibold mb-4 text-gray-800">시공 정보</h3>
    <table class="w-full text-left text-gray-700">
      <tbody>
        <tr>
          <th class="px-2 py-2 text-gray-800">건물 종류</th>
          <td class="py-2 font-medium">{{ reviewDetail.buildingTypeName }}</td>
        </tr>
        <tr>
          <th class="px-2 py-2 text-gray-800">면적</th>
          <td class="py-2 font-medium">{{ reviewDetail.floor }}평</td>
        </tr>
        <tr>
          <th class="px-2 py-2 text-gray-800">시공 기간</th>
          <td class="py-2 font-medium">{{ schedule }}</td>
        </tr>
        <tr>
          <th class="px-2 py-2 text-gray-800">총 비용</th>
          <td class="py-2 font-medium">{{ reviewDetail.totalPrice }}만원</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
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
        reviewImageResponses: [],
      },
    };
  },

  components: {
    Swiper,
    SwiperSlide,
  },

  computed: {
    formattedRegDate() {
      if (!this.reviewDetail.regDate) return '';
      const date = new Date(this.reviewDetail.regDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    },
    schedule() {
      if (!this.reviewDetail.workStartDate || !this.reviewDetail.workEndDate) return '';
      const startDate = new Date(this.reviewDetail.workStartDate);
      const endDate = new Date(this.reviewDetail.workEndDate);
      const timeDiff = Math.abs(endDate - startDate);
      const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return dayDiff >= 7 ? `${Math.ceil(dayDiff / 7)}주 소요` : `${dayDiff}일 소요`;
    },
  },

  async mounted() {
    const userStore = useUserStore();
    const token = userStore.accessToken;
    const reviewId = this.$route.params.id;
    const reviewDetailRequest = await axios.get(`http://localhost:8080/api/reviews/${reviewId}`, {
      headers: { Authorization: token },
    });
    this.reviewDetail = reviewDetailRequest.data;
  },

  setup() {
    return {
      Navigation,
      Pagination,
    };
  },
};
</script>

<style scoped>
/* Swiper pagination and navigation styles */
.custom-swiper {
  --swiper-navigation-color: #4caf50; /* 화살표 색상을 midGreen으로 변경 */
  --swiper-pagination-color: #4caf50; /* Pagination의 기본 색상 변경 */
}

.swiper-button-next,
.swiper-button-prev {
  color: var(--swiper-navigation-color);
  /* 화살표 크기 조정 */
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.7); /* 살짝 투명한 배경 추가 */
  border-radius: 50%;
}

.swiper-pagination-bullet {
  background-color: var(--swiper-pagination-color);
  width: 12px;
  height: 12px;
  opacity: 1;
  transition: background-color 0.3s ease;
}

.swiper-pagination-bullet-active {
  background-color: #ff5722; /* 활성화된 pagination 색상을 주황색으로 변경 */
  width: 14px;
  height: 14px;
}

/* 화살표 hover 스타일 */
.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: #4caf50; /* hover 시 배경색을 midGreen으로 변경 */
  color: #fff;
}
</style>
