<template>
  <div class="mt-5 bg-neutral text-center text-sans">
    <div class="relative my-100 max-w-auto m-0 p-0 min-h-[220px]">
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-3xl py-8 self-center">로그인</h1>
        <!-- 로그인 폼 -->
        <form @submit.prevent="submitForm" class="text-xl bg-[#F9FAFB] p-10 rounded-md border-solid border-2 border-indigo-600 mb-7">
          <div class="inputAccount flex flex-col gap-5">
            <!-- 아이디 -->
            <div class="inputEmail m-0 p-0 align-baseline">
              <label for="email" class="block text-sm font-medium mb-2">ID</label>
              <div class="relative flex">
                <input type="text" id="email" autofocus placeholder="이메일을 입력해주세요" class="p-3 rounded border-1 border-solid text-base w-full h-12 resize-none
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                <!-- outline-none -->
              </div>
            </div>
            <!-- 비밀번호 -->
            <div>
              <label for="password" class="block text-sm font-medium mb-2">PW</label>
              <div class="relative flex">
                <input type="text" id="email" autofocus placeholder="비밀번호를 입력해주세요" class="p-3 rounded border-1 border-solid text-base w-full resize-none
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
              </div>
            </div>
            <!-- 버튼 -->
              <button class="emailLoginBtn hover:bg-[#2C7130] inline-block font-medium text-center border-1 border-solid cursor-pointer select-none duration-0 ease-in-out text-neutral bg-midGreen px-3 py-3 text-base rounded" type="submit">이메일 로그인</button>
          </div>
          <!-- 위 버튼과 다른 기능을 하다보니 div를 나눔 -->
          <div class="findOrsignup flex gap-5 justify-center items-center mt-12 mb-32">
            <a href="" class="findEmailBtn hover:text-midGreen text-[#737373] text-sm py-1 cursor-pointer">이메일 찾기</a>
            <div class="w-px min-h-3 bg-[#E1E1E1]"></div>
            <a href="" class="findPasswordBtn hover:text-midGreen text-[#737373] text-sm py-1 cursor-pointer">비밀번호 찾기</a>
            <div class="w-px min-h-3 bg-[#E1E1E1]"></div>
            <a href="" class="signupBtn hover:text-midGreen text-[#737373] text-sm py-1 cursor-pointer">비밀번호 찾기</a>
          </div>
          <!-- 소셜로그인 -->
          <div class="flex flex-col gap-3 mt-4 mb-3">
            <button type="button" class="naverLoginBtn"></button>
            <!-- <div class="naverLogin"></div> -->
            <NaverLoginCompo />
            <div class="kakaoLogin"><a href="http://localhost:8080/oauth2/authorization/naver">로그인</a></div>
          
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NaverLoginCompo from './NaverLoginCompo.vue';

export default {
  components: {
    NaverLoginCompo,
  },
  methods: {
    submitForm() {
    },
  },
};
</script>

<style scoped>
button:hover {
    color: #000000;
    font-weight: bold;
}

.emailLogin {
  transition-property: color, border-color, background-color;
  transition-duration: 0.15s;
}

.emailLoginbtn {
  width: initial;
}
</style>