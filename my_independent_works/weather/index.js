

const cron = require('node-cron');
const puppeteer = require('puppeteer');
const axios = require('axios');


const parserYandex = async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote']
    });
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://yandex.ru/pogoda/?lat=55.61293411&lon=37.69527054')
    await page.screenshot({ path: 'img.png' })

    const arr = await page.evaluate(() => {
        const element = document.querySelector('.forecast-briefly__days')
        // const date = Array.from(element.querySelectorAll('.forecast-briefly__date'), el => el.dateTime)
        const text = Array.from(element.querySelectorAll('.temp__value_with-unit'), el => el.innerText)
        const fallout = Array.from(element.querySelectorAll('.forecast-briefly__condition'), el => el.innerText)
        const uniqid = Math.random().toString(16).slice(2)
        const selectData = () => {
            const arrDates = [];
            const todays = new Date();
            const date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
            for (let i = 0; i < 8; i++) {
                const d = i === 0 ? 0 : 1;
                date.setDate(date.getDate() + d);
                const year = date.getFullYear();
                const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
                // console.log(days + 23);
                const dateNext = `${day}.${month}.${year}`;
                arrDates.push(dateNext);
            }
            return arrDates
        }
        const data = {

            today: {
                date: selectData()[0],
                day: text[2],
                night: text[3],
                fallout: fallout[1]
            },
            next1: {
                date: selectData()[1],
                day: text[4],
                night: text[5],
                fallout: fallout[2]
            },
            next2: {
                date: selectData()[2],
                day: text[6],
                night: text[7],
                fallout: fallout[3]
            },
            next3: {
                date: selectData()[3],
                day: text[8],
                night: text[9],
                fallout: fallout[4]
            },
            next4: {
                date: selectData()[4],
                day: text[10],
                night: text[11],
                fallout: fallout[5]
            },
            next5: {
                date: selectData()[5],
                day: text[12],
                night: text[13],
                fallout: fallout[6]
            },
            next6: {
                date: selectData()[6],
                day: text[14],
                night: text[15],
                fallout: fallout[7]
            },
            id: uniqid
        }
        return data
    })

   const response = await axios({
        method: 'POST',
        url: 'http://81.90.180.43:3030/yandex?secretKey=YaUseR',
        data: JSON.stringify(arr),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
    await browser.close()
}



const parserPogodaMail = async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote']
    });
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://pogoda.mail.ru/prognoz/moskva/')
    // await page.screenshot({ path: 'img.png' })

    const arr = await page.evaluate(() => {
        const element = document.querySelector('.days__wrapper')
        // const date = Array.from(element.querySelectorAll('.day__date'), el => el.innerText)
        const text = Array.from(element.querySelectorAll('.day__temperature'), el => el.innerText)
        const night = Array.from(element.querySelectorAll('.day__temperature__night'), el => el.textContent)
        const fallout = Array.from(element.querySelectorAll('.day__description'), el => el.title)
        const uniqid = Math.random().toString(16).slice(2)
        const weatherToday = document.querySelector('.js-city_one')
        const temperatureDayToday = weatherToday.querySelector('.information__content__wrapper_left')
        const dayToday = temperatureDayToday.querySelector('.information__content__temperature').innerText
        const temperatureNightToday = weatherToday.querySelector('.information__content__wrapper_right')
        const nightToday = Array.from(temperatureNightToday.querySelectorAll('.information__content__period__temperature'), el => el.innerText)
        const falloutToday = Array.from(weatherToday.querySelectorAll('.information__content__additional__item'), el => el.innerText)
        const selectData = () => {
            const arrDates = [];
            const todays = new Date();
            const date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
            for (let i = 0; i < 8; i++) {
                const d = i === 0 ? 0 : 1;
                date.setDate(date.getDate() + d);
                const year = date.getFullYear();
                const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
                // console.log(days + 23);
                const dateNext = `${day}.${month}.${year}`;
                arrDates.push(dateNext);
            }
            console.log(dayToday, nightToday);
            return arrDates
        }

        const data = {

            today: {
                date: selectData()[0],
                day: dayToday,
                night: nightToday[1],
                fallout: falloutToday[2]
            },
            next1: {
                date: selectData()[1],
                day: text[0].split(' ')[0],
                night: night[0],
                fallout: fallout[0]
            },
            next2: {
                date: selectData()[2],
                day: text[1].split(' ')[0],
                night: night[1],
                fallout: fallout[1]
            },
            next3: {
                date: selectData()[3],
                day: text[2].split(' ')[0],
                night: night[2],
                fallout: fallout[2]
            },
            next4: {
                date: selectData()[4],
                day: text[3].split(' ')[0],
                night: night[3],
                fallout: fallout[3]
            },
            next5: {
                date: selectData()[5],
                day: text[4].split(' ')[0],
                night: night[4],
                fallout: fallout[4]
            },
            next6: {
                date: selectData()[6],
                day: text[5].split(' ')[0],
                night: night[5],
                fallout: fallout[5]
            },

            id: uniqid
        }
        return data
    })
   
    const response = await axios({
        method: 'POST',
        url: 'http://81.90.180.43:3030/pogodaMail?secretKey=YaUseR',
        data: JSON.stringify(arr),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .then(response => console.log(response.data))
        .catch(err => console.log(err))

    await browser.close()
}



// const parserGidromet = async () => {
//     const browser = await puppeteer.launch({
//         executablePath: '/usr/bin/chromium-browser',
//         args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote']
//     });
//     const page = await browser.newPage()
//     await page.setDefaultNavigationTimeout(0);
//     await page.goto('https://meteoinfo.ru/forecasts/russia/moscow-area/moscow')
//     const arr = await page.evaluate(() => {
//         const element = document.querySelector('#div_print_0')
//         const date = Array.from(element.querySelectorAll('i'), el => el.innerText)
//         // const text = Array.from(element.querySelectorAll('.temp__value_with-unit'), el => el.innerText)
//         // const fallout = Array.from(element.querySelectorAll('.forecast-briefly__condition'), el => el.innerText)
//         const uniqid = Math.random().toString(16).slice(2)
//         const selectData = () => {
//             const arrDates = [];
//             const todays = new Date();
//             const date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
//             for (let i = 0; i < 7; i++) {
//                 let d = i === 0 ? 0 : 1;
//                 date.setDate(date.getDate() + d);
//                 let year = date.getFullYear();
//                 let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
//                 let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
//                 // console.log(days + 23);
//                 let dateNext = `${day}.${month}.${year}`;
//                 arrDates.push(dateNext);
//             }
//             return arrDates
//         }
//         const data = {
//             today: {
//                 date: selectData()[0],
//                 day: date[1].split('..')[0],
//                 night: date[22].split('..')[0],
//                 fallout: date[8]
//             },
//             next1: {
//                 date: selectData()[1],
//                 day: date[2].split('..')[0],
//                 night: date[23].split('..')[0],
//                 fallout: date[9]
//             },
//             next2: {
//                 date: selectData()[2],
//                 day: date[3].split('..')[0],
//                 night: date[24].split('..')[0],
//                 fallout: date[10]
//             },
//             next3: {
//                 date: selectData()[3],
//                 day: date[4].split('..')[0],
//                 night: date[25].split('..')[0],
//                 fallout: date[11]
//             },
//             next4: {
//                 date: selectData()[4],
//                 day: date[5].split('..')[0],
//                 night: date[26].split('..')[0],
//                 fallout: date[12]
//             },
//             next5: {
//                 date: selectData()[5],
//                 day: date[6].split('..')[0],
//                 night: date[27].split('..')[0],
//                 fallout: date[13]
//             },
//             next6: {
//                 date: selectData()[6],
//                 day: date[7].split('..')[0],
//                 fallout: date[14]
//             },

//             id: uniqid
//         }

//         return data
//     })
//     // const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));
//     let response = await axios({
//         method: 'POST',
//         url: 'http://81.90.180.43:3030/gidromet?secretKey=YaUseR',
//         data: JSON.stringify(arr),
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         }
//     })
//         .then(response => console.log(response.data))
//         .catch(err => console.log(err))

//     await browser.close()
// }

const parserWorldWeather = async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote']
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://world-weather.ru/pogoda/russia/moscow/')
    const arr = await page.evaluate(() => {
        // const element = document.getElementById('content-left');
        const day = Array.from(document.getElementsByClassName('day-temperature'), el => el.innerText);
        const night = Array.from(document.getElementsByClassName('night-temperature'), el => el.innerText);
        const fallout = Array.from(document.getElementsByClassName('icon-weather'), el => el.title);
        const uniqid = Math.random().toString(16).slice(2)
        const selectData = () => {
            const arrDates = [];
            const todays = new Date();
            const date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
            for (let i = 0; i < 7; i++) {
                const d = i === 0 ? 0 : 1;
                date.setDate(date.getDate() + d);
                const year = date.getFullYear();
                const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
                // console.log(days + 23);
                const dateNext = `${day}.${month}.${year}`;
                arrDates.push(dateNext);
            }
            return arrDates
        }
        const data = {
            today: {
                date: selectData()[0],
                day: day[0] ? day[0] : '0°',
                night: night[0] ? night[0] : '0°',
                fallout: fallout[0] ? fallout[0] : "переменная облачность"
            },
            next1: {
                date: selectData()[1],
                day: day[1] ? day[1] : '0°',
                night: night[1] ? night[1] : '0°',
                fallout: fallout[1] ? fallout[1] : "переменная облачность"
            },
            next2: {
                date: selectData()[2],
                day: day[2] ? day[2] : '0°',
                night: night[2] ? night[2] : '0°',
                fallout: fallout[2] ? fallout[2] : "переменная облачность"
            },
            next3: {
                date: selectData()[3],
                day: day[3] ? day[3] : '0°',
                night: night[3] ? night[3] : '0°',
                fallout: fallout[3] ? fallout[3] : "переменная облачность"
            },
            next4: {
                date: selectData()[4],
                day: day[4] ? day[4] : '0°',
                night: night[4] ? night[4] : '0°',
                fallout: fallout[4] ? fallout[4] : "переменная облачность"
            },
            next5: {
                date: selectData()[5],
                day: day[5] ? day[5] : '0°',
                night: night[5] ? night[5] : '0°',
                fallout: fallout[5] ? fallout[5] : "переменная облачность"
            },
            next6: {
                date: selectData()[6],
                day: day[6] ? day[6] : '0°',
                night: night[6] ? night[6] : '0°',
                fallout: fallout[6] ? fallout[6] : "переменная облачность"
            },
            id: uniqid
        }

        return data
    })

    const response = await axios({
        method: 'POST',
        url: 'http://81.90.180.43:3030/worldWeather?secretKey=YaUseR',
        data: JSON.stringify(arr),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        mode: "cors"
    })
        .then(response => console.log(response.data))
        .catch(err => console.log(err))

    await browser.close()
}


const parserGisMeteo = async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote']
    });
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.gismeteo.ru/weather-moscow-4368/10-days/')
    const arr = await page.evaluate(() => {
        const element = document.querySelector('.widget-items')
        const day = Array.from(element.querySelectorAll('.unit_temperature_c'), el => el.innerText)       
        const fallout = Array.from(element.querySelectorAll('.weather-icon'), el => el.dataset.text)
        const uniqid = Math.random().toString(16).slice(2)
        const selectData = () => {
            const arrDates = [];
            const todays = new Date();
            const date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
            for (let i = 0; i < 7; i++) {
            const d = i === 0 ? 0 : 1;
                date.setDate(date.getDate() + d);
                const year = date.getFullYear();
                const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
                // console.log(days + 23);
                const dateNext = `${day}.${month}.${year}`;
                arrDates.push(dateNext);
            }
            return arrDates
        }
        const data = {
            today: {
                date: selectData()[0],
                day: day[1],
                night: day[2],
                fallout: fallout[0]
            },
            next1: {
                date: selectData()[1],
                day: day[3],
                night: day[4],
                fallout: fallout[1]
            },
            next2: {
                date: selectData()[2],
                day: day[5],
                night: day[6],
                fallout: fallout[2]
            },
            next3: {
                date: selectData()[3],
                day: day[7],
                night: day[8],
                fallout: fallout[3]
            },
            next4: {
                date: selectData()[4],
                day: day[9],
                night: day[10],
                fallout: fallout[4]
            },
            next5: {
                date: selectData()[5],
                day: day[11],
                night: day[12],
                fallout: fallout[5]
            },
            next6: {
                date: selectData()[6],
                day: day[13],
                night: day[14],
                fallout: fallout[6]
            },
            id: uniqid
        }

        return data
    })

    const response = await axios({
        method: 'POST',
        url: 'http://81.90.180.43:3030/gisMeteo?secretKey=YaUseR',
        data: JSON.stringify(arr),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        mode: "cors"
    })
        .then(response => console.log(response.data))
        .catch(err => console.log(err))

    await browser.close()

}
// parserGisMeteo(), parserWorldWeather(), parserPogodaMail(), parserYandex()

cron.schedule('0 0 3 * * *', () => {
    parserGisMeteo(), parserWorldWeather(), /* parserGidromet(), */ parserPogodaMail(), parserYandex()
});


const deleteData = async () => {
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

    const deleteData = (weatherSiteId) => axios(`http://81.90.180.43:3030/${weatherSiteId}?secretKey=YaUseR`, {
        method: 'DELETE',
        mode: "cors"
    })
        .then(response => console.log(response))
        .catch(err => console.log(err))

    const arrForDelete = (arr) => {
        const arrayIds = [];
        arr.forEach(elem => {
            if (elem[0] !==  "topyandex" && elem[0] !== "toppogodaMail" && elem[0] !== "topworldWeather" && elem[0] !== "topgismeteo") {
                const oldData = elem[1].find(item => item.today.date === selectData()[7])
                oldData ? arrayIds.push(`${elem[0]}/${oldData.id}`) : console.log(`${elem[0]} - there are no records as of the date: ${selectData()[7]}`)
            }
        }
        )
        return arrayIds;
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

    request('http://81.90.180.43:3030/DB?secretKey=YaUseR')
        .then(request => entries(request))
        .then(entries => arrForDelete(entries))
        .then(arrForDelete => arrForDelete ? arrForDelete.forEach(item => deleteData(item)) : null);
}

cron.schedule('0 0 4 * * *', () => {
    deleteData(); 
});
// deleteData();

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
                    if (item.today.date === selectData()[0] && weatherDay[0]) {
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
                            url: `http://81.90.180.43:3030/top${elem[0]}?secretKey=YaUseR`,
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

    request('http://81.90.180.43:3030/DB?secretKey=YaUseR')    
        .then(request => entries(request))
        .then(entries => rating(entries))

        // entries.forEach(elem => {
        //     if (elem[0] != 'topyandex' && elem[0] !='toppogodaMail' && elem[0] !='topworldWeather' && elem[0] !='topgismeteo') {
        //     elem[1].forEach(item => console.log(item.today.day.match(/[+-]\d+/)))
        //     }
        // }
        // )
       
}
// ratingWeather();

cron.schedule('0 0 5 * * *', () => {
     ratingWeather();
});

console.log('the parser is running')