import axios from 'axios';

export const forecastModule = {
    state: () => ({
        city: '',
        error: '',
        info: null,
        coords: {
            lat: null,
            lon: null,
        }
    }),
    getters: {
        cityName(state) {
            return '"' + state.city + '"';
        },
    },
    mutations: {
        setCity(state, city) {
            state.city = city;
        },
        setError(state, error) {
            state.error = error;
        },
        setInfo(state, info) {
            state.info = info;
        },
        setCoords(state, coords) {
            state.coords = coords;
        },
    },
    actions: {
        async getForecast({ state, commit }) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${state.city}&appid=14bd6e54029abe88f60ae7d2adc09371`).then(res => { commit('setCoords', res.data.coord); axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${state.coords.lat}&lon=${state.coords.lon}&appid=14bd6e54029abe88f60ae7d2adc09371&units=metric`).then(res => { commit('setInfo', res.data.daily) }).catch(() => commit('setError', 'Problem')); }).catch(() => commit('setError', 'This city doesn`t exist'));
        },
    },
    namespaced: true,
}
