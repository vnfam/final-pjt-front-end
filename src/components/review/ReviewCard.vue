<template>
  <!-- 전체 리뷰 공간 -->
  <div @click="goToDetailPage" class="w-[353px] h-[354px] border-solid border-[1px] border-[#eee] rounded-[8px] cursor-pointer border-box hover:shadow-md">
    <!-- 이미지 공간 -->
    <div class="w-100 h-[198px] border-solid border-b-[1px] border-[#eee]">
      <img
        class="w-full h-full rounded-t-lg object-cover"
        :src="review.reviewLogoUrl"
        @error="onImageError"
        alt="AD Img"
      />
    </div>
    <!-- 리뷰 공간 -->
    <div class="bg-white h-[154px] px-3 pt-2 pb-4 rounded-b-lg">
      <!-- 제목 (변경 필요) -->
      <div class="mb-2 flex justify-between items-center">
        <p class="text-[16px] font-bold text-[#1d1d1d] leading-[24px] tracking-[-0.5px]">{{ review.title }}</p>
      </div>
      <!-- 주거형태, 평수, 시공기간 (변경 필요) -->
      <div class="mb-3 flex justify-between items-center">
        <span class="text-[13px] font-medium text-[#555] leading-[16px] tracking-[-0.3px]">주거형태 {{ review.spaceType }}건 | 평수 {{ review.space }}평 | 시공기간 {{ review.serviceDate }}</span>
        <!-- 평점 -->
        <span class="text-[13px] font-normal text-[#555] leading-[16px] tracking-[-0.3px] flex items-center">
          <font-awesome-icon class="text-midGreen" :icon="['fas', 'star']" />&nbsp;{{ review.rating }}
        </span>
      </div>
      <!-- 글내용 -->
      <div class="mb-2 h-[40px]">
        <p class="text-[14px] font-normal text-[#555] leading-[20px] tracking-[-0.5px]">
          {{ review.content }}
        </p>
      </div>
      <!-- 클라이언트명, 게시일 (추가 필요) -->
      <div class="mb-2 h-[40px]">
        <p class="text-[14px] font-normal text-[#555] leading-[20px] tracking-[-0.5px]">
          {{ review.memberName }}고객님 | {{ review.regDate }}
        </p>
      </div>
        <div class="flex items-center justify-between">
          <!-- 시공 서비스 -->
          <div class="flex items-center gap-[4px]">
            <div
              v-for="(service, index) in visibleServices"
              :key="index"
              class="bg-[#f1f2f3] whitespace-nowrap rounded-[40px] h-[24px] text-[12px] font-normal leading-[16px] tracking-[-0.3px] px-2 py-1">
              {{ service }}
            </div>
          </div>
          더보기
        </div>
    </div>
  </div >
</template>
<script>
export default{
  props: {
    review: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    visibleServices() {
      // 첫 3개의 서비스만 보여주기
      return this.review.services.slice(0, 4);
    },
  },
  methods: {
    goToDetailPage() {
      this.$router.push(`/review/${this.review.id}`);
    },
    // 이렇게 사용하는 이유는 이미지 url이 있지만 이미지 로드 실패시 처리할 수 있도록
    // ex) 네트워크 실패, 이미지가 손상됨
    onImageError(event) {
      event.target.src = require('@/assets/replaceHouse.png');
    }
  },
}
</script>
<style scoped>
</style>