// loops // 
function factorial(n){
    let num = 1
    for (let i = 1; i <= n; i++){
        num *= i ;
    }
       return num; 
}

console.log(factorial(16))
var num = 123456;
var degits = 0;
while (num > 0){
 num = Math.floor(num / 10);
    degits++
}
console.log(degits)


