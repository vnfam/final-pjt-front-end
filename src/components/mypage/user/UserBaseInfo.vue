<template>
  <div class="max-w-lg mx-auto bg-white p-8 rounded-lg">
    <div class="flex flex-col justify-center items-center w-full mb-8">
      <div class="w-32 h-32">
        <img src="/imgs/bear.jpg" class="object-cover w-full h-full rounded-full shadow-lg" alt="Profile Image" />
      </div>
      <h2 class="text-2xl font-semibold mt-4">집다부셔</h2>
      <p class="text-sm text-gray-500">coguddlf@gmail.com</p>
    </div>

    <form action="#" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">이름</label>
        <input
          type="text"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="이름 입력"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">사용자명</label>
        <input
          type="text"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="사용자명 입력"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">아이디</label>
        <input
          type="text"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="아이디 입력"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">이메일</label>
        <input
          type="email"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="이메일 입력"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">비밀번호</label>
        <input
          type="password"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="비밀번호 입력"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
        <input
          type="password"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="비밀번호 확인"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">휴대전화</label>
        <input
          type="text"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="휴대전화 입력"
        />
      </div>

      <div class="flex justify-center">
        <button type="submit" class="px-6 py-3 bg-midGreen text-white font-medium rounded-md transition duration-300">
          수정
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
