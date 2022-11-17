
import { ActionTree } from 'vuex';
import axios from 'axios';
import { Category, CategoryState} from './types';
import { RootState } from '../types';


export const actions: ActionTree<CategoryState, RootState> = {
  fetchData({ commit }): any {
    axios({
      url: 'http://139.59.123.89:5000/category',
    }).then((response) => {
      const payload: Category[] = response && response.data;
      console.log(payload);
      
      commit('categoryLoaded', payload);
    }, (error) => {
      console.log(error);
      commit('categoryError');  
    });
  },
};