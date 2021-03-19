let x = 5;
function fn(x){
    return function(y){
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7);  // 14
fn(8)(9);  // 18
f(10);   // 19

console.log(x)  // 5
