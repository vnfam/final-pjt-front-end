<template>
    <div id="naverIdLogin"></div>
</template>
<script setup> // Composition API를 자주 사용하는 경우 유용
import { onMounted } from 'vue';

const NAVER_CLIENT_ID = 'tAF0P4jRzJskU8H5YXyd'; // 발급 받은 Client ID 입력
const NAVER_CALLBACK_URL = 'http://localhost:8080/api/members/oauth/naver'; // 작성했던 Callback URL 입력

const setGetToken = (token) => {
// 토큰 저장 로직 구현
console.log('Access Token:', token);
};

const setUserInfo = (userInfo) => {
// 사용자 정보 저장 로직 구현
console.log('User Info:', userInfo);
};

const initializeNaverLogin = () => {
const { naver } = window;
const naverLogin = new naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID,
    callbackUrl: NAVER_CALLBACK_URL,
    isPopup: false,
    loginButton: { color: 'green', type: 3, height: 58 },
    callbackHandle: true,
});
naverLogin.init();

naverLogin.getLoginStatus((status) => {
    if (status) {
    const userid = naverLogin.user.getEmail();
    const username = naverLogin.user.getName();
    console.log('User ID:', userid);
    console.log('User Name:', username);
    // 전체 사용자 정보 설정
    setUserInfo(naverLogin.user);
    }
});
};

const getToken = () => {
const token = window.location.href.split('=')[1].split('&')[0];
console.log('Token:', token);
setGetToken(token);
};

const userAccessToken = () => {
if (window.location.href.includes('access_token')) {
    getToken();
}
};

onMounted(() => {
initializeNaverLogin();
userAccessToken();
});
</script>
<style scoped>
</style>