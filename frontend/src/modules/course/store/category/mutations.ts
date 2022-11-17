import { MutationTree } from 'vuex';
import { Category, CategoryState } from './types';

export const mutations: MutationTree<CategoryState> = {
  categoryLoaded(state, payload: Category[]) {
    state.error = false;
    state.categories = payload;
  },
  categoryError(state) {
    state.error = true;
    state.categories = [];
  },
};