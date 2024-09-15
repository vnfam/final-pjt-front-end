<template>
  <div></div>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    const code = this.$route.query.code;
    const email = this.$route.query.email;

    console.log(code);

    const request = async () => {
      const response = await axios.post('http://localhost:8080/api/verify', {
        verificationCode: code,
        email: email,
      });

      console.log(response);

      if (response.data.code == 200) {
        alert('인증이 완료되었습니다.');
        this.$router.push('/login');
      }
    };

    request();
  },
};
</script>

<style></style>
