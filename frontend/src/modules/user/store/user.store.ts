import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex/index';
import { IUserData } from '@/common/interfaces';

@Module({ dynamic: true, namespaced: true, store, name: 'landing' })
class UserModule extends VuexModule {
    userData: IUserData = {};

    @Action
    setUserData(userData: IUserData) {
        this.SET_USER_DATA(userData || {});
    }

    @Action
    setReadNotification() {
        this.SET_USER_DATA(
            {
                ...this.userData,
                unreadNotification: 0,
            } || {},
        );
    }

    @Mutation
    SET_USER_DATA(userData: IUserData) {
        this.userData = userData;
    }
}
export const userModule = getModule(UserModule);
