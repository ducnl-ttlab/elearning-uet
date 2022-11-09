
import { ActionTree } from 'vuex';
import axios from 'axios';
import { Category, CategoryState} from './types';
import { RootState } from '../types';


export const actions: ActionTree<CategoryState, RootState> = {
  fetchData({ commit }): any {
    axios({
      url: 'https://jsonplaceholder.typicode.com/posts',
    }).then((response) => {
      const payload: Category[] = response && response.data;
      commit('categoryLoaded', payload);
    }, (error) => {
      console.log(error);
      commit('categoryError');
    });
  },
};