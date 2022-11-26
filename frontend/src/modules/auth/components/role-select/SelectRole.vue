<template>
    <div class="role-container d-flex flex-column">
        <div class="role-image">
            <img :src="`@/assets/auth/images/${role}.png`" alt="" />
        </div>
        <div class="role-title">
            {{ title }}
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({
    components: {},
})
export default class SelectRole extends Vue {
    @Prop({ default: '' }) readonly title!: string;
    @Prop({ default: '' }) readonly role!: string;
}
</script>

<style lang="scss">
.role-container {
    width: 50% important;
    height: 400px;
    border: 3px solid $color-violet-new-2;
    box-shadow: 0px 8px 32px rgba(106, 117, 171, 0.17);
    border-radius: 32px;
}
</style>
