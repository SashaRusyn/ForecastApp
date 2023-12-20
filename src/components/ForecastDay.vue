<template>
    <div class="forecast_day">
        <div class="icon">
            <img :src="'https://openweathermap.org/img/wn/14bd6e54029abe88f60ae7d2adc09371' + icon + '@2x.png'" alt="">
        </div>
        <div class="info">
            <div class="min_temp">{{ showMinTemp }} <sup>o</sup>C</div>
            <div class="max_temp">{{ showMaxTemp }} <sup>o</sup>C</div>
            <div class="feels_like">{{ showFeelsLike }} <sup>o</sup>C</div>
            <div class="humidity">{{ showHumidity }} kg/m<sup>3</sup></div>
            <div class="wind_speed">{{ showWindSpeed }}</div>
            <div class="pressure">{{ showPressure }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
        },
        max_temp: {
            type: Number,
        },
        min_temp: {
            type: Number,
        },
        feels_like: {
            type: Number,
        },
        humidity: {
            type: Number,
        },
        wind_speed: {
            type: Number,
        },
        atmospheric_pressure: {
            type: Number,
        },
    },
    computed: {
        showMaxTemp() {
            return "Maximum of temperature: " + this.max_temp;
        },
        showMinTemp() {
            return "Minimum of temperature: " + this.min_temp;
        },
        showFeelsLike() {
            return "Feels like for average: " + this.feels_like;
        },
        showHumidity() {
            return "Humidity: " + this.humidity;
        },
        showWindSpeed() {
            return "Wind speed: " + this.wind_speed + " m/s";
        },
        showPressure() {
            return "Atmospheric pressure: " + this.atmospheric_pressure + " millimeters of mercury";
        }
    },
}
</script>

<style scoped>
.forecast_day {
    background: white;
    border-radius: 10px;
    color: black;
    padding: 5px 0 20px;
    display: flex;
    flex-direction: column;
}

.info {
    display: flex;
    flex-direction: column;
}
</style>