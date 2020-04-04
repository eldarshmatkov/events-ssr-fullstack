import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
        searchValue: '',
        searchResponse: {
            message: '',
            data: [{}],
        },
    },
    mutations: {
        changeSearchValue (state, payload) {
            state.searchValue = payload;
        },
        saveSearchResponse (state, payload) {
            state.searchResponse = payload;
        }
    }
});

export default store;
