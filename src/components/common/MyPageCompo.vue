<template>
  <div class="container mx-auto p-6">
    <!-- Sidebar -->
    <div class="flex max-w-7xl">
      <div class="w-1/4 bg-white shadow-md rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">마이페이지</h2>
        <ul>
          <li class="mb-2">
            <a href="#" class="block p-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300">기본정보</a>
          </li>
          <li class="mb-2">
            <a href="#" class="block p-2 rounded hover:bg-gray-200">견적내역</a>
          </li>
          <li class="mb-2">
            <a href="#" class="block p-2 rounded hover:bg-gray-200">상담내역</a>
          </li>
          <li class="mb-2">
            <a href="#" class="block p-2 rounded hover:bg-gray-200">후기내역</a>
          </li>
          <li>
            <a href="#" class="block p-2 rounded hover:bg-gray-200">북마크내역</a>
          </li>
        </ul>
      </div>
      <!-- Main Content -->

      <div class="w-3/4 bg-white shadow-md rounded-lg p-6 ml-4">
        <div class="flex justify-center mb-6">
          <div class="w-24 h-24 bg-red-200"></div>
        </div>
        <form action="#" class="space-y-4">
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">이름</label>
              <input
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="이름 입력"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">사용자명</label>
              <input
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="사용자명 입력"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">아이디</label>
              <input
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="아이디 입력"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">이메일</label>
              <input
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="이메일 입력"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">비밀번호</label>
              <input
                type="password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="비밀번호 입력"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
              <input
                type="password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="비밀번호 확인"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">휴대전화</label>
              <input
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="휴대전화 입력"
              />
            </div>
          </div>
          <div class="flex justify-center">
            <button type="submit" class="px-6 py-2 bg-blue-600 text-black rounded-md hover:bg-blue-700">수정</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
