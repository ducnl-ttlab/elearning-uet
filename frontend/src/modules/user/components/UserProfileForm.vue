<template>
    <div class="user-form-wrapper">This is user profile form</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { userModule } from '@/modules/user/store/user.store';
import { getUserInfo } from '../services/user';
import { showErrorNotificationFunction } from '@/common/helpers';

@Options({
    components: {},
})
export default class UserProfileForm extends Vue {
    get userInfo() {
        return userModule.userInfo;
    }

    async getUserInfo() {
        const response = await getUserInfo();
        if (response.success) {
            userModule.setUserInfo(response?.data || {});
        } else {
            let res = response?.errors || [
                { message: this.$t('user.errors.getUserInfoError') },
            ];
            userModule.setUserInfo({});
            showErrorNotificationFunction(res[0].message);
        }
    }

    async created() {
        await this.getUserInfo();
        console.log(this.userInfo, 123);
    }
}
</script>
<style lang="scss" scoped></style>
