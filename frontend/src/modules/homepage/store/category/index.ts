import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { CategoryState } from './types';
import { RootState } from '../types';

export const state: CategoryState = {
  categories: [],
  error: false,
};

const namespaced = true;

export const category: Module<CategoryState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
