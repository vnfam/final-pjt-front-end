<template>
  <div class="flex flex-col justify-center items-center w-full h-50 mb-6">
    <div class="w-60 h-60">
      <img src="/imgs/bear.jpg" class="object-fill w-full h-full rounded-full" />
    </div>
    <div class="text-2xl font-bold">
      <h2>집다부셔</h2>
    </div>
    <div class="text-sm">coguddlf@gmail.com</div>
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
</template>

<script>
export default {};
</script>

<style></style>
