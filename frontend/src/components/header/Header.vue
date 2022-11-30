<template>
    <header class="container">
        <div class="header header-height d-flex flex-row justify-content-center">
            <div class="header-content d-flex flex-row justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <div>Logo</div>
                    <HeaderTitle />
                </div>
                <div class="header-guest d-flex flex-row align-items-center">
                    <MenuLanguage />
                    <HeaderGuest />
                </div>
                <HeaderMobileNav />
            </div>
        </div>
        <div class="header-height"></div>
    </header>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import HeaderTitle from './HeaderTitle.vue';
import HeaderGuest from './HeaderGuest.vue';
import HeaderMobileNav from './HeaderMobileNav.vue';
import MenuLanguage from './MenuLanguage.vue';

@Options({
    components: {
        HeaderTitle,
        HeaderGuest,
        HeaderMobileNav,
        MenuLanguage,
    },
})
export default class Header extends Vue {
    get isUserLogin(): boolean {
        return false;
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100vw !important;
    margin: 0 !important;
    padding: 0 20px;
}

.header-height {
    height: 90px;
}

.header {
    width: 100%;
    position: fixed;
    background-color: $color-white-opacity-30;
    backdrop-filter: blur(32px);
    z-index: map-get($map: $zIndex, $key: menu);
}

.header-content {
    width: 100%;
    margin: 0 $margin-x-content-landing-page;
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: xs)) {
    .header-height {
        height: 46px;
    }
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: sm)) {
    .header-guest {
        display: none !important;
    }
}
</style>
