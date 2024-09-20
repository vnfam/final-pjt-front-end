<template>
  <div class="h-full">
    <div>
      <h2 class="text-2xl font-semibold px-14 pt-10">관리자페이지</h2>
    </div>
    <div class="flex">
      <!-- 메뉴바 -->
      <div class="w-1/4 px-12 my-20 border-r-4 border-indigo-500 text-xl">
        <ul class="flex-col">
          <li class="mb-7 relative">
            <button class="flyoutMenu bg-gray-200 rounded-md p-5 w-full cursor-pointer">업체 관리</button>
            <!-- 소제목 메뉴 -->
            <div
              class="hover-menu absolute left-0 hidden bg-white border border-gray-300 shadow-lg py-5 px-2 z-10 none top-full w-full shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
            >
              <ul class="list-none p-0 m-0">
                <li class="mb-2">
                  <router-link to="companyMembershipList" activeClass="bg-gray-200" class="w-full text-left"
                    >멤버십 관리</router-link
                  >
                  <!-- <button class="w-full text-left">멤버십 관리</button> -->
                </li>
                <li>
                  <router-link to="companyPortfolioManagement" activeClass="bg-gray-200" class="w-full text-left"
                    >시공 사례 관리</router-link
                  >
                  <!-- <button class="w-full text-left">시공 사례 관리</button> -->
                </li>
              </ul>
            </div>
          </li>
          <li class="mb-7 relative">
            <button class="flyoutMenu bg-gray-200 rounded-md p-5 w-full cursor-pointer">고객 관리</button>
            <!-- 소제목 메뉴 -->
            <div
              class="hover-menu absolute left-0 hidden bg-white border border-gray-300 shadow-lg py-5 px-2 z-10 none top-full w-full shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
            >
              <ul class="list-none p-0 m-0">
                <li>
                  <router-link to="memberReviewManagement" activeClass="bg-gray-200" class="w-full text-left"
                    >시공 후기 관리</router-link
                  >
                  <!-- <button class="w-full text-left">시공 후기 관리</button> -->
                </li>
              </ul>
            </div>
          </li>
          <li class="relative">
            <button class="flyoutMenu bg-gray-200 rounded-md p-5 w-full cursor-pointer">플랫폼 관리</button>
            <!-- 소제목 메뉴 -->
            <div
              class="hover-menu absolute left-0 hidden bg-white border border-gray-300 shadow-lg py-5 px-2 z-10 none top-full w-full shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
            >
              <ul class="list-none p-0 m-0">
                <li class="mb-2">
                  <router-link to="plateformEventManagement" activeClass="bg-gray-200" class="w-full text-left"
                    >공지 사항 관리</router-link
                  >
                  <!-- <button class="w-full text-left">공지 사항 관리</button> -->
                </li>
                <li class="mb-2">
                  <router-link to="plateformFAQManagement" activeClass="bg-gray-200" class="w-full text-left"
                    >FAQ 관리</router-link
                  >
                  <!-- <button class="w-full text-left">FAQ 관리</button> -->
                </li>
                <li>
                  <router-link to="plateformAskManagement" activeClass="bg-gray-200" class="w-full text-left"
                    >1:1 문의 관리</router-link
                  >
                  <!-- <button class="w-full text-left">1:1 문의 관리</button> -->
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- 메뉴에 따른 내용 -->
      <div class="w-3/4 mx-10 my-20 rounded-md border-solid border-2 border-indigo-600 p-10 text-xl">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
    };
  },
};
</script>

<style>
.flyoutMenu {
  border: 1px solid #ccc;
}

.hover-menu {
  border: 1px solid #ccc;
}

.hover-menu li {
  /* 굳이 하나하나 넣기 그래서 */
  padding: 10px;
  background-color: white;
}

.flyoutMenu:hover + .hover-menu,
.hover-menu:hover {
  display: block;
}

.hover-menu li:hover {
  background-color: #f1f1f1;
}
</style>
