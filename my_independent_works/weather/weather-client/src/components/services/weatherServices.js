
import sun from '../../img/sun.png';
import rain from '../../img/rain1.png';
import party from '../../img/cloudy-sun.png';
import cloudy from '../../img/cloudly1.png';
import storm from '../../img/rain-storm.png';
import smallRainSun from '../../img/small-rain-sun.png';
import cloudyRain from '../../img/cloudy-rain.png';
import yandex from '../../img/yw.png';
import pogodaMail from '../../img/pogodaMail.png';
import gidromet from '../../img/rosGidroMet.png';
import worldWeather from '../../img/worldWeather.png';
import gismeteo from '../../img/gisMeteo.png';
import defImg from "../../img/default.jpg";
import lowSnow from '../../img/low-snow.png';
import moreSnow from '../../img/more-snow.png';
import snowAndRain from '../../img/snow-and-rain.png';
import snowAndSun from '../../img/snow-and-sun.png';

const useWeatherServices = () => {

    const weatherImg = (item) => {

        switch (item) {
            case "Дождь":
                return rain;

            case "дождь":
                return rain;

            case "Ливни":
                return rain;

            case "Ливень":
                return rain;

            case "Облачно, сильный  дождь":
                return rain;

            case "Малооблачно":
                return sun;

            case "Малооблачно, без осадков":
                return sun;

            case "Облачно с прояснениями":
                return party;

            case "Облачно, без осадков":
                return cloudy;

            case "Небольшой дождь":
                return cloudyRain;

            case "Слабый дождь":
                return cloudyRain;

            case "Ясно":
                return sun;

            case "ясно":
                return sun;

            case "облачно":
                return cloudy;

            case "Пасмурно":
                return cloudy;

            case "Облачно":
                return cloudy;

            case "облачно, небольшой дождь":
                return cloudyRain;

            case "Облачно, небольшой  дождь":
                return cloudyRain;

            case "Преимущественно облачно":
                return cloudy;

            case "Дождь с грозой":
                return storm;

            case "Сильный дождь, гроза":
                return storm;

            case "дождь, гроза":
                return storm;

            case "Пасмурно,  дождь, гроза":
                return storm;

            case "Пасмурно, без осадков":
                return cloudy;

            case "облачно, без существенных осадков":
                return cloudy;

            case "переменная облачность, небольшой дождь":
                return smallRainSun;

            case "Кратковременные осадки":
                return cloudyRain;

            case "Малооблачно, небольшой  дождь":
                return smallRainSun;

            case "Пасмурно,  дождь":
                return cloudyRain;

            case "Облачно,  дождь":
                return cloudyRain;

            case "Пасмурно, небольшой  дождь":
                return cloudyRain;

            case "Снег":
                return lowSnow;

            case "Небольшой снег":
                return lowSnow;

            case "переменная облачность, небольшой снег":
                return lowSnow;

            case "слабый ливневый снег":
                return snowAndRain;

            case "Мокрый снег":
                return snowAndRain;

            case "облачно, небольшой снег":
                return lowSnow;

            case "Облачно, небольшой  снег":
                return lowSnow;

            case "Облачно и слабый снег":
                return lowSnow;

            case "Пасмурно,  снег":
                return lowSnow;

            case "Сильный снег":
                return moreSnow;

            case "Пасмурно, сильный  снег":
                return moreSnow;

            case "Пасмурно, сильный  мокрый снег":
                return moreSnow;

            case "Облачно, небольшой  мокрый снег":
                return snowAndRain;

            case "осадки":
                return snowAndRain;

            case "Пасмурно, сильный  снег с дождём":
                return snowAndRain;

            case "Пасмурно, небольшой  снег":
                return lowSnow;

            case "слабый снег":
                return lowSnow;

            case "Облачно,  снег":
                return lowSnow;

            case "облачно, небольшие осадки":
                return snowAndRain;

            default:
                return party;
        }

    }
    const weatherSites = (item) => {

        switch (item) {
            case "yandex":
                return yandex;

            case "pogodaMail":
                return pogodaMail;

            case "gidromet":
                return gidromet;

            case "worldWeather":
                return worldWeather;

            case "gismeteo":
                return gismeteo;

            default:
                return defImg;
        }

    }

    const selectData = () => {
        const arrDates = [];
        const todays = new Date();
        const date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
        for (let i = 0; i < 8; i++) {
            let d = i === 0 ? 0 : 1;
            date.setDate(date.getDate() - d);
            let year = date.getFullYear();
            let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
            let dateNext = `${day}.${month}.${year}`;
            arrDates.push(dateNext);
        }
        return arrDates;
    }

    const weekDay = (qty) => {
        const today = new Date();
        today.setDate(today.getDate() + qty);
        const weekDayNumber = today.getDay();
        const weekDay = (item) => {

            switch (item) {
                case 1:
                    return "Понедельник";

                case 2:
                    return "Вторник";

                case 3:
                    return "Среда";

                case 4:
                    return "Четверг";

                case 5:
                    return "Пятница";

                case 6:
                    return "Суббота";

                case 0:
                    return "Воскресенье";

                default:
                    return "Ничего";
            }
        }

        return weekDay(weekDayNumber);
    }



    return { weatherImg, weatherSites, weekDay, selectData };
}
export default useWeatherServices;