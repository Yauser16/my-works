

import useWeatherServices from '../services/weatherServices';
import './yandex.css';

const YandexWeather = (props) => {
    const { state } = props;
    const { weatherImg, weatherSites, weekDay, selectData } = useWeatherServices();
    console.log(state);

    const sortSites = arr => {
        const ratingSites = [];
        arr.forEach(item => {
            if (item[0] === "topyandex" || item[0] === "toppogodaMail" || item[0] === "topworldWeather" || item[0] === "topgismeteo") {
                let top = 0;
                const rating = {
                    site: item[0] === "topyandex" ? "yandex" : item[0] === "toppogodaMail" ? "pogodaMail" : item[0] === "topworldWeather" ? "worldWeather" : item[0] === "topgismeteo" ? "gismeteo" : null,
                    rating: top,
                    qtyDays: item[1].length
                };
                item[1].forEach(elem => {
                    top += elem.rating;
                    return rating.rating = top / item[1].length;
                });
                ratingSites.push(rating);
            }
        })
        // ratingSites.sort((a, b) => a.rating - b.rating);
        return ratingSites;
    }
    const ratingSort = arr => {
        const newArr = [];
        arr.forEach(item => {
            if (item[0] !== "topyandex" && item[0] !== "toppogodaMail" && item[0] !== "topworldWeather" && item[0] !== "topgismeteo") {
                const sites = {
                    site: item[0],
                    weather: item[1],
                    rating: sortSites(arr).find(elem => elem.site === item[0]).rating,
                    qtyDays: sortSites(arr).find(elem => elem.site === item[0]).qtyDays
                }
                newArr.push(sites);
            }
        })
        return newArr;
    }
    const styleH = (data, i) => {
        const n = data.indexOf(i) + 1;
        const color = (item) => {
            switch (item) {
                case 1:
                    return {"color": "yellow"};

                case 2:
                    return {"color": "gray"};

                case 3:
                    return {"color": "brown"};

                case 4:
                    return {"color": "blue"};

                default:
                    return {"color": "black"};

            }
        }
        return color(n);
    }

    const content = (obj) => {
        const entries = Object.entries(obj);
        console.log(entries);
        const data = ratingSort(entries).sort((a, b) => (a.rating - b.rating));
        console.log(data);
        return data.map(i => {
            return i.weather.map(item => {
                const degree = i.site === 'yandex' || i.site === 'gismeteo' ? "°" : null;
                if (item.today.date === selectData()[0]) {
                    return (
                        <div className="wrapper" key={item.id}>
                            <div className="nextDay">
                                <p className="rating"> Место в рейтинге на {selectData()[0]}</p>
                                <h2 style={styleH(data, i)}> {data.indexOf(i) + 1} </h2>
                                <p className="mistake"> Индекс ошибок </p>
                                <p className="mistake">  (дней в расчёте: {i.qtyDays}):  </p>
                                <p className="mistakeCheck">{i.rating.toFixed(2)} </p>
                            </div>
                            <div className="today">
                                <div className="details">
                                    {/* <h3>{item[0]}</h3> */}
                                    <img src={weatherSites(i.site)} alt={i.site} />
                                    {/* <p style={{"color": "red"}}>рейтинг: {i.rating.toFixed(2)}</p> */}
                                    <div>
                                        <div className="day">Сегодня</div>
                                        <div className="date">{item.today.date}</div>
                                    </div>
                                    <div>
                                        <div className="temperatureDay">День: {item.today.day}{degree}</div>
                                        <div className="temperatureNight">Ночь: {item.today.night}{degree}</div>
                                    </div>
                                    <div>

                                        <div className="fallout">{item.today.fallout}</div>
                                    </div>
                                    <img className="icon" src={weatherImg(item.today.fallout)} alt={item.today.fallout}></img>
                                </div>
                            </div>
                            <div className="nextDay">

                                <div className="nextDetails">

                                    <div>
                                        <div className="day">Завтра</div>
                                        <div className="date">{item.next1.date}</div>
                                    </div>
                                    <div>
                                        <div className="temperatureDay">День: {item.next1.day}{degree}</div>
                                        <div className="temperatureNight">Ночь: {item.next1.night}{degree}</div>
                                    </div>
                                    <div>
                                        <div className="fallout"> {item.next1.fallout}</div>
                                    </div>
                                    <img className="icon" src={weatherImg(item.next1.fallout)} alt={item.next1.fallout}></img>
                                </div>

                            </div>
                            <div className="nextDay">

                                <div className="nextDetails">

                                    <div>
                                        <div className="day">{weekDay(2)}</div>
                                        <div className="date">{item.next2.date}</div>
                                    </div>
                                    <div>
                                        <div className="temperatureDay">День: {item.next2.day}{degree}</div>
                                        <div className="temperatureNight">Ночь: {item.next2.night}{degree}</div>
                                    </div>
                                    <div>
                                        <div className="fallout">{item.next2.fallout}</div>
                                    </div>
                                    <img className="icon" src={weatherImg(item.next2.fallout)} alt={item.next2.fallout}></img>
                                </div>

                            </div>
                            <div className="nextDay">

                                <div className="nextDetails">

                                    <div>
                                        <div className="day">{weekDay(3)}</div>
                                        <div className="date">{item.next3.date}</div>
                                    </div>
                                    <div>
                                        <div className="temperatureDay">День: {item.next3.day}{degree}</div>
                                        <div className="temperatureNight">Ночь: {item.next3.night}{degree}</div>
                                    </div>
                                    <div>
                                        <div className="fallout">{item.next3.fallout}</div>
                                    </div>
                                    <img className="icon" src={weatherImg(item.next3.fallout)} alt={item.next3.fallout}></img>
                                </div>

                            </div>
                            <div className="nextDay">

                                <div className="nextDetails">

                                    <div>
                                        <div className="day">{weekDay(4)}</div>
                                        <div className="date">{item.next4.date}</div>
                                    </div>
                                    <div>
                                        <div className="temperatureDay">День: {item.next4.day}{degree}</div>
                                        <div className="temperatureNight">Ночь: {item.next4.night}{degree}</div>
                                    </div>
                                    <div>
                                        <div className="fallout">{item.next4.fallout}</div>
                                    </div>
                                    <img className="icon" src={weatherImg(item.next4.fallout)} alt={item.next4.fallout}></img>
                                </div>

                            </div>
                            <div className="nextDay">

                                <div className="nextDetails">

                                    <div>
                                        <div className="day">{weekDay(5)}</div>
                                        <div className="date">{item.next5.date}</div>
                                    </div>
                                    <div>
                                        <div className="temperatureDay">День: {item.next5.day}{degree}</div>
                                        <div className="temperatureNight">Ночь: {item.next5.night}{degree}</div>
                                    </div>
                                    <div>
                                        <div className="fallout">{item.next5.fallout}</div>
                                    </div>
                                    <img className="icon" src={weatherImg(item.next5.fallout)} alt={item.next5.fallout}></img>
                                </div>

                            </div>
                            <div className="nextDay">

                                <div className="nextDetails">

                                    <div>
                                        <div className="day">{weekDay(6)}</div>
                                        <div className="date">{item.next6.date}</div>
                                    </div>
                                    <div>
                                        <div className="temperatureDay">День: {item.next6.day}{degree}</div>
                                        <div className="temperatureNight">Ночь: {item.next6.night}{degree}</div>
                                    </div>
                                    <div>
                                        <div className="fallout">{item.next6.fallout}</div>
                                    </div>
                                    <img className="icon" src={weatherImg(item.next6.fallout)} alt={item.next6.fallout}></img>
                                </div>

                            </div>                            
                        </div>
                    )
                }
                return null;
            })
        })
    }


    if (state.yandex.length === 0) {
        return "Данных пока нет"
    }

    return content(state);

}
export default YandexWeather;
