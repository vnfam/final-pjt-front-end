<script>
import { useUserStore } from '@/stores/userStore';

export default {
  mounted() {
    const accessToken = this.$route.query.authroziation;
    console.log(accessToken);
    console.log(document.cookie);
    const success = document.cookie
      .split('; ')
      .filter((cookie) => cookie.split('=')[0] == 'success')[0]
      .split('=')[1];

    console.log(success);

    const data = this.decodeBase64(success);
    console.log(data);
    console.log(data.nickName);
    console.log(data.role);

    if (accessToken) {
      console.log('accessToken = ', accessToken);
    }
    const store = useUserStore();

    store.login(data.nickName, accessToken, data.role);

    this.$router.push('/');
  },

  //   accessToken
  // :
  // "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUB0ZXN0LmNvbSIsImlhdCI6MTcyNjgwMTgwOCwiZXhwIjoxNzI2ODAzNjA4fQ.fepfT1L-HzDjS27NW5qhkYNT_twCB0wn4ulboT8q_bA"
  // isAdmin
  // :
  // false
  // isLogin
  // :
  // true
  // nickName
  // :
  // "testNickName1"
  // role
  // :
  // "USER"

  methods: {
    decodeBase64(encodedString) {
      try {
        // Base64 디코딩
        const decodedString = atob(encodedString);
        return JSON.parse(decodedString);
      } catch (error) {
        console.error('Base64 디코딩 오류:', error);
        return null;
      }
    },

    getCookieValue(cookieString, cookieName) {
      const cookies = cookieString.split('; '); // 쿠키를 분리
      const targetCookie = cookies.find((cookie) => cookie.startsWith(cookieName + '=')); // 특정 쿠키 찾기

      if (targetCookie) {
        const encodedValue = targetCookie.split('=')[1]; // 값 부분 추출
        return JSON.parse(atob(encodedValue)); // Base64 디코딩 후 JSON으로 파싱
      }

      return null; // 쿠키가 없을 경우 null 반환
    },
  },
};
</script>
