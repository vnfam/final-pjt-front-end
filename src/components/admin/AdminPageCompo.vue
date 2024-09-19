<template>
  <div class="h-full flex justify-between">
    <!-- 메뉴바 -->
    <div class="w-1/4 px-12 my-20 border-r-4 border-indigo-500 text-xl">
      <h2 class="text-lg font-semibold mb-4">관리자페이지</h2>
      <ul class="flex-col">
        <li class="mb-7">
          <!-- <router-link to="companyInfo" activeClass="bg-gray-200" class="block p-2 w-full rounded hover:bg-gray-200">업체 정보</router-link> -->
          <button class="bg-gray-200 rounded-md p-5 w-full">업체 정보</button>
        </li>
        <li class="mb-7">
          <!-- <router-link to="memberInfo" activeClass="bg-gray-200" class="block p-2 w-full rounded hover:bg-gray-200">고객 정보</router-link> -->
          <button class="bg-gray-200 rounded-md p-5 w-full">고객 정보</button>
        </li>
        <li>
          <!-- <router-link to="evntInfo" activeClass="bg-gray-200" class="block p-2 w-full rounded hover:bg-gray-200">이벤트 정보</router-link> -->
          <button class="bg-gray-200 rounded-md p-5 w-full">이벤트 정보</button>
        </li>
      </ul>
    </div>
    <!-- 업체 정보-멤버십, 시공사례 -->
    <!-- <div class="w-3/4 mx-10 my-20 rounded-md border-solid border-2 border-indigo-600 p-10 text-xl">
      <ul>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">업체명</label>
          <p class="w-4/5 px-10">뚝딱뚝딱업체</p>
        </li>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">멤버십 종류</label>
          <p class="w-4/5 px-10">Basic</p>
        </li>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">가입 날짜</label>
          <p class="w-4/5 px-10">24.07.02</p>
        </li>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">상담 수</label>
          <p class="w-4/5 px-10">8건</p>
        </li>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">시공 수</label>
          <p class="w-4/5 px-10">2건</p>
        </li>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">평점</label>
          <p class="w-4/5 px-10"><font-awesome-icon class="text-midGreen" :icon="['fas', 'star']" />&nbsp; 5.0점</p>
        </li>
      </ul>
    </div> -->
    <!-- 고객 정보- -->
    <!-- <div class="w-3/4 mx-10 my-20 rounded-md border-solid border-2 border-indigo-600 p-10 text-xl">
      <ul>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">고객명</label>
          <p class="w-4/5 px-10">전대용</p>
        </li>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">이메일</label>
          <p class="w-4/5 px-10">example@gmail.com</p>
        </li>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">닉네임</label>
          <p class="w-4/5 px-10">모요</p>
        </li>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">가입 날짜</label>
          <p class="w-4/5 px-10">24.09.10</p>
        </li>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">시공 수</label>
          <p class="w-4/5 px-10">2건</p>
        </li>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">상담 수</label>
          <p class="w-4/5 px-10">15건</p>
        </li>
        <li class="flex">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">후기 수</label>
          <p class="w-4/5 px-10">1건</p>
        </li>
      </ul>
    </div> -->
    <!-- 이벤트에서 보일 내용 -->
  </div>
</template>

<script>
export default {};
</script>

<style></style>
