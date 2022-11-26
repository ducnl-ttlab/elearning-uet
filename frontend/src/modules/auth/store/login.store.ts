import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex/index';

@Module({ dynamic: true, namespaced: true, store, name: 'authLogin' })
class LoginModule extends VuexModule {

    authProvider = '';
    loginCredential = '';

    @Action
    setAuthProvider(value: string) {
        this.SET_AUTH_PROVIDER(value);
    }

    @Action
    setLoginCredential(value: string) {
        this.SET_LOGIN_CREDENTIAL(value);
    }

    @Mutation
    SET_AUTH_PROVIDER(value: string) {
        this.authProvider = value;
    }

    @Mutation
    SET_LOGIN_CREDENTIAL(value: string) {
        this.loginCredential = value;
    }
}
export const loginModule = getModule(LoginModule);
