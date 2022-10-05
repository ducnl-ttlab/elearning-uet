<template>
    <div class="auth-layout">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {},
})
export default class AuthLayout extends Vue {}
</script>
<style lang="scss" scoped>
.auth-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>
