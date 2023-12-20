<template>
  <div class="wrapper">
    <h1>Weather App</h1>
    <p>Find out the weather in {{ city === '' ? 'your city' : cityName }}</p>
    <div class="inputs">
      <input v-focus type="text" :value="city" @input="event => { setCity(event.target.value); setError('') }" name="city"
        placeholder="Enter the city">
      <button v-if="city.trim().length > 0" @click="getWeather">Find out the weather</button>
      <button disabled v-else>Find out the weather</button>
      <transition name="error-message">
        <p v-if="error.length > 0" class="error">{{ error }}</p>
      </transition>
    </div>
    <div class="info">
      <transition-group name="forecast-list">
        <div v-if="info != null" v-for=" day  in  this.info ">
          <ForecastDay :icon="day.weather[0].icon" :min_temp="day.temp.min" :max_temp="day.temp.max"
            :feels_like="day.feels_like.eve" :humidity="day.humidity" :wind_speed="day.wind_speed"
            :atmospheric_pressure="day.pressure">
          </ForecastDay>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import ForecastDay from './components/ForecastDay.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  components: {
    ForecastDay
  },
  methods: {
    ...mapMutations({
      setCity: 'forecast/setCity',
      setError: 'forecast/setError',
      setInfo: 'forecast/setInfo',
      setCoords: 'forecast/setCoords',
    }),
    ...mapActions({
      getWeather: 'forecast/getWeather',
      getForecast: 'forecast/getForecast',
    }),
    getWeather() {
      if (this.city.trim().length < 2) {
        this.setError('Enter the correct name of the city');
        return false;
      }

      this.setError('');
      this.setInfo(null);

      this.getForecast();

      this.setCoords(null);
    }
  },
  computed: {
    ...mapState({
      city: state => state.forecast.city,
      error: state => state.forecast.error,
      info: state => state.forecast.info,
      coords: state => state.forecast.coords,
    }),
    ...mapGetters({
      cityName: 'forecast/cityName',
    }),
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Archivo&family=Poppins:wght@300;400;500;600&family=Montserrat:wght@400;700&family=Poppins:wght@300&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
}

body {
  width: 100%;
  min-height: 100vh;
  background: rgb(34, 193, 195);
  background: linear-gradient(339deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  width: 900px;
  min-height: 500px;
  margin: 20px;
  border-radius: 50px;
  padding: 20px;
  background: #1f0f24;
  text-align: center;
  color: white;
}

.wrapper h1 {
  margin-top: 50px;
}

.wrapper p {
  margin-top: 20px;
}

.wrapper input {
  margin-top: 30px;
  background: transparent;
  bottom: 0;
  border-bottom: 2px solid #110813;
  color: #fcfcfc;
  font-size: 14px;
  padding: 5px 8px;
}

.wrapper input:focus {
  border-bottom-color: #6e2d7d;
}

.wrapper button {
  background: #e3bc4b;
  color: #fff;
  border-radius: 10px;
  border: 2px solid #b99935;
  padding: 10px 15px;
  margin-left: 20px;
  cursor: pointer;
  transition: transform 500ms ease;
}

.wrapper button[disabled] {
  background: #746027;
}

.wrapper button:hover {
  transform: scale(1.1) translateY(-5px);
}

.error {
  color: #d03939;
}

.inputs {
  margin-bottom: 1rem;
}

.info {
  display: grid;
  grid-template-columns: repeat(auto-fill, 265px);
  gap: 10px;
  justify-content: space-around;
}

.forecast-list-item {
  display: inline-block;
  margin-right: 10px;
}

.forecast-list-enter-active,
.forecast-list-leave-active {
  transition: all 0.5s ease;
}

.forecast-list-enter-from,
.forecast-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.error-message-enter-active,
.error-message-leave-active {
  transition: all 0.25s ease;
}

.error-message-enter-from,
.error-message-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 920px) {
  * {
    font-size: 99%;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 640px;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
  }

  .wrapper button {
    margin-left: 0;
    width: 90%;
    margin: 0 auto;
  }
}

@media (max-width: 650px) {
  .wrapper {
    width: 100%;
    padding: 20px 50px;
  }

  .info {
    justify-content: center;
  }
}

@media (max-width: 560px) {
  .wrapper {
    padding: 10px 20px;
    margin: 5px;
  }
}
</style>
