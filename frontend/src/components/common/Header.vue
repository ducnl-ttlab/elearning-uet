<template>
    <header class="container">
        <div class="header header-height d-flex flex-row justify-content-center">
            <div class="header-content d-flex flex-row justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <Logo />
                    <HeaderTitle />
                </div>
                <div v-if="isUserLogin" class="d-flex align-items-center">
                    <MenuNotification />
                    <MenuAccount />
                </div>
                <div v-else class="header-guest d-flex flex-row align-items-center">
                    <HeaderMenuLanguage />
                    <HeaderGuest />
                </div>
                <HeaderMobileNav />
            </div>
        </div>
        <div class="header-height"></div>
    </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {},
})
export default class Header extends Vue {}
</script>
<style lang="scss" scoped></style>
