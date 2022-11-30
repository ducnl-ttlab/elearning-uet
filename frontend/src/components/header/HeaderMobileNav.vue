<template>
    <div class="header-nav d-flex flex-row align-items-center">
        <router-link class="text-decoration-none" to="#">
            <img
                class="nav-icon"
                src="@/assets/common/icons/header/header-button-nav.svg"
                alt=""
            />
        </router-link>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({})
export default class HeaderMobileNav extends Vue {}
</script>

<style lang="scss" scoped>
.header-nav {
    display: none !important;
}

.nav-icon {
    width: 52px;
    height: 52px;
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: sm)) {
    .header-nav {
        display: flex !important;
    }
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: xs)) {
    .nav-icon {
        width: 24px;
        height: 24px;
    }
}
</style>
