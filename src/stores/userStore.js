import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      nickName: '',
      isLogin: false,
      isAdmin: false,
      accessToken: '',
    };
  },

  actions: {
    login(nickName, accessToken) {
      console.log('로그인 요청');
      this.nickName = nickName;
      this.isLogin = true;
      this.accessToken = accessToken;
      console.log('저장 정보 : ' + this.nickName + ' ' + this.isLogin + ' ' + this.accessToken);
    },

    logout() {
      this.$reset();
    },
  },
});
