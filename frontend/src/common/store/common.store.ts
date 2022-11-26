import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex';

@Module({
    name: 'app',
    stateFactory: true,
    dynamic: true,
    namespaced: true,
    store,
})
class CommonModule extends VuexModule {
    showLoadingIndicator = false;
    @Action
    setLoadingIndicator(showLoadingIndicator: boolean) {
        this.SET_SHOW_LOADING_INDICATOR(showLoadingIndicator);
    }


    @Mutation
    SET_SHOW_LOADING_INDICATOR(showLoadingIndicator: boolean) {
        this.showLoadingIndicator = showLoadingIndicator;
    }

}

export const commonModule = getModule(CommonModule);
