<template>
    <Header />
    <div class="main-layout">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
    <MainFooter />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/header/Header.vue';

@Options({
    components: { Header },
})
export default class MainLayout extends Vue {}
</script>
<style lang="scss" scoped>
.main-layout {
    padding: 5vh 6vw;
    min-height: 100vh;
    background-color: $pale-blue;
}
</style>
