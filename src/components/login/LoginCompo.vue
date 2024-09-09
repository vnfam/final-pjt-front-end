<template>
  <div class="mt-5 bg-neutral text-center text-sans">
    <div class="relative my-100 max-w-auto m-0 p-0 min-h-[220px]">
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-3xl py-8 self-center">로그인</h1>
        <!-- 로그인 폼 -->
        <form @submit.prevent="loginForm" class="text-xl bg-[#F9FAFB] p-10 rounded-md border-solid border-2 border-indigo-600 mb-7">
          <div class="inputAccount flex flex-col gap-5">
            <!-- 아이디 -->
            <div class="inputEmail m-0 p-0 align-baseline">
              <label for="email" class="block text-sm font-medium mb-2">ID</label>
              <div class="relative flex">
                <input type="text" v-model="email" autofocus placeholder="example@gmail.com" class="p-3 rounded border-1 border-solid text-base w-full h-12 resize-none
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                <p v-if="errors.email" class="text-red text-[12px] mt-2">{{ errors.email }}</p>
              </div>
            </div>
            <!-- 비밀번호 -->
            <div>
              <label for="password" class="block text-sm font-medium mb-2">PW</label>
              <div class="relative flex">
                <input type="text" v-model="password" autofocus placeholder="example1234" class="p-3 rounded border-1 border-solid text-base w-full resize-none
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                <p v-if="errors.password" class="text-red text-[12px] mt-2">{{ errors.password }}</p>
              </div>
            </div>
            <!-- 버튼 -->
              <button @click="loginAccount" class="emailLoginBtn hover:bg-[#2C7130] inline-block font-medium text-center border-1 border-solid cursor-pointer select-none duration-0 ease-in-out text-neutral bg-midGreen px-3 py-3 text-base rounded" type="submit">이메일 로그인</button>
          </div>
          <!-- 위 버튼과 다른 기능을 하다보니 div를 나눔 -->
          <div class="findOrsignup flex gap-5 justify-center items-center mt-6 mb-10">
            <a href="" class="findEmailBtn hover:text-midGreen text-[#737373] text-sm py-1 cursor-pointer">이메일 찾기</a>
            <div class="w-px min-h-3 bg-[#E1E1E1]"></div>
            <a href="" class="findPasswordBtn hover:text-midGreen text-[#737373] text-sm py-1 cursor-pointer">비밀번호 찾기</a>
            <div class="w-px min-h-3 bg-[#E1E1E1]"></div>
            <a href="" class="signupBtn hover:text-midGreen text-[#737373] text-sm py-1 cursor-pointer">비밀번호 찾기</a>
          </div>
          <!-- 소셜로그인 -->
          <div class="flex flex-col gap-3 mt-4 mb-3">
            <button type="button" class="naverLoginBtn font-medium text-center border border-solid cursor-pointer select-none ease-in-out px-3 py-3 text-base rounded-s w-full bg-[#03c75a] border-[#03c75a] text-white flex items-center justify-center">
              <img alt="네이버 로고" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" class="css-1oxvs31 e1rypd771" style="color:transparent" srcset="https://assets.cdn.soomgo.com/icons/icon-login-naver-btn.svg?w=32&amp;q=75 1x, https://assets.cdn.soomgo.com/icons/icon-login-naver-btn.svg?w=48&amp;q=75 2x" src="https://assets.cdn.soomgo.com/icons/icon-login-naver-btn.svg?w=48&amp;q=75">
              <a data-v-12dd5d6d="" href="http://localhost:8080/oauth2/authorization/naver">네이버로 시작</a>
            </button>
            <button type="button" class="kakaoLoginBtn font-medium text-center border border-solid cursor-pointer select-none ease-in-out px-3 py-3 text-base rounded-s w-full bg-[#fee500] border-[#fee500] text-black flex items-center justify-center">
              <img alt="카카오 로고" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" class="css-1oxvs31 e1q08h1" style="color:transparent" srcset="https://assets.cdn.soomgo.com/icons/icon-login-kakaotalk-btn.svg?w=32&amp;q=75 1x, https://assets.cdn.soomgo.com/icons/icon-login-kakaotalk-btn.svg?w=48&amp;q=75 2x" src="https://assets.cdn.soomgo.com/icons/icon-login-kakaotalk-btn.svg?w=48&amp;q=75">
              <span>카카오로 시작</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {},
    };
  },
  methods: {
    checkEmail() {
      // 이메일 형식 검증
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.errors.email = '이메일을 입력해주세요.';
      } else if (!emailPattern.test(this.email)) {
        this.errors.email = '유효한 이메일 형식을 입력해주세요.';
      } else {
        delete this.errors.email;
      }
    },
    checkPassword() {
      // 비밀번호 검증
      if (!this.password) {
        this.errors.password = '비밀번호를 입력해주세요.';
      } else if (this.password.length < 6) {
        this.errors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
      } else {
        delete this.errors.password;
      }
    },
    async loginForm() {
      // 이메일과 비밀번호 검증
      this.checkEmail();
      this.checkPassword();
    },
    async loginAccount() {
      // 에러가 없을 경우 로그인 시도
      if (Object.keys(this.errors).length === 0) {
        const loginData = {
          email: this.email,
          password: this.password,
        };
        // 서버 요청
        try {
          const response = await axios.get('/api/login', loginData);
          if (response.data.success) {
            alert('로그인 성공');
            // 로그인 성공 시 원하는 페이지로 이동
            this.$router.push('/dashboard');
          } else {
            alert('로그인 실패: ' + response.data.message);
          }
        } catch (error) {
          console.error('로그인 오류:', error);
          alert('서버 오류가 발생했습니다.');
        }
      } else {
        alert('입력 정보를 다시 확인해주세요');
      }
    }
  },
};
</script>

<style scoped>
.emailLoginBtn {
  transition-property: color, border-color, background-color;
  transition-duration: 0.15s;
}

.naverLoginBtn,
.kakaoLoginBtn {
  transition-property: color, border-color, background-color;
  transition-duration: 0.15s;
}
</style>