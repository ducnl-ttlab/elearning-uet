import {Category, CategoryState} from './types';
import { GetterTree } from 'vuex';
import { RootState } from '../types';


export const getters : GetterTree<CategoryState, RootState>  = {
    getCategories(state): Category[] {
        return state.categories;
    }
}