import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      nickName: '',
      isLogin: false,
      isAdmin: false,
      role: '',
      accessToken: '',
    };
  },

  actions: {
    login(nickName, accessToken, role) {
      console.log('로그인 요청');
      this.nickName = nickName;
      this.isLogin = true;
      this.accessToken = accessToken;
      this.role = role;
      console.log('저장 정보 : ' + this.nickName + ' ' + this.isLogin + ' ' + this.accessToken);
    },

    logout() {
      this.$reset();
    },
  },

  getters: {},
});
