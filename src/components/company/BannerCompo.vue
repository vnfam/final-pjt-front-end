<template>
  <div class="my-carousel mt-4">
    <swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :navigation="true"
      :pagination="{ clickable: true }"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      class="h-[200px] rounded-[8px]"
    >
      <swiper-slide>
        <img
          class="w-[1100px] object-cover"
          src="https://cf.zipdoc.co.kr/zws/res/assets/images/zipdoc_v35/common/banner_lx_long2.png"
          alt="banner1"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-[1100px] object-cover"
          src="https://cf.zipdoc.co.kr/zws/res/assets/images/zipdoc_v35/common/home-banner-pc-01.jpg"
          alt="banner2"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-[1100px] object-cover"
          src="https://cf.zipdoc.co.kr/zws/res/assets/images/zipdoc_v35/common/home-banner-pc-04.jpg"
          alt="banner3"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper';

export default {
  components: {
    Swiper,
    SwiperSlide,
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
