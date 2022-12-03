import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex/index';
import { IUserData } from '../constants/auth.interfaces';

@Module({ dynamic: true, namespaced: true, store, name: 'authLogin' })
class LoginModule extends VuexModule {
    isLoggedIn = false;
    authProvider = '';
    loginCredential: IUserData = {};
    accessToken = '';

    @Action
    setLoginCredential(value: IUserData) {
        this.SET_LOGIN_CREDENTIAL(value);
    }

    @Mutation
    SET_LOGIN_CREDENTIAL(value: IUserData) {
        this.loginCredential = value;
    }

    @Action
    setAccessToken(token: string) {
        this.SET_ACCESS_TOKEN(token);
    }

    @Mutation
    SET_ACCESS_TOKEN(token: string) {
        this.accessToken = token;
    }

    @Action
    setLoginState(state: boolean) {
        this.SET_LOGIN_STATE(state);
    }

    @Mutation
    SET_LOGIN_STATE(state: boolean) {
        this.isLoggedIn = state;
    }
}
export const loginModule = getModule(LoginModule);
