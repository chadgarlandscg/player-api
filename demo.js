const cb = () => {
    console.log("Hey, Sebas!");
    setTimeout(() => {
        console.log("Hey, Chad!");
        setTimeout(() => {
            console.log("Hey, Obed!");
        }, 1000);
    }, 2000);
}
setTimeout(cb, 3000);


promiseTimeout(3000)
    .then(() => {
        console.log("Hey, Sebas!");
        return hitApiWithPayload(payload);
    })
    .then(() => {
        console.log("Hey, Chad!");
        return promiseTimeout(1000);
    })
    .then(() => {
        console.log("Hey, Obed!");
        return promiseTimeout(1000);
    });

async function runProgram() {
    await promiseTimeout(3000);
    console.log("Hello, Sebas!");

    await promiseTimeout(2000);
    console.log("Hello, Chad!");

    await promiseTimeout(1000);
    console.log("Hello, Obed!");
}

runProgram();

function promiseTimeout(milliseconds) {
    return new Promise((success, reject) => {
        setTimeout(success, milliseconds)
    });
}