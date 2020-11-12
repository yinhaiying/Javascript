setImmediate(() => {
    console.log("setImmediate1");
    setTimeout(() => {
        console.log("setTimeout1")
    },0)
});

setTimeout(() => {
    console.log("setTimeout2");
    setImmediate(() => {
        console.log("setImmediate2")
    })
},0)

// setImmediate1
// setTimeout2
// setImmediate2
// setTimeout1