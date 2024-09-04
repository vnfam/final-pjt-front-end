<script>
export default {
    mounted() {
        const accessToken = this.$route.query.authroziation;
        if (accessToken) {
            console.log("accessToken = " , accessToken);
            localStorage.setItem('accessToken', accessToken);
        }
        this.$router.push('/');
    }
}
</script>
