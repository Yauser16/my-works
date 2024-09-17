
const axios = require('axios');

const ratingWeather = async () => {

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
            // console.log(days + 23);
            let dateNext = `${day}.${month}.${year}`;
            arrDates.push(dateNext);
        }
        return arrDates
    }


    const rating = arr => {
        const uniqid = Math.random().toString(16).slice(2);
        arr.forEach(elem => {
            if (elem[0] !==  "topyandex" && elem[0] !== "toppogodaMail" && elem[0] !== "topworldWeather" && elem[0] !== "topgismeteo") {
                const weatherDay = [];
                const weatherNight = [];
                const weatherFallout = [];
                elem[1].forEach(item => {
                    if (item.next6.date === selectData()[0]) {
                        weatherDay.push(item.next6.day);
                        weatherNight.push(item.next6.night);
                        weatherFallout.push(item.next6.fallout);
                    }
                    if (item.today.date === selectData()[0]) {
                        const topDay = (item.today.day.match(/[+-]\d+/) - weatherDay[0].match(/[+-]\d+/)) < 0 ? (item.today.day.match(/[+-]\d+/) - weatherDay[0].match(/[+-]\d+/)) * -1 : (item.today.day.match(/[+-]\d+/) - weatherDay[0].match(/[+-]\d+/));
                        const topNight = (item.today.night.match(/[+-]\d+/) - weatherNight[0].match(/[+-]\d+/)) < 0 ? (item.today.night.match(/[+-]\d+/) - weatherNight[0].match(/[+-]\d+/)) * -1 : (item.today.night.match(/[+-]\d+/) - weatherNight[0].match(/[+-]\d+/));
                        const topFallout = () => {
                            let ratingIndex = 0;
                            const fallout = weatherFallout[0].split(/[, ]\s*/);

                            for (let i = 0; i < weatherFallout[0].split(/[, ]\s*/).length; i++) {
                                if (new RegExp(fallout[i]).test(item.today.fallout)) {
                                    ratingIndex += 1;
                                }
                            }
                            if (ratingIndex === 0) {
                                return 2;
                            }
                            if (ratingIndex > 0 && ratingIndex < fallout.length) {
                                return 0;
                            }
                            if (ratingIndex === fallout.length) {
                                return -2; 
                            }
                        }
                        const data = {
                            date: selectData()[0],
                            rating: topDay + topNight + topFallout(),
                            id: uniqid
                        }
                        axios({
                            method: 'POST',
                            url: `http://localhost:3001/top${elem[0]}`,
                            data: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                        })
                            .then(response => console.log(response))
                            .catch(err => console.log(err))
                    }
                })
            }
            
        })
    }

    const entries = obj => Object.entries(obj);

    const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));

    const request = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) {
                throw new Error(`Could not farch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (e) {
            console.log('error');
            throw e;
        }
    }

    request('http://localhost:3001/DB')
        .then(request => entries(request))
        .then(entries => rating(entries))

        // entries.forEach(elem => {
        //     if (elem[0] != 'topyandex' && elem[0] !='toppogodaMail' && elem[0] !='topworldWeather' && elem[0] !='topgismeteo') {
        //     elem[1].forEach(item => console.log(item.today.day.match(/[+-]\d+/)))
        //     }
        // }
        // )
       
}

ratingWeather();

// cron.schedule('0 0 4 * * *', () => {
//     deleteData();
// });

console.log('the parser is running')

// console.log("Пасмурно, небольшой  дождь".split(/[, ]\s*/).length)