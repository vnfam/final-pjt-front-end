<script>
export default {
  mounted() {
    const accessToken = this.$route.query.authroziation;
    console.log(document.cookie);
    const success = document.cookie.split('; ').filter((cookie) => cookie.split('=')[0] == 'success')[0];
    console.log(success);
    if (accessToken) {
      console.log('accessToken = ', accessToken);
    }
    this.$router.push('/');
  },

  methods: {
    baseDecode(data) {
      console.log(data);
    },
  },
};
</script>
