<template>
    <div class="landing-wrapper">
        <Categories />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Categories from '@/modules/landing/components/MainCategories.vue';

@Options({
    components: { Categories },
})
export default class LandingPage extends Vue {}
</script>
<style lang="scss" scoped></style>
