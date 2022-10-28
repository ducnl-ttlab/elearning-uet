<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="form"></div>

        <SocialButtonBox />
        <div class="bottom-wrapper">
            <span
                >{{ $t('auth.register.haveAccount') }}
                <router-link to="/login">{{ $t('auth.register.login') }}</router-link>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {},
})
export default class RegisterPage extends Vue {
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
<style lang="scss" scoped>
.form {
    max-width: 454px;
    width: 90vw;
    margin: 56px auto 24px;
}
.bottom-wrapper {
    color: $color-gray-03;
    font-size: 14px;
    line-height: 21px;
    margin-bottom: 40px;
    a {
        color: $color-violet-new-1;
        text-decoration: none;
        margin: 0 10px;
        &:hover {
            color: $color-violet-new;
        }
    }
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: md)) {
    .form {
        margin: 40px auto 51px !important;
    }
}
</style>
