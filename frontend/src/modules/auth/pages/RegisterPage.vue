<template>
    <div
        class="d-flex flex-column justify-content-center align-items-center register-container"
    >
        <img src="@/assets/auth/images/auth-logo.png" alt="" />

        <div class="form">
            <!-- Enter email or phone number -->
            <InputCredentialForm />
        </div>

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
import InputCredentialForm from '@/modules/auth/components/register/InputCredentialForm.vue';
import SocialButtonBox from '@/modules/auth/components/layouts/common/SocialButtonBox.vue';

@Options({
    components: { SocialButtonBox, InputCredentialForm },
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
.register-container {
    margin: 24px auto;
}

.form {
    max-width: 454px;
    width: 90vw;
    margin: 10px auto;
}
.bottom-wrapper {
    color: $color-gray-03;
    font-size: 14px;
    line-height: 21px;
    margin: 20px 0;
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
