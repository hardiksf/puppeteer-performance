const getAverage = array => {
    const total = array.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0);
    return total / array.length;
};

export { getAverage };