<template>
    <div class="role-container d-flex flex-column" @click="selectRole">
        <div class="role-image d-flex">
            <img :src="require(`@/assets/auth/images/${role}.png`)" alt="" />
        </div>
        <div class="role-data d-flex flex-column">
            <div class="role-title">{{ title }}</div>
            <div class="role-description">{{ description }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { PageName } from '@/common/constants';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { commonModule } from '@/common/store/common.store';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { selectRole } from '../../services/login';
import { loginModule } from '../../store/login.store';

@Options({
    components: {},
})
export default class SelectRole extends Vue {
    @Prop({ default: '' }) readonly title!: string;
    @Prop({ default: '' }) readonly role!: string;
    @Prop({ default: '' }) readonly description!: string;
    get accessToken() {
        return loginModule.accessToken;
    }

    async selectRole() {
        commonModule.setLoadingIndicator(true);
        const response = await selectRole(this.role, this.accessToken);
        if (response.data?.success) {
            showSuccessNotificationFunction(
                this.$t('auth.role.successMessage', {
                    role: this.$t(`auth.role.${this.role}`),
                }),
            );
            commonModule.setLoadingIndicator(false);
            this.$router.push({ name: PageName.LANDING_PAGE });
        } else {
            let res = response?.data?.errors || [{ message: 'SOME ERRORS' }];
            showErrorNotificationFunction(res[0].message);
        }
    }
}
</script>

<style lang="scss">
.role-container {
    height: 400px;
    border: 3px solid $color-violet-new-2;
    box-shadow: 0px 8px 32px rgba(106, 117, 171, 0.17);
    border-radius: 32px;
    background: $color-gray-05;
    cursor: pointer;

    &:hover {
        background: $color-accent-violet-03;
        transform: scale(1.03);
        transition: 1s ease-in-out;
        img {
            background: #d9d8ff;
        }
        .role-title {
            color: $color-violet-new-1;
        }
        .role-description {
            color: $color-violet-new-2;
        }
    }
}

.role-image {
    padding: 32px 0;
    justify-content: center;
    img {
        background: $color-gray-04;
        border-radius: 50%;
    }
}

.role-data {
    align-items: center;
    padding: 0 24px;
    text-align: center;
    max-width: 500px;
}

.role-title {
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: $color-gray-01;
}

.role-description {
    color: $color-gray-02;
    font-weight: 400;
    font-size: 15px;
    line-height: 150%;
}
</style>
