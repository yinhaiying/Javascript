
process.on("uncaughtException", function (error) {
    console.log("错误捕捉:",error)
});
function throwError(){
     throw new Error("错误")
}

throwError();
console.log(2222)

