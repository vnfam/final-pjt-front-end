<template>
  <div class="p-4 flex items-center justify-start shadow">
    <div class="mr-10">
      <p class="text-midGreen font-medium text-[14px]">지역</p>
      <div class="flex-column justify-start items-center font-medium text-[16px]">
        <font-awesome-icon class="mr-2" :icon="['fas', 'location-dot']" />
        <span>{{ this.selectedRegion }}</span>
      </div>
    </div>

    <div class="mr-3 w-[1px] h-[32px] bg-[#ddd]"></div>

    <div class="mr-10">
      <p class="text-midGreen font-medium text-[14px]">유형</p>
      <div class="flex-column justify-start items-center font-medium text-[16px]">
        <span>주거 인테리어</span>
      </div>
    </div>

    <div class="mr-10">
      <p class="text-midGreen font-medium text-[14px]">시공</p>
      <div class="flex-column justify-start items-center font-medium text-[16px]">
        <span>종합시공</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRegion: '서울 강남구',
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    toggleSeoul() {
      this.isSeoulOpen = !this.isSeoulOpen; // 서울 아코디언 열기/닫기
    },
    selectRegion(region) {
      this.selectedRegion = region;
      this.isOpen = false; // 선택 후 드롭다운 닫기
    },
    selectType() {
      // 유형 선택 시 로직 추가
    },
    confirmSelection() {
      // 확인 버튼을 눌렀을 때의 로직 (예: API 호출)
      alert(`선택한 지역: ${this.selectedRegion}`);
    },
  },
};
</script>

<style></style>
