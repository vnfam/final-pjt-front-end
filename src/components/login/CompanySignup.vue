<template>
  <div class="w-90 mx-auto">
    <div>
      <p class="text-2xl font-semibold text-center pb-4">업체 등록</p>

      <form @submit.prevent="validateForm" class="w-[500px] px-10 py-4 pb-20 mx-auto">
        <div class="mb-[12px]">
          <label for="companyName" class="text-[14px] font-normal mb-4">업체 이름</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="companyName"
              @blur="validateCompanyName"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="text"
              placeholder="인테리어 업체 이름을 입력해 주세요."
              required
            />
          </div>
          <p v-if="errors.companyName" class="text-red text-[12px] mt-2">{{ errors.companyName }}</p>
        </div>

        <div class="mb-[12px]">
          <label for="companyNumber" class="text-[14px] font-normal mb-4">사업자번호</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="companyNumber"
              @blur="validateCompanyNumber"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="text"
              placeholder="사업자 번호를 입력해 주세요."
              required
            />
            <button
              @click.prevent="verifyCompanyNumber"
              class="bg-midGreen text-white text-[14px] h-[52px] rounded-[4px] w-[90px] ml-2"
            >
              확인
            </button>
          </div>
          <p v-if="errors.companyNumber" class="text-red text-[12px] mt-2">{{ errors.companyNumber }}</p>
          <p v-if="companyNumberVerified" class="text-confirm text-[12px] mt-2">사업자 번호가 확인되었습니다.</p>
        </div>

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
          <label for="owner" class="text-[14px] font-normal mb-4"
            >대표자명
            <span class="text-[10px] text-[#bbb] leading-[14px]">(2자 이상)</span>
          </label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="owner"
              @blur="validateOwner"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="text"
              placeholder="대표자명을 입력해 주세요."
              required
            />
          </div>
          <p v-if="errors.owner" class="text-red text-[12px] mt-2">{{ errors.owner }}</p>
        </div>

        <div class="mb-[12px]">
          <label for="phone" class="text-[14px] font-normal mb-4">휴대폰번호</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="phoneNumber"
              @blur="validatePhone"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="text"
              placeholder="휴대폰번호를 입력해 주세요."
              required
            />
          </div>
          <p v-if="errors.phoneNumber" class="text-red text-[12px] mt-2">{{ errors.phoneNumber }}</p>
        </div>

        <div class="mb-[12px]">
          <label for="publishDate" class="text-[14px] font-normal mb-4">개업일자</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="publishDate"
              @blur="validatePublishDate"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="date"
              required
            />
          </div>
        </div>

        <button
          @click="insertCompany"
          type="submit"
          class="bg-midGreen text-white w-full h-[52px] rounded-[4px] text-[16px] mt-[24px]"
        >
          등록하기
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      companyName: '',
      companyNumber: '',
      password: '',
      confirmPassword: '',
      owner: '',
      phoneNumber: '',
      publishDate: '',

      errors: {},
      emailVerified: false,
      companyNumberVerified: false,
      passwordsMatch: false,
    };
  },
  methods: {
    // 이메일 중복 확인
    verifyEmail() {
      this.emailVerified = true;
    },
    verifyCompanyNumber() {
      this.companyNumberVerified = true;
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
    validateCompanyNumber() {
      this.companyNumberVerified = false; // 사업자번호가 변경되면 확인 상태 초기화
      const companyNumberPattern = /^[0-9-]+$/;
      if (!this.companyNumber) {
        this.errors.companyNumber = '사업자 번호를 입력해 주세요.';
      } else if (!companyNumberPattern.test(this.companyNumber)) {
        this.errors.companyNumber = '사업자 번호는 숫자와 "-"만 입력할 수 있습니다.';
      } else {
        delete this.errors.companyNumber;
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
    validateCompanyName() {
      if (!this.companyName) {
        this.errors.companyName = '인테리어 업체명을 입력해 주세요.';
      } else {
        delete this.errors.companyName;
      }
    },
    validateOwner() {
      if (!this.owner) {
        this.errors.owner = '대표자명을 입력해 주세요.';
      } else if (this.owner.length < 2) {
        this.errors.owner = '대표자명은 2자 이상 입력해 주세요.';
      } else {
        delete this.errors.owner;
      }
    },
    validatePhoneNum() {
      const phonePattern = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
      if (!this.phoneNumber) {
        this.errors.phoneNumber = '휴대폰번호를 입력해 주세요.';
      } else if (!phonePattern.test(this.phoneNumber)) {
        this.errors.phoneNumberv = '유효한 휴대폰번호를 입력해 주세요.';
      } else {
        delete this.errors.phoneNumber;
      }
    },
    // 업체 등록 요청
    async insertCompany() {
      // 유효성 검사
      this.validateForm();

      // 에러가 없는 경우에만 서버로 요청 전송
      if (Object.keys(this.errors).length === 0) {
        const companyData = {
          email: this.email,
          companyName: this.companyName,
          password: this.password,
          phoneNumber: this.phoneNumber,
          owner: this.owner,
          companyNumber: this.companyNumber,
          publishDate: this.publishDate,
        };

        // 서버로 POST 요청
        try {
          const response = await axios.post('/api/company', companyData);
          console.log(response.data);
          alert('업체 등록이 완료되었습니다.');
        } catch (error) {
          console.error(error);
          alert('업체 등록에 실패했습니다.');
        }
      } else {
        alert('입력한 정보를 확인해 주세요.');
      }
    },

    validateForm() {
      this.validateCompanyName();
      this.validateCompanyNumber();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();
      this.validateOwner();
      this.validatePhoneNum();
    },
  },
};
</script>
