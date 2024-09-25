<template>
  <div class="flex-col">
    <!-- header -->
    <div class="mb-10 p-5 bg-white rounded-lg">
      <h2 class="font-semibold text-xl mb-4">시공사례 관리</h2>
      <ul class="flex gap-4">
        <li>
          <label for="" class="font-medium">현재 총 시공 사례수</label>
          <p class="text-red">4명</p>
        </li>
        <li>
          <label for="" class="font-medium">현재 등록된 시공 사례수</label>
          <p class="text-red">4개</p>
        </li>
      </ul>
    </div>
    <!-- center -->
    <div>
      <table class="table border-2 border-solid border-gray-300 border-collapse w-full">
        <thead>
          <tr>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">번호</th>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">제목</th>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">업체명</th>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">고객명</th>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">게시일</th>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">상세보기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">1</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
              편안하고 심플한 화이트&블랙 스타일
            </td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">부자업체</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">김선우</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">24.09.29</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
              <button
                class="px-2 rounded-lg whitespace-nowrap bg-gray-200 cursor-pointer hover:bg-gray-300"
                @click="$router.push('adminCompanyPortfolioDetail')"
              >
                상세보기
              </button>
            </td>
          </tr>
          <tr>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">2</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
              따뜻하고 편안한 분위기 24평
            </td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">프리미엄업체</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">몰랑이</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">24.09.20</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
              <button
                class="px-2 rounded-lg whitespace-nowrap bg-gray-200 cursor-pointer hover:bg-gray-300"
                @click="$router.push('adminCompanyPortfolioDetail')"
              >
                상세보기
              </button>
            </td>
          </tr>
          <tr>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">3</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
              설레이는 신혼부부의 첫시작
            </td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">뚝딱뚝딱업체</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">토심이와토뭉이</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">24.9.17</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
              <button
                class="px-2 rounded-lg whitespace-nowrap bg-gray-200 cursor-pointer hover:bg-gray-300"
                @click="$router.push('adminCompanyPortfolioDetail')"
              >
                상세보기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- footer -->
    <div class="mt-5">
      <vue-paginate
        :model-value="page"
        :page-count="20"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        prev-text="<"
        next-text=">"
        :container-class="'flex justify-center font-sans cursor-pointer'"
        :page-link-class="'m-3 hover:bg-accent '"
        :prev-link-class="'m-3'"
        :next-link-class="'m-3'"
        active-class="bg-accent rounded-md"
        @update:model-value="page = $event"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { VuePaginate } from '@svifty7/vue-paginate';

export default defineComponent({
  components: {
    VuePaginate,
  },
  setup() {
    const pageSize = ref(10);

    const clickCallback = (pageNum) => {
      console.log(pageNum);
    };

    return {
      pageSize,
      clickCallback,
    };
  },
});
</script>

<style scoped>
th {
  border-bottom: 2px solid gray;
}
</style>
