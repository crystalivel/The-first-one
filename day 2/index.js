/*The basics */
let firstname = "Yassine"
let lastname = "Maati" 
let PI = 3.14
let radius = 14
let favoritesuperhero = "JeffTheLandShark"
let favoritequote = "you have nothing to lose but your chains"
const Fullname = firstname + ' ' + lastname
const area = PI * (radius ** 2)
const perimeter = (2 * PI) * radius
const motivation = "A wise man named " + favoritesuperhero + ' : ' + favoritequote
{let a = 3;
let b = 10;
[a , b] = [b , a] 
console.log("After swapping: a = ", a, " and b = ", b); } 
/* conditional and statment */
const num = 6
if (Math.round(num/2) == num/2){
    console.log("even") }
    else {
        console.log("odd")
    }


var day = 4 
switch (day) {
    case 1 : 
        console.log("Monday");
    break;
    case 2 : 
        console.log("tuesday");
    break; 
    case 3 : 
        console.log("wednsday");
    break; 
    case 4 : 
        console.log("thursday");
    break;
    case 5 :
        console.log("friday");
    break; 
    case 6 : 
        console.log("saturday");
    break;
    case 7 : 
        console.log("sunday");
    break; 

}
{
let a = -15;
let b = 6;
let c = 2.6;

console.log(Math.max(a,b,c));
}
let score = 83 
if (score > 85){ 
    console.log("A")
} else if (85 >= score && score > 70)
  {  console.log("B")
} else if (70 >= score && score > 55){
    console.log("C")
} else if (55 >= score && score > 40){
    console.log("D")
} else if (40 >= score && score > 15){
    console.log("E")
} else if (score <= 15){
    console.log("F")
} else {
    console.log("erorr")
}



