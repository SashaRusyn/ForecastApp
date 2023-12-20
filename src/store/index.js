import { createStore } from 'vuex';
import { forecastModule } from './forecastModule.js';

export default createStore({
    modules: {
        forecast: forecastModule,
    }
})