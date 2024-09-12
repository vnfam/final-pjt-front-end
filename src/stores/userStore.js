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

      console.log('저장 정보 : ' + this.nickName + '\n ' + this.isLogin + '\n ' + this.role + '\n ' + this.accessToken);
    },

    logout() {
      this.$reset();
      localStorage.removeItem('user');
      console.log('로그아웃 완료');
    },
  },
  persist: {
    enabled: true,
    strategies: [{ key: 'user', storage: localStorage }],
  },
});
