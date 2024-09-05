<template>
  <div class="p-4 flex items-center justify-start shadow">
    <div class="mr-10">
      <p class="text-midGreen font-medium text-[14px]">지역</p>
      <div class="flex-column justify-start items-center font-medium text-[16px]">
        <font-awesome-icon class="mr-2" :icon="['fas', 'location-dot']" />
        <span>서울 강남구</span>
      </div>
    </div>

    <div class="mr-3 w-[1px] h-[32px] bg-[#ddd]"></div>

    <div class="mr-10">
      <p class="text-midGreen font-medium text-[14px]">유형</p>
      <div class="flex-column justify-start items-center font-medium text-[16px]">
        <span>주거 인테리어</span>
      </div>
    </div>

    <div class="mr-3 w-[1px] h-[32px] bg-[#ddd]"></div>

    <div class="mr-10">
      <p class="text-midGreen font-medium text-[14px]">시공</p>
      <div class="flex-column justify-start items-center font-medium text-[16px]">
        <span>종합시공</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
