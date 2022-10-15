<template>
    <div class="center">
        <lottie :options="defaultOptions" :height="400" :width="400" />
        <lottie :options="loadingGif" :height="200" :width="400" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import lottieView from '../../../components/base/lottieView.vue';
import * as animationData from './assets/astronaut-in-tea-break.json';
import * as loadingGif from './assets/loading-process.json';
@Options({
    components: {
        lottie: lottieView,
    },
})
export default class LoginPage extends Vue {
    defaultOptions: Record<string, unknown> = {};
    loadingGif: Record<string, unknown> = {};

    created() {
        this.defaultOptions = { animationData };
        this.loadingGif = { animationData: loadingGif };
        console.log(this.$route.params.token);
    }

    fetchApi() {
        fetch('http://localhost:5000/auth/google/callback').then((data) => {
            console.log(data);
        });
    }
    handleAnimation() {
        console.log('ok');
    }
}
</script>
<style lang="scss" scoped>
.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: 100px;
}
</style>
