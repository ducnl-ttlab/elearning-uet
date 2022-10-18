<template>
    <div>
        <div
            class="login-form d-flex flex-column justify-content-center align-items-center"
        >
            <div class="title">{{ $t('guest.auth.login.title') }}</div>
            <div class="form">
                <!-- Enter email or phone number -->
                <InputCredentialForm v-if="!authProvider" />
                <!-- Login by phone number -->
                <!-- Enter otp -->
                <InputOtpForm v-else-if="authProvider === AuthProvider.MOBILE" />
                <!-- Login by email -->
                <!-- Enter password  -->
                <EmailLoginForm v-else-if="authProvider === AuthProvider.EMAIL" />
            </div>
            <SocialButtonBox />
            <div class="bottom-wrapper">
                <span
                    >{{ $t('guest.auth.login.notHaveAccount') }}
                    <router-link to="/register">{{
                        $t('guest.auth.login.register')
                    }}</router-link>
                </span>
            </div>
        </div>
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
