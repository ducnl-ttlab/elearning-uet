<template>
    <div class="role-container d-flex flex-column">
        <div class="role-image d-flex">
            <img :src="require(`@/assets/auth/images/${role}.png`)" alt="" />
        </div>
        <div class="role-data d-flex flex-column">
            <div class="role-title">{{ title }}</div>
            <div class="role-description">{{ description }}</div>
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
    @Prop({ default: '' }) readonly description!: string;
}
</script>

<style lang="scss">
.role-container {
    width: 50% important;
    height: 400px;
    border: 3px solid $color-violet-new-2;
    box-shadow: 0px 8px 32px rgba(106, 117, 171, 0.17);
    border-radius: 32px;
    background: $color-gray-05;
}

.role-image {
    padding: 32px 0;
    justify-content: center;
    img {
        background: $color-gray-04;
        border-radius: 50%;
    }
}

.role-data {
    align-items: center;
    padding: 0 24px;
    text-align: center;
    max-width: 500px;
}

.role-title {
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: $color-gray-01;
}

.role-description {
    color: $color-gray-02;
    font-weight: 400;
    font-size: 15px;
    line-height: 150%;
}
</style>
