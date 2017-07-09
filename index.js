const slow1 = (a, b) => {
  console.log("CALLED 1");
  return a + b + 1;
};

const slow2 = (a, b, c) => {
  console.log("CALLED 2");
  return a + b + c + 2;
};

const cachedFunc = func => {
  const resultAcc = {};
  return (...params) => {
    const key = `a${params.sort().map(a => `${a}-`).join("")}`;

    if (resultAcc[key] === undefined) {
      resultAcc[key] = func(...params);
    }
    return resultAcc[key];
  };
};

const myCachedSlow1 = cachedFunc(slow1);
console.log(myCachedSlow1(1, 2));
console.log(myCachedSlow1(1, 2));
console.log(myCachedSlow1(0, 0));
console.log(myCachedSlow1(0, 0));

const myCachedSlow2 = cachedFunc(slow2);
console.log(myCachedSlow2(1, 0, 2));
console.log(myCachedSlow2(0, 1, 2));
console.log(myCachedSlow2(0, 0, 1));
console.log(myCachedSlow2(1, 0, 0));
