import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex/index';
import { IInstructorData } from '../constants/common.interfaces';

@Module({ dynamic: true, namespaced: true, store, name: 'authLogin' })
class CommonModule extends VuexModule {
    instructorList: Array<IInstructorData> = [];
    showLoadingIndicator = false;
    isShowStudentListPopup = false;

    @Action
    toggleShowStudentListPopup(isShowStudentListPopup: boolean) {
        this.TOGGLE_SHOW_STUDENT_LIST_POPUP(isShowStudentListPopup);
    }

    @Mutation
    TOGGLE_SHOW_STUDENT_LIST_POPUP(isShowStudentListPopup: boolean) {
        this.isShowStudentListPopup = isShowStudentListPopup;
    }

    @Action
    setInstructorList(instructorList: Array<IInstructorData>) {
        this.SET_INSTRUCTOR_LIST(instructorList || []);
    }

    @Mutation
    SET_INSTRUCTOR_LIST(instructorList: Array<IInstructorData>) {
        this.instructorList = instructorList;
    }

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
