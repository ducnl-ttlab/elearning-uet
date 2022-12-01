<template>
    <div class="categories-wrapper w-100 d-flex justify-content-between">
        <CategoryCard
            v-for="category in categoryList"
            :key="category.id"
            :category="category"
        />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { landingModule } from '@/modules/landing/store/landing.store';
import { getCategoryList } from '@/modules/landing/services/landing';
import { showErrorNotificationFunction } from '@/common/helpers';
import CategoryCard from './CategoryCard.vue';

@Options({
    components: { CategoryCard },
})
export default class LoginPage extends Vue {
    get categoryList() {
        return landingModule.categoryList;
    }

    async getCategoryList() {
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
    }

    async created() {
        await this.getCategoryList();
        console.log(this.categoryList, 123);
    }
}
</script>
<style lang="scss" scoped>
.categories-wrapper {
    flex-wrap: wrap;
    gap: 24px;
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: md)) {
    .form {
        margin: 40px auto 51px !important;
    }
}
</style>
