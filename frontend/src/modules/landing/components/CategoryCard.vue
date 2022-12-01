<template>
    <div class="category-card d-flex flex-column">
        <div class="category-avg-rating d-flex flex-row align-items-center">
            <div>{{ $t('landing.categories.rating') }}</div>
            <div>
                <span>{{ category.avgRating || $t('landing.categories.notRated') }}</span>
                <img
                    v-if="category.avgRating"
                    src="@/assets/landing/icons/star.svg"
                    width="16"
                    alt=""
                />
            </div>
        </div>
        <div class="category-image">
            <img :src="category.image" alt="" />
        </div>
        <div class="category-title">
            {{ category.name }}
        </div>
        <div class="d-flex flex-row category-infos pt-2">
            <div>
                <span
                    >{{ $t('landing.categories.courseTotal') }}
                    {{ category.courseTotal || 0 }}</span
                >
                <img src="@/assets/landing/icons/course.svg" width="16" alt="" />
            </div>
            <div>
                <span
                    >{{ $t('landing.categories.studentTotal') }}
                    {{ category.studentTotal || 0 }}</span
                >
                <img src="@/assets/landing/icons/student.svg" width="16" alt="" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ICategoryData } from '../constants/landing.interfaces';

@Options({
    components: {},
})
export default class LoginPage extends Vue {
    @Prop({ default: '' }) readonly category!: ICategoryData;
}
</script>
<style lang="scss" scoped>
.category-card {
    cursor: pointer;
    border-radius: 4%;
    padding: 16px 24px 24px;
    background-color: $light-gray;
    box-shadow: rgb(0 0 0 / 35%) 0 9px 16px -8px, rgb(1 1 1 / 45%) 0 6px 12px -7px;
    transition: all 314ms cubic-bezier(0.2, 0.4, 0.38, 0.7) 0s;
    &:hover {
        box-shadow: rgb(0 0 0 / 65%) 0 15px 24px -12px, rgb(1 1 1 / 45%) 0 9px 16px -8px;
        transform: scale(0.9875);
        border-color: rgba(5, 5, 5, 0.314);
    }
}

.category-avg-rating {
    align-self: flex-end;
    font-weight: bold;
}

.category-title {
    font-size: 24px;
    line-height: 150%;
    font-weight: 600;
}

.category-infos {
    justify-content: space-between;
    font-weight: bold;
}
</style>
