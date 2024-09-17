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
      <h2 class="text-2xl font-bold p-4">{{ review.title }}타이틀 최고의 보금자리를 선물 받았습니다.</h2>
      <ul class="flex flex-row justify-between my-5 text-lg">
        <ul class="pl-40">
          업체정보
          <li class="mt-3">{{ review.rating }}5.0점</li>
          <li>{{ review.companyName }}HS디자인</li>
          <li>{{ review.constructionType }}도배 / 샷시</li>
          <li>2주</li>
        </ul>
        <ul class="pr-40">
          고객정보
          <li class="mt-3">{{ review.memberName }}전대만고객</li>
          <li>{{ review.buildingType }}아파트 / {{ review.floor }} 32평</li>
          <li>{{ review.totalPrice }}3,000만원대</li>
          <li>{{ review.regDate }}2024.09.11</li>
        </ul>
      </ul>
    </div>

    <div>
      <p class="my-10 text-lg">
        {{ review.content }}
        20년 된 30평대 아파트 계약으로 인테리어 계획을 잡았어요. 분양시 인테리어를 유지한 듯한 모습에 올수리를 결정.
        몇군데 업체의 견적을 받았어요. 하고 싶은 인테리어는 많았으나, 예산에 맞춰 올수리를 해야하는 상황이라 가성비를
        중점으로 업체 선정을 해야 했고, 그중 HS 디자인과 계약을 했습니다. 우선 가장 합리적인 견적 금액이였고, 무엇보다
        사장님께서 목수 기술자셔서 신뢰를 갖고 진행하게 됐습니다. 현 거주지와 이사할 집이 가까워서 인테리어 진행하는
        동안 퇴근하고 거의 매일 갔어요. 이쁘게 꾸며질 내집에 대한 기대감과 설레임에 매일 가게 되더군요. 그러다보니
        하고싶은 인테리어가 하나둘씩 더 생기더라구요. 사장님께는 죄송했지만 지금이 아니면 못한다는 생각에 많은 추가
        요청을 드렸어요. 사장님께선 단 한번의 싫은 내색 없이 기술자답게 직접 뚝딱뚝딱 처리해 주시더라구요. 그렇게 시간이
        흘러 처음 계획했던 것보다 훨씬 이쁘고, 마음에 드는 저희 가족의 보금자리가 완성 됐습니다. 밝은 조명의 거실.
        홈카페 분위기의 거실 베란다 안방 가벽 설치로 드레스룸 완성. 초등학생 아이를 위한 방. 강아지를 위한 펫도어 거실,
        안방 화장실 그리고 거실과 방 실링팬까지 완벽하게 만들어 주셨어요 무더운 여름에도 고생하신 사장님 너무
        감사드립니다.
      </p>
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

export default {
  async mounted() {
    const reviewId = this.$route.params.id;
    const detail = await axios.get(`http://localhost:8080/api/reviews/${reviewId}`);
    console.log(detail);
  },

  data() {
    return {
      review: {
        title: '',
        rating: '',
        companyName: '',
        constructionType: '',
        memberName: '',
        floor: '',
        totalPrice: '',
        regDate: '',
        content: '',
      },
    };
  },

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

<style scoped>
.my-carousel {
  display: flex;
}
</style>
