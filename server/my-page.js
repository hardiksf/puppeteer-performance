const performanceInformationTimes = (performanceTiming, ...properties) => {
    const navigationStart = performanceTiming.navigationStart;

    const performanceInformation = {};
    properties.forEach(property => {
        performanceInformation[property] = performanceTiming[property] - navigationStart;
    });
    return performanceInformation;
};

const myPageUrl = `https://www.google.com/`;

async function myPage(page) {
    await page.goto(myPageUrl);

    const performanceTiming = JSON.parse(
        await page.evaluate(() => JSON.stringify(window.performance.timing))
    );

    return performanceInformationTimes(
        performanceTiming,
        `domContentLoadedEventEnd`,
        `domComplete`,
        `loadEventEnd`
    );
}

export default myPage;