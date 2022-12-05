<template>
    <div class="notification">
        <router-link class="text-decoration-none" to="#">
            <div
                class="notification-container d-flex align-items-center justify-content-center"
            >
                <img src="@/assets/common/images/header/notification.svg" alt="" />
                <span class="notification-number">{{ getUnreadNotification }}</span>
            </div>
        </router-link>
    </div>
</template>

<script lang="ts">
import { userModule } from '@/modules/user/store/user.store';
import { Vue, Options } from 'vue-class-component';

@Options({})
export default class MenuNotification extends Vue {
    get getUnreadNotification() {
        return userModule.userData.unreadNotification || 0;
    }
}
</script>

<style lang="scss" scoped>
.notification {
    margin-right: 24px;
}

.notification-container {
    width: 50px;
    height: 50px;
    position: relative;
    background-color: $color-violet-03;
    border-radius: 50%;
}

.notification-number {
    position: absolute;
    top: 5px;
    right: 0;
    padding: 0 4px;
    font-weight: 600;
    font-size: 9px;
    line-height: 16px;
    color: $color-gray-05;
    background-color: $color-red-02;
    border-radius: 8px;
}
</style>
