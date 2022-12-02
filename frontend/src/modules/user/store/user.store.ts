import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex/index';
import { IUserInfo } from '../constants/user.interfaces';

@Module({ dynamic: true, namespaced: true, store, name: 'landing' })
class UserModule extends VuexModule {
    userInfo: IUserInfo = {};

    @Action
    setUserInfo(userInfo: IUserInfo) {
        this.SET_USER_INFO(userInfo || {});
    }

    @Mutation
    SET_USER_INFO(userInfo: IUserInfo) {
        this.userInfo = userInfo;
    }
}
export const userModule = getModule(UserModule);
