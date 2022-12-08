<template>
    <div class="display-options d-flex flex-row gap-3">This is CourseDetailPage</div>
</template>

<script lang="ts">
import { PageName } from '@/common/constants';
import { showErrorNotificationFunction } from '@/common/helpers';
import localStorageTokenService from '@/common/tokenService';
import { commonModule } from '@/modules/common/store/common.store';
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {},
})
export default class CourseDetail extends Vue {
    async initCourseDetail() {
        console.log('init');
    }

    async created() {
        if (!localStorageTokenService.getAccessToken()) {
            this.$router.push({ name: PageName.LOGIN_PAGE });
        } else {
            this.initCourseDetail();
        }
    }
}
</script>
<style lang="scss" scoped>
.display-options {
    padding-bottom: 20px;
}

.active-display {
    background-color: $color-violet-new-1 !important;
}
.display-button {
    padding: 10px;
    background-color: $color-white;
    border-radius: 8px;
    width: 50px;
    height: 50px;
    cursor: pointer;
}
</style>
