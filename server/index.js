import myPage from './my-page';
import { getAverage } from './helper';

const puppeteer = require('puppeteer');

const domContentLoadedEventEndTimings = [];
const domCompleteTimings = [];
const loadEventEndTimings = [];

const getTimes = async() => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const result = await myPage(page);
        await browser.close();
        return result;
    } catch (error) {
        console.log(`catch error`, error);
    }
};


(async function() {
    for (let i = 0; i < 2; i++) {
        const times = await getTimes();
        if (times) {
            domContentLoadedEventEndTimings.push(times.domContentLoadedEventEnd);
            domCompleteTimings.push(times.domComplete);
            loadEventEndTimings.push(times.loadEventEnd);
            console.log(`Running iteration #: ${ i+ 1}`, times);
        } else {
            console.log(`Did not work work for iteration #: ${i + 1}, trying again...
            `);
            i--;
        }
    }
    const domContentLoadedEventEndTimingsAverage = getAverage(domContentLoadedEventEndTimings);
    const domCompleteTimingsAverage = getAverage(domCompleteTimings);
    const loadEventEndTimingsAverage = getAverage(loadEventEndTimings);
    console.log(`
    Average Timings in ms: 
    domContentLoadedEventEndTimingsAverage: ${domContentLoadedEventEndTimingsAverage}
    domCompleteTimingsAverage: ${domCompleteTimingsAverage}
    loadEventEndTimingsAverage: ${loadEventEndTimingsAverage}
    `);
})();