<template>
  <div class="p-4 max-w-screen-lg mx-auto">
    <div class="mb-6">
      <h3 class="font-bold text-2xl text-gray-800">멤버십 내역</h3>
    </div>
    <div class="flex-col">
      <!-- header -->

      <div class="mb-10 p-5 bg-white rounded-lg">
        <ul class="flex justify-between">
          <li>
            <div>
              <span class="mr-2">닉네임 님</span>
              <span
                class="border-solid border-2 border-secondary rounded-lg pl-1 pr-2 text-secondary whitespace-nowrap"
              >
                PREMIUM
              </span>
              <p>이메일</p>
              <p>멤버십 만료일</p>
            </div>
          </li>
          <li>
            <button
              @click="this.$router.push('/payment')"
              class="bg-midGreen text-white rounded-lg py-2 px-4 font-medium"
            >
              멤버십 가입
            </button>
            <p>1. 멤버십을 가입하지 않았을 때 - 멤버십 가입</p>
            <p>2. 멤버십을 가입하고 있을 때 - 멤버십 변경</p>
          </li>
        </ul>
      </div>
      <!-- center -->
      <div>
        <table class="table border-2 border-solid border-gray-300 border-collapse w-full">
          <thead>
            <tr>
              <th class="bg-gray-200 text-center p-2 whitespace-nowrap">멤버십명</th>
              <th class="bg-gray-200 text-center p-2 whitespace-nowrap">결제금액</th>
              <th class="bg-gray-200 text-center p-2 whitespace-nowrap">서비스 내용</th>
              <th class="bg-gray-200 text-center p-2 whitespace-nowrap">이용기간</th>
              <th class="bg-gray-200 text-center p-2 whitespace-nowrap">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">PREMIUM</td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">150원</td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
                광고 혜택이 주어지는 멤버십
              </td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
                2024-09-08 ~ 2024-10-07
              </td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">구독중</td>
            </tr>
            <tr>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">PREMIUM</td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">150원</td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
                광고 혜택이 주어지는 멤버십
              </td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
                2024-08-09 ~ 2024-09-07
              </td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">만료</td>
            </tr>
            <tr>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">BASIC</td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">100원</td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">가장 기본적인 멤버십</td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
                2024-07-10 ~ 2024-08-08
              </td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">만료</td>
            </tr>
            <tr>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">BASIC</td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">100원</td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">가장 기본적인 멤버십</td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
                2024-06-09 ~ 2024-07-09
              </td>
              <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">만료</td>
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
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
th {
  border-bottom: 2px solid gray;
}
</style>
