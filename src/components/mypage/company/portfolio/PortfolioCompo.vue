<template>
  <div class="flex bg-white rounded-lg p-4 space-x-4 border-[1px] border-gray-200 mb-4">
    <div class="basis-1/3 flex justify-center items-center">
      <div class="w-40 h-40 rounded-full bg-gray-100 overflow-hidden">
        <img src="/imgs/bear.jpg" alt="대표사진" class="w-full h-full object-cover" />
      </div>
    </div>

    <div class="basis-2/3 flex flex-col justify-between">
      <div class="text-lg font-semibold text-gray-800 text-center mb-2">시공 사례 제목</div>
      <div class="text-md text-gray-600 text-center mb-2">파트너</div>
      <div class="text-sm text-gray-500 text-center">
        여기에는 시공 사례 내용의 일부가 들어갑니다. 시공 사례의 전체 내용은 자세히 보기에서 확인할 수 있습니다.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
};
</script>

<style scoped></style>
