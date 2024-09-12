import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터 설정 (선택 사항)
authInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authInstance.interceptors.request.use(
  (request) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user.accessToken;

    if (accessToken) {
      request.headers['Authorization'] = accessToken;
    }
    return request;
  },

  (error) => {
    console.log(error);
  }
);

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    console.log('액세스 토큰 만료 가능성 있음 ' + originalRequest);
    console.log(originalRequest);
    console.log(error);

    originalRequest._retry = true;
    try {
      console.log('재발급 요청');
      const res = await axios.post(
        'http://localhost:8080/refreshToken',
        {},
        {
          withCredentials: true, // 쿠키로 refreshToken이 전송될 경우 필요
        }
      );
      const accessToken = res.data.data;
      setAccessToken(accessToken);
      console.log('재발급 성공');
      return authInstance(originalRequest);
    } catch (refreshError) {
      console.log('에러 !');
      console.log(refreshError);
      return Promise.reject(refreshError);
    }
  }
);

function setAccessToken(accessToken) {
  const user = JSON.parse(localStorage.getItem('user'));
  user.accessToken = accessToken;

  localStorage.setItem('user', JSON.stringify(user));
}

export default authInstance;
