<template>
    <div>
        LoginPage

        <button @click="fetchApi">abc</button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {},
})
export default class LoginPage extends Vue {
    created() {
        // fetch(
        //     'http://localhost:5000/auth/google/callback?code=4/0ARtbsJofNxSuOhbyOyE2Un2-2wbucQwOulBC_vJyPhxmSOVbTpoWUbFt0G__v9e9VyYXbQ&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&authuser=0&hd=tokyotechlab.com&prompt=consent',
        // ).then((data) => {
        //     console.log(data);
        // }); // window.location.href = 'http://localhost:5000/auth/google';
        console.log(this.$route);
    }

    fetchApi() {
        fetch('http://localhost:5000/auth/google/callback').then((data) => {
            console.log(data);
        });
    }
}
</script>
<style lang="scss" scoped></style>
