
const cron = require('node-cron');
const puppeteer = require('puppeteer');

const parserYandex = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args:["--no-sundbox"]
    });
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://yandex.ru/pogoda/?lat=55.61293411&lon=37.69527054')
    await page.screenshot({ path: 'img.png' })

    const arr = await page.evaluate(() => {
        const element = document.querySelector('.forecast-briefly__days')
        const date = Array.from(element.querySelectorAll('.forecast-briefly__date'), el => el.dateTime)
        const text = Array.from(element.querySelectorAll('.temp__value_with-unit'), el => el.innerText)
        const fallout = Array.from(element.querySelectorAll('.forecast-briefly__condition'), el => el.innerText)
        const uniqid = Math.random().toString(16).slice(2)
        const selectData = () => {
            const arrDates = [];
            const todays = new Date();
            const date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
            for (let i = 0; i < 8; i++) {
                let d = i === 0 ? 0 : 1;
                date.setDate(date.getDate() + d);
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
                // console.log(days + 23);
                let dateNext = `${day}.${month}.${year}`;
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
    let response = await fetch('http://81.90.180.43:3030/yandex?secretKey=YaUseR', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(arr)
    })
        .then(response => console.log(response.json()))
    await browser.close()
}



const parserPogodaMail = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args:["--no-sundbox"]
    });
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://pogoda.mail.ru/prognoz/moskva/')
    // await page.screenshot({ path: 'img.png' })

    const arr = await page.evaluate(() => {
        const element = document.querySelector('.days__wrapper')
        const date = Array.from(element.querySelectorAll('.day__date'), el => el.innerText)
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
            let todays = new Date();
            let date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
            for (let i = 0; i < 8; i++) {
                let d = i === 0 ? 0 : 1;
                date.setDate(date.getDate() + d);
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
                // console.log(days + 23);
                let dateNext = `${day}.${month}.${year}`;
                arrDates.push(dateNext);
            }
            return arrDates
        }
        let data = {

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
    let response = await fetch('http://81.90.180.43:3030/pogodaMail?secretKey=YaUseR', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(arr)
    })
        .then(response => console.log(response.json()))

    await browser.close()
}



const parserGidromet = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args:["--no-sundbox"]
    });
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://meteoinfo.ru/forecasts/russia/moscow-area/moscow')
    const arr = await page.evaluate(() => {
        const element = document.querySelector('#div_print_0')
        const date = Array.from(element.querySelectorAll('i'), el => el.innerText)
        // const text = Array.from(element.querySelectorAll('.temp__value_with-unit'), el => el.innerText)
        // const fallout = Array.from(element.querySelectorAll('.forecast-briefly__condition'), el => el.innerText)
        const uniqid = Math.random().toString(16).slice(2)
        const selectData = () => {
            const arrDates = [];
            const todays = new Date();
            const date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
            for (let i = 0; i < 7; i++) {
                let d = i === 0 ? 0 : 1;
                date.setDate(date.getDate() + d);
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
                // console.log(days + 23);
                let dateNext = `${day}.${month}.${year}`;
                arrDates.push(dateNext);
            }
            return arrDates
        }
        const data = {
            today: {
                date: selectData()[0],
                day: date[1].split('..')[0],
                night: date[22].split('..')[0],
                fallout: date[8]
            },
            next1: {
                date: selectData()[1],
                day: date[2].split('..')[0],
                night: date[23].split('..')[0],
                fallout: date[9]
            },
            next2: {
                date: selectData()[2],
                day: date[3].split('..')[0],
                night: date[24].split('..')[0],
                fallout: date[10]
            },
            next3: {
                date: selectData()[3],
                day: date[4].split('..')[0],
                night: date[25].split('..')[0],
                fallout: date[11]
            },
            next4: {
                date: selectData()[4],
                day: date[5].split('..')[0],
                night: date[26].split('..')[0],
                fallout: date[12]
            },
            next5: {
                date: selectData()[5],
                day: date[6].split('..')[0],
                night: date[27].split('..')[0],
                fallout: date[13]
            },
            next6: {
                date: selectData()[6],
                day: date[7].split('..')[0],
                fallout: date[14]
            },

            id: uniqid
        }

        return data
    })
    let response = await fetch('http://81.90.180.43:3030/gidromet?secretKey=YaUseR', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(arr)
    })
        .then(response => console.log(response.json()))
    console.log(arr)
    await browser.close()
}



const parserWorldWeather = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args:["--no-sundbox"]
    });
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://world-weather.ru/pogoda/russia/moscow/')
    const arr = await page.evaluate(() => {
        const element = document.querySelector('#content-left')
        const day = Array.from(element.querySelectorAll('.day-temperature'), el => el.innerText)
        const night = Array.from(element.querySelectorAll('.night-temperature'), el => el.innerText)
        const fallout = Array.from(element.querySelectorAll('.icon-weather'), el => el.title)
        const uniqid = Math.random().toString(16).slice(2)
        const selectData = () => {
            const arrDates = [];
            const todays = new Date();
            const date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
            for (let i = 0; i < 7; i++) {
                let d = i === 0 ? 0 : 1;
                date.setDate(date.getDate() + d);
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
                // console.log(days + 23);
                let dateNext = `${day}.${month}.${year}`;
                arrDates.push(dateNext);
            }
            return arrDates
        }
        const data = {
            today: {
                date: selectData()[0],
                day: day[0],
                night: night[0],
                fallout: fallout[0]
            },
            next1: {
                date: selectData()[1],
                day: day[1],
                night: night[1],
                fallout: fallout[1]
            },
            next2: {
                date: selectData()[2],
                day: day[2],
                night: night[2],
                fallout: fallout[2]
            },
            next3: {
                date: selectData()[3],
                day: day[3],
                night: night[3],
                fallout: fallout[3]
            },
            next4: {
                date: selectData()[4],
                day: day[4],
                night: night[4],
                fallout: fallout[4]
            },
            next5: {
                date: selectData()[5],
                day: day[5],
                night: night[5],
                fallout: fallout[5]
            },
            next6: {
                date: selectData()[6],
                day: day[6],
                night: night[6],
                fallout: fallout[6]
            },
            id: uniqid
        }

        return data
    })
    let response = await fetch('http://81.90.180.43:3030/worldWeather?secretKey=YaUseR', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(arr)
    })
        .then(response => console.log(response.json()))
    console.log(arr)
    await browser.close()
}


const parserGisMeteo = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args:["--no-sundbox"]
    });
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.gismeteo.ru/weather-moscow-4368/10-days/')
    const arr = await page.evaluate(() => {
        const element = document.querySelector('.widget-items')
        const day = Array.from(element.querySelectorAll('.unit_temperature_c'), el => el.innerText)
        // const night = Array.from(element.querySelectorAll('.night-temperature'), el => el.innerText)
        const fallout = Array.from(element.querySelectorAll('.weather-icon'), el => el.dataset.text)
        const uniqid = Math.random().toString(16).slice(2)
        const selectData = () => {
            const arrDates = [];
            const todays = new Date();
            const date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
            for (let i = 0; i < 7; i++) {
                let d = i === 0 ? 0 : 1;
                date.setDate(date.getDate() + d);
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
                // console.log(days + 23);
                let dateNext = `${day}.${month}.${year}`;
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
    let response = await fetch('http://81.90.180.43:3030/gisMeteo?secretKey=YaUseR', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(arr)
    })
        .then(response => console.log(response.json()))
    console.log(arr)
    await browser.close()

}
parserGisMeteo(), parserWorldWeather(), /* parserGidromet(), */ parserPogodaMail(), parserYandex()

// cron.schedule('0 0 3 * * *', () => {
// parserGisMeteo(), parserWorldWeather(), /* parserGidromet(), */ parserPogodaMail(), parserYandex()
//   });

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
    const deleteData = (weatherSiteId) => fetch(`http://localhost:3002/${weatherSiteId}?secretKey=YaUseR`, {
        method: 'DELETE',

    })

    const arrForDelete = (arr) => {
        const arrayIds = [];
        arr.forEach(elem => {
            const oldData = elem[1].find(item => item.today.date === selectData()[7])
            oldData ? arrayIds.push(`${elem[0]}/${oldData.id}`) : console.log(`${elem[0]} - there are no records as of the date: ${selectData()[7]}`)
        }
        )
        return arrayIds;
    }

    const entries = obj => Object.entries(obj);

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
// deleteData();
// cron.schedule('0 0 4 * * *', () => {
//     deleteData();
//       });

console.log('the parser is running')