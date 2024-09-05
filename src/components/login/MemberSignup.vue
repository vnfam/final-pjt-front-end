<template>
  <div class="w-90 mx-auto">
    <div>
      <p class="text-2xl font-semibold text-center pb-4">회원가입</p>
      <div class="w-100 text-center">
        <RouterLink to="companySignup" class="text-center text-[13px] text-gray-700"
          >업체 등록을 원하신다면? <span class="underline hover:text-midGreen">업체 등록하기</span></RouterLink
        >
      </div>

      <form @submit.prevent="validateForm" class="w-[500px] px-10 py-4 pb-20 mx-auto">
        <div class="mb-[12px]">
          <label for="email" class="text-[14px] font-normal mb-4">이메일</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="email"
              @blur="validateEmail"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="email"
              placeholder="이메일을 입력해 주세요."
              required
            />
            <button
              @click.prevent="verifyEmail"
              class="bg-midGreen text-white text-[14px] h-[52px] rounded-[4px] w-[90px] ml-2"
            >
              중복확인
            </button>
          </div>
          <p v-if="errors.email" class="text-red text-[12px] mt-2">{{ errors.email }}</p>
          <p v-if="emailVerified" class="text-confirm text-[12px] mt-2">사용 가능한 이메일입니다.</p>
        </div>

        <div class="mb-[12px]">
          <label for="password" class="text-[14px] font-normal mb-4"
            >비밀번호
            <span class="text-[10px] text-[#bbb] leading-[14px]">(10~16자, 영문/숫자/특수문자 조합)</span></label
          >
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="password"
              @blur="validatePassword"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              required
            />
          </div>
          <p v-if="errors.password" class="text-red text-[12px] mt-2">{{ errors.password }}</p>
        </div>

        <div class="mb-[12px]">
          <label for="confirmPassword" class="text-[14px] font-normal mb-4">비밀번호 확인</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="confirmPassword"
              @blur="validateConfirmPassword"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="password"
              placeholder="비밀번호를 한 번 더 입력해 주세요."
              required
            />
          </div>
          <p v-if="errors.confirmPassword" class="text-red text-[12px] mt-2">{{ errors.confirmPassword }}</p>
          <p v-if="passwordsMatch && !errors.confirmPassword" class="text-confirm text-[12px] mt-2">
            비밀번호가 일치합니다.
          </p>
        </div>

        <div class="mb-[12px]">
          <label for="name" class="text-[14px] font-normal mb-4"
            >이름
            <span class="text-[10px] text-[#bbb] leading-[14px]">(2자 이상)</span>
          </label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="name"
              @blur="validateName"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="text"
              placeholder="이름을 입력해 주세요."
              required
            />
          </div>
          <p v-if="errors.name" class="text-red text-[12px] mt-2">{{ errors.name }}</p>
        </div>

        <div class="mb-[12px]">
          <label for="nickname" class="text-[14px] font-normal mb-4"
            >닉네임
            <span class="text-[10px] text-[#bbb] leading-[14px]">(2자 이상)</span>
          </label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="nickname"
              @blur="validateNickname"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="text"
              placeholder="닉네임을 입력해 주세요."
              required
            />
          </div>
          <p v-if="errors.nickname" class="text-red text-[12px] mt-2">{{ errors.nickname }}</p>
        </div>

        <div class="mb-[12px]">
          <label for="phone" class="text-[14px] font-normal mb-4">휴대폰번호</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="phone"
              @blur="validatePhone"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="text"
              placeholder="휴대폰번호를 입력해 주세요."
              required
            />
          </div>
          <p v-if="errors.phone" class="text-red text-[12px] mt-2">{{ errors.phone }}</p>
        </div>

        <button
          type="submit"
          class="bg-midGreen text-white w-full h-[52px] border-solid border-[1px] border-secondary rounded-[4px] text-[16px] mt-[24px]"
        >
          가입하기
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      nickname: '',
      phone: '',
      errors: {},
      emailVerified: false,
      passwordsMatch: false,
    };
  },
  methods: {
    // 이메일 중복 확인
    verifyEmail() {
      this.emailVerified = true;
    },
    validateEmail() {
      this.emailVerified = false; // 이메일이 변경되면 중복 확인 상태를 초기화
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.errors.email = '이메일을 입력해 주세요.';
      } else if (!emailPattern.test(this.email)) {
        this.errors.email = '유효한 이메일 주소를 입력해 주세요.';
      } else {
        delete this.errors.email;
      }
    },
    validatePassword() {
      if (!this.password) {
        this.errors.password = '비밀번호를 입력해 주세요.';
      } else if (this.password.length < 10 || this.password.length > 16) {
        this.errors.password = '비밀번호는 10~16자로 입력해 주세요.';
      } else {
        delete this.errors.password;
      }
      this.checkPasswordsMatch(); // 중복 호출 방지
    },
    validateConfirmPassword() {
      this.checkPasswordsMatch(); // 중복 호출 방지
    },
    checkPasswordsMatch() {
      if (this.confirmPassword === this.password) {
        this.passwordsMatch = true;
        delete this.errors.confirmPassword;
      } else {
        this.passwordsMatch = false;
        this.errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      }
    },
    validateName() {
      if (!this.name) {
        this.errors.name = '이름을 입력해 주세요.';
      } else if (this.name.length < 2) {
        this.errors.name = '이름은 2자 이상 입력해 주세요.';
      } else {
        delete this.errors.name;
      }
    },
    validateNickname() {
      if (!this.nickname) {
        this.errors.nickname = '닉네임을 입력해 주세요.';
      } else if (this.nickname.length < 2) {
        this.errors.nickname = '닉네임은 2자 이상 입력해 주세요.';
      } else {
        delete this.errors.nickname;
      }
    },
    validatePhone() {
      const phonePattern = /^\d{10,11}$/;
      if (!this.phone) {
        this.errors.phone = '휴대폰번호를 입력해 주세요.';
      } else if (!phonePattern.test(this.phone)) {
        this.errors.phone = '유효한 휴대폰번호를 입력해 주세요.';
      } else {
        delete this.errors.phone;
      }
    },
    validateForm() {
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();
      this.validateName();
      this.validateNickname();
      this.validatePhone();

      if (Object.keys(this.errors).length === 0) {
        alert('회원가입 성공');
      } else {
        alert('입력 정보를 다시 확인해주세요');
      }
    },
  },
};
</script>

<style></style>
