<template>
  <div
    @click="goToDetailPage"
    class="w-[353px] h-[360px] border border-[#eee] rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300 ease-in-out bg-white overflow-hidden"
  >
    <!-- 이미지 섹션 -->
    <div class="relative w-full h-[200px] bg-gray-100">
      <img
        class="w-full h-full object-cover"
        :src="portfolio.imageUrl ? portfolio.imageUrl : require('@/assets/logo.png')"
        alt="대표이미지"
      />
      <!-- 이미지 위에 오버레이 효과 (옵션) -->
      <div
        class="absolute inset-0 bg-black bg-opacity-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
      ></div>
    </div>

    <!-- 정보 섹션 -->
    <div class="p-4">
      <!-- 제목 -->
      <h2 class="text-lg font-semibold text-gray-800 mb-2 truncate">{{ portfolio.title }}</h2>
      <!-- 프로젝트 면적 및 위치 -->
      <p class="text-sm text-gray-600 mb-1">
        <span class="font-semibold">{{ portfolio.floor }}</span
        >평
      </p>
      <p class="text-sm text-gray-600 mb-3 truncate">{{ portfolio.projectLocation }}</p>
      <!-- 건물 타입 -->
      <p class="text-sm text-gray-700 font-medium">{{ portfolio.buildingType }}</p>
    </div>

    <!-- 더보기 버튼 -->
    <div class="p-4 flex justify-end">
      <button
        class="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg transition-colors duration-200"
      >
        자세히 보기
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    portfolio: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  methods: {
    goToDetailPage() {
      this.$router.push(`/portfolio/${this.portfolio.id}`);
    },
  },
};
</script>

<style></style>
