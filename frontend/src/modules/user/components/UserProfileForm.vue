<template>
    <div
        class="user-profile-wrapper d-flex flex-md-row flex-column justify-content-between w-100"
    >
        <div class="profile-image-wrapper">
            <div class="w-100" v-if="userData.avatar">
                <img
                    class="profile-image w-100"
                    :src="
                        !isChangingAvatar ? userData.avatar : previewImagePath(thumbnail)
                    "
                    alt=""
                />
            </div>
            <div
                v-else
                class="default-avatar profile-image d-flex align-center justify-center"
                :style="{ 'background-color': defaultAvatarColor }"
            >
                {{ defaultAvatarName }}
            </div>
            <label class="upload-button" for="file-input">
                <div class="camera-wrapper">
                    <img src="@/assets/user/icons/camera.svg" alt="" />
                </div>
            </label>
            <input
                type="file"
                class="d-none"
                id="file-input"
                @change="uploadProfilePicture($event.target.files)"
                accept="image/*"
            />
        </div>
        <div class="user-profile-form">
            <BaseInputText
                class="input"
                :label="$t('user.profile.form.username')"
                :placeholder="$t('user.profile.placeholder.username')"
                :error="credentialError"
                v-model:value="userForm.username"
                autocomplete="off"
            />
            <BaseInputText
                class="input"
                :label="$t('user.profile.form.phone')"
                :placeholder="$t('user.profile.placeholder.phone')"
                :error="credentialError"
                v-model:value="userForm.phone"
                autocomplete="off"
            />
            <BaseInputText
                class="input"
                :label="$t('user.profile.form.address')"
                :placeholder="$t('user.profile.placeholder.address')"
                :error="credentialError"
                v-model:value="userForm.address"
                autocomplete="off"
            />
            <BaseInputPassword
                class="input input-password"
                :label="$t('user.profile.form.password')"
                :placeholder="$t('user.profile.placeholder.password')"
                v-model:value="userForm.password"
            />
            <BaseInputPassword
                v-if="userForm.password"
                class="input"
                :label="$t('user.profile.form.currentPassword')"
                :placeholder="$t('user.profile.placeholder.currentPassword')"
                v-model:value="userForm.currentPassword"
            />
        </div>
    </div>
    <div class="save-button" @click="handleUpdateUser">
        {{ $t('user.profile.form.save') }}
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { getUserData, updateUserData } from '../services/user';
import { showErrorNotificationFunction } from '@/common/helpers';
import {
    generateDefaultAvatarColor,
    getFirstLetterOfName,
} from '@/common/commonFunctions';
import { IMAGE_EXTENSION_LIST } from '@/common/constants';
import { userModule } from '../store/user.store';
import { IUpdateUserData } from '../constants/user.interfaces';
import { loginModule } from '@/modules/auth/store/login.store';
import { commonModule } from '@/common/store/common.store';

@Options({
    components: {},
})
export default class UserProfileForm extends Vue {
    isChangingAvatar = false;
    userForm = {} as IUpdateUserData;
    credentialError = '';

    get userData() {
        return userModule.userData;
    }

    async getUserData() {
        const response = await getUserData();
        if (response.success) {
            this;
            userModule.setUserData(response?.data || {});
        } else {
            let res = response?.errors || [
                { message: this.$t('user.errors.getUserDataError') },
            ];
            userModule.setUserData({});
            showErrorNotificationFunction(res[0].message);
        }
    }

    get defaultAvatarColor() {
        return generateDefaultAvatarColor(this.userData?.username || '').trim();
    }

    get defaultAvatarName() {
        return getFirstLetterOfName(this.userData?.username || '').trim();
    }

    async created() {
        await this.getUserData();
        console.log(this.userData, 123);
    }

    previewImagePath(file: File) {
        if (!this.checkImageFormat(file.name)) {
            this.isChangingAvatar = false;
            showErrorNotificationFunction(this.$t('auth.error.invalidImage') as string);
        } else {
            return URL.createObjectURL(file);
        }
    }

    checkImageFormat(name: string) {
        const fileParts: Array<string> = name.split(/[.]/);
        if (!IMAGE_EXTENSION_LIST.includes(fileParts[fileParts.length - 1])) {
            return false;
        }
        return true;
    }

    async handleUpdateUser() {
        commonModule.setLoadingIndicator(true);
        const userData: IUpdateUserData = {
            username: (this.userForm.username || '').trim(),
            phone: this.userForm.phone,
            address: (this.userForm.address || '').trim(),
        };
        if (this.userForm.password !== '') {
            userData.password = this.userForm.password;
        }
        if (this.userForm.currentPassword !== '') {
            userData.currentPassword = this.userForm.currentPassword;
        }
        const response = await updateUserData(userData);
        if (response.success) {
            userModule.setUserData(userData);
        } else {
            let res = response?.errors || [
                { message: this.$t('user.errors.updateUserDataError') },
            ];
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }
}
</script>
<style lang="scss" scoped>
.user-profile-wrapper {
    gap: 5vw;
}
.profile-image-wrapper {
    padding-top: 36px;
    width: 270px !important;
    position: relative;
    justify-content: center;
    align-self: flex-start;
    .profile-image {
        width: 100% !important;
        border-radius: 50%;
        border: 2px solid #888;
        aspect-ratio: 1 / 1;
    }
    .default-avatar {
        cursor: pointer;
        font-style: normal;
        color: white;
        text-align: center;
        font-weight: 100;
        font-size: 80px;
    }
    .upload-button {
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        top: 80%;
        right: 10%;
        &:hover {
            opacity: 0.88;
        }
    }
    .camera-wrapper {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        padding: 6px;
        background-color: #aaa;
        border: 1px solid #888;
    }
}

.user-profile-form {
    width: calc(100% - 270px);
}

.save-button {
    margin: 20px auto 0;
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    border-radius: 8px;
    white-space: nowrap;
    width: 140px;
    text-align: center;
    padding: 12px 0;
    transition: all 0.44s ease 0s;
    border: 1px solid transparent;
    background-color: $color-violet-new-1;
    color: $color-white;
    cursor: pointer;
    &:hover {
        background-color: $color-violet-new-opacity-50;
    }
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: md)) {
    .profile-image-wrapper {
        padding: 0 !important;
        align-self: center;
    }
    .user-profile-form {
        width: 100% !important;
    }
}
</style>
