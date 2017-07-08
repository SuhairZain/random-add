const slow1 = (...params) => {
    console.log('CALLED 1');
    return params.reduce((a, b) => a + b) + 1;
};

const slow2 = (...params) => {
    console.log('CALLED 2');
    return params.reduce((a, b) => a + b) + 2;
};

const slow3 = (...params) => {
    console.log('CALLED 3');
    return params.reduce((a, b) => a + b) + 3;
};

const slow4 = (...params) => {
    console.log('CALLED 4');
    return params.reduce((a, b) => a + b) + 4;
};


const resultAcc = {
};
const mySlow = (...funcs) => (...params) => {
    const key = `a${params.sort().map((a) => `${a}-`).join('')}`;

    if (resultAcc[key] === undefined) {
        resultAcc[key] = funcs.reduce((acc, curr) => {
            return () => curr(acc(...params), ...params);
        })();
    }
    return resultAcc[key];
};


console.log(mySlow(slow1, slow2, slow3, slow4)(1, 2));
console.log(mySlow(slow1, slow2, slow4, slow3)(2, 1));
console.log(mySlow(slow1, slow2, slow3, slow4)(1, 2, 3));
console.log(mySlow(slow1, slow2, slow3, slow4)(3, 1, 2));
