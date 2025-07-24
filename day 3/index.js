// loops // 
function factorial(n) {
    let num = 1
    for (let i = 1; i <= n; i++) {
        num *= i;
    }
    return num;
}

console.log(factorial(16))
function Digits(num) {
    var digits = 0;
    while (num > 0) {
        num = Math.floor(num / 10);
        digits++

    }
    return digits;
}
console.log(Digits(123456))

// let star = ["   *   ","  ***  "," ***** ","*******","   |   "];
// for (let i = 0; i <= star.length; i++){
//     let tree ="";
//     tree = star[i];
//     console.log(tree)

// }
// console.log(star.length)
function DrawTree(n) {
        for (let i = 0; i < n; i++){
                let star = "*" 
                let Space = " "
                console.log(Space.repeat(n-i),star.repeat(i),star,star.repeat(i))
            } 
                console.log("        |")
                console.log("        |")
                }
    // process.stdout.write('hello')



DrawTree(6)




function numberToDay(day) {
    var dayIs = "";
    switch (day) {
        case 1:
            dayIs = "monday";
            break;
        case 2:
            dayIs = "tuesday";
            break;
        case 3:
            dayIs = "wednsday";
            break;
        case 4:
            dayIs = "thursday";
            break;
        case 5:
            dayIs = "friday";
            break;
        case 6:
            dayIs = "saturday";
            break;
        case 7:
            dayIs = "sunday";
            break;

    }
    return dayIs
}
console.log(numberToDay(5))

function Max_a_b_c(a, b, c) {
    let Maxuimam = Math.max(a, b, c);
    return Maxuimam
}
console.log(Max_a_b_c(13, 23.4, 0, 345))
function myGrade(score) {
    let note = "";
    if (score > 85) {
        note = "A"
    } else if (85 >= score && score > 70) {
        note = "B"
    } else if (70 >= score && score > 55) {
        note = "C"
    } else if (55 >= score && score > 40) {
        note = "D"
    } else if (40 >= score && score > 15) {
        note = "E"
    } else if (score <= 15) {
        note = "F"
    } else {
        note = Error
    }
    return note;
}
console.log(myGrade(83))
function extendedFactorial(n, p) {
    // let nNum;
    // let pNum;
    // let C;
    // nNum = factorial(n)
    // pNum = factorial(p)
    // C = nNum / (pNum * (factorial(n-p)))
    // return C; 
    return factorial(n) / (factorial(p) * factorial(n - p))
}
console.log(extendedFactorial(5, 2))
function calc(num1, ope, num2) {
    let sum;
    switch (ope) {
        case "+":
            sum = num1 + num2;
            break;
        case "-":
            sum = num1 - num2;
            break;
        case "*":
            sum = num1 * num2;
            break;
        case "/":
            sum = num1 / num2;
            break;
        case "%":
            sum = num1 % num2
            break;
        case "c":
            sum = extendedFactorial(num1, num2);
            break;

    }
    return sum;
}
