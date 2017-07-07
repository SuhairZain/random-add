const slow1 = (a, b) => {
    console.log('CALLED 1 with', a, b);
    return a + b + 1;
};

const slow2 = (a, b) => {
    console.log('CALLED 2 with', a, b);
    return a + b + 2;
};

const slow3 = (a, b) => {
    console.log('CALLED 3 with', a, b);
    return a + b + 3;
};

const slow4 = (a, b) => {
    console.log('CALLED 4 with', a, b);
    return a + b + 4;
};


const resultAcc = {
};
const mySlow = (...funcs) => (...params) => {
    const key = `a${params.sort().map((a) => `${a},`)}`;

    if (resultAcc[key] === undefined) {
        let result = funcs.reduce((acc, curr) => {
            return () => curr(acc(...params), ...params);
        });
        resultAcc[key] = result;
    }
    return resultAcc[key];
};


console.log(mySlow(slow1, slow2, slow3, slow4)(1, 2)());
