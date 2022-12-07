<template>
    <div class="notification">
        <router-link class="text-decoration-none" to="#">
            <el-dropdown trigger="click">
                <div
                    class="notification-container d-flex align-items-center justify-content-center"
                    @click="handleGetNotification"
                >
                    <img src="@/assets/common/images/header/notification.svg" alt="" />
                    <span class="notification-number">{{ getUnreadNotification }}</span>
                </div>

                <template #dropdown>
                    <h4 class="mt-3 mx-auto px-3">{{ $t(`common.notification`) }}</h4>
                    <el-dropdown-menu>
                        <div class="notification-wrapper pb-4">
                            <el-dropdown-item v-for="noti in getNotification" :key="noti">
                                <div
                                    class="dropdown-item d-flex align-items-center"
                                    :style="{
                                        'background-color': !!noti.isRead
                                            ? '#ecf5ff'
                                            : 'blue',
                                    }"
                                >
                                    <img
                                        :src="noti.avatar"
                                        alt=""
                                        class="avt"
                                        width="40"
                                        height="40"
                                    />

                                    <div class="d-flex flex-column text-wrapper">
                                        <h5 class="dropdown-item-text">
                                            {{ noti.title }}
                                        </h5>
                                        <span class="dropdown-item-text">
                                            {{ noti.description }}
                                        </span>
                                        <div
                                            v-if="noti.isShowConfirmButton"
                                            class="mt-2 d-flex align-items-center justify-content-around px-5 mx-4"
                                        >
                                            <button>asdf</button>
                                            <button>asdf</button>
                                        </div>
                                    </div>
                                </div>
                            </el-dropdown-item>
                        </div>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </router-link>
    </div>
</template>

<script lang="ts">
import { userModule } from '@/modules/user/store/user.store';
import { Vue, Options } from 'vue-class-component';
import { showErrorNotificationFunction } from '@/common/helpers';
import { getNotificationList, readNotification } from '@/modules/common/services/common';
import { commonModule } from '@/modules/common/store/common.store';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { RouterLink } from 'vue-router';
import { NotificationType } from '@/modules/common/constants/common.interfaces';

@Options({})
export default class MenuNotification extends Vue {
    get getUnreadNotification() {
        return userModule.userData.unreadNotification || 0;
    }

    async handleGetNotification() {
        let response = await getNotificationList();
        await readNotification();
        if (response.success) {
            commonModule.setNotificationList(response?.data?.items || []);
            userModule.setReadNotification();
        } else {
            let res = response?.errors || [
                { message: this.$t('common.error.systemError') },
            ];
            commonModule.setInstructorList([]);
            showErrorNotificationFunction(res[0].message);
        }
    }

    get getNotification() {
        let item = commonModule.notificationList.map((item) => {
            let { type } = item;
            let isShowConfirmButton = false;

            switch (type) {
                case NotificationType.studentJoinCourseFree: {
                    isShowConfirmButton = true;
                }
            }

            return {
                ...item,
                isShowConfirmButton,
            };
        });

        return item;
    }
}
</script>

<style lang="scss" scoped>
.notification {
    margin-right: 24px;
}

.drop-down {
    border-radius: 100px;
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

.dropdown-item-text {
    line-height: 22.5px;
    color: $color-gray-02;
    word-wrap: break-word;
    overflow-wrap: break-word;
    width: 100%;
}
.dropdown-item {
    border-radius: 8px;
    padding: 10px;
}
.notification-wrapper {
    max-width: 400px;
    inline-size: 400px;
    overflow-wrap: break-word;
    .avt {
        border-radius: 50%;
    }
    .text-wrapper {
        overflow-wrap: break-word;
        width: 100%;
    }
}
</style>
