<template>
    <div class="categories-wrapper w-100 d-flex justify-content-between">
        <CategoryCard
            v-for="category in categoryList"
            :key="category.id"
            :category="category"
            @click="handleCategoryClick(category.id)"
        />
        <div style="width: 348px"></div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { landingModule } from '@/modules/landing/store/landing.store';
import { getCategoryList, ICategoryItemList } from '@/modules/landing/services/landing';
import { showErrorNotificationFunction } from '@/common/helpers';
import CategoryCard from './CategoryCard.vue';
import { PageName } from '@/common/constants';
import { ICategoryData } from '../constants/landing.interfaces';
import { commonModule } from '@/common/store/common.store';

@Options({
    components: { CategoryCard },
})
export default class MainCategories extends Vue {
    get categoryList() {
        return landingModule.categoryList;
    }

    async getCategoryList() {
        commonModule.setLoadingIndicator(true);
        const response = await getCategoryList();
        if (response.success) {
            landingModule.setCategoryList(response?.data?.items || []);
        } else {
            let res = response?.errors || [
                { message: this.$t('landing.categories.errors.getCategoryListError') },
            ];
            landingModule.setCategoryList([]);
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }

    async created() {
        await this.getCategoryList();
    }

    handleCategoryClick(id: number) {
        this.$router.push({
            name: PageName.COURSE_LIST_PAGE,
            params: {
                id,
            },
        });
    }
}
</script>
<style lang="scss" scoped>
.categories-wrapper {
    flex-wrap: wrap;
    gap: 24px;
    align-content: flex-start;
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: md)) {
    .form {
        margin: 40px auto 51px !important;
    }
}
</style>
