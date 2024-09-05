<template>
  <header class="flex justify-between items-center">
    <div class="flex justify-between items-center">
      <img @click="$router.push('/')" class="w-[90px] cursor-pointer mr-8" src="@/assets/logo.png" alt="로고" />
      <div class="flex">
        <p
          class="cursor-pointer mr-7 text-[16px] font-semibold"
          :class="{ 'text-midGreen font-bold': isHomePage, 'hover:text-midGreen': !isHomePage }"
        >
          리모델링파트너
        </p>
        <p class="cursor-pointer mr-7 text-[16px] font-semibold hover:text-midGreen">시공사례</p>
        <p class="cursor-pointer mr-7 text-[16px] font-semibold hover:text-midGreen">시공후기</p>
      </div>
    </div>

    <div class="flex">
      <p
        @click="$router.push('/login')"
        class="cursor-pointer text-[16px] font-semibold mr-8"
        :class="{ 'text-midGreen': isLoginPage, 'hover:text-midGreen': !isLoginPage }"
      >
        로그인
      </p>
      <p
        @click="$router.push('/memberSignup')"
        class="cursor-pointer text-[16px] font-semibold"
        :class="{ 'text-midGreen': isSignupPage, 'hover:text-midGreen': !isSignupPage }"
      >
        회원가입
      </p>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    },
    isLoginPage() {
      return this.$route.path === '/login';
    },
    isSignupPage() {
      return this.$route.path === '/memberSignup' || this.$route.path === '/companySignup';
    },
  },
};
</script>

<style></style>
