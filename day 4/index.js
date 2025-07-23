let numb = [1,3,4,5,6,7]
let socks = [1, 2, 1, 2, 1, 3, 2,2]
function checkEven (num){
    let ifEven;
if (Math.round(num/2) == num/2){
    ifEven = true}  
    else {
        ifEven = false
    }
    return ifEven;
}
function numbers(){
    let numbs = ""
    let sum = 0;
    for (let i = 0; i < numb.length;i++){
        sum += numb[i]
    }
    return sum;
}
console.log(numbers())
function counteven (arr){
    let even = []
    for (let i = 0; i < arr.length;i++){
        if (checkEven(arr[i])) {
            even.push (arr[i])
        }
    }
    return even;
}
console.log(counteven(numb))
function double (num) {
    let dnumb = [];
    for (let i = 0; i < num.length;i++){
        dnumb.push(num[i]*2)
    }
    return dnumb;
    
}
console.log(double(numb))
function pairofsocks(arr) {
  const countMap = {};
  let totalPairs = 0;
  for (const num of arr) {
    countMap[num] = (countMap[num] || 0) + 1;
  }

  for (const num in countMap) {
    const count = countMap[num];
    const pairs = Math.floor(count / 2);
    if (pairs > 0) {
      totalPairs += pairs;
    }
  }
  return totalPairs;
}

console.log("the number of pairs is ",pairofsocks(socks))

function bubbleSort(arr,n) {
  for (let i = 0; i < n-1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j+1]= temp
      }
    }
  }

  return arr;
}
const Rnumb = [4,2,5,7,3,9,23,56]
console.log(bubbleSort(Rnumb,8))
function selectionsort(arr,n){
    
    for (let i = 0;i < n -1;i++){
        let min = i;
        
    
    for (let j = i+ 1; j < n ;j++)
        if (arr[j] < arr[min]){
            min = j
        }
        let curmin = arr[i]
        arr[i]=arr[min];
        arr[min]=curmin 
    }
        return arr;
}
console.log(selectionsort(Rnumb,8))
function insertionsort(arr,n){
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    

    return arr 
}
console.log(insertionsort(Rnumb,8))
function linearSearch(arr, target) {
  const hasSeen = new Set();

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (hasSeen.has(value)) {
      continue;
    }
    hasSeen.add(value);
    if (value === target) {
      return i;
    }
  }

  return "notfound";
}
console.log(linearSearch(Rnumb,8))
function binarysearch(arr,n){
     let start = 0, end = arr.length - 1;
    while (start <= end) {
        let middle = Math.floor((start + end) / 2);
        if (arr[middle] === n) 
            return "found";
        else if (arr[middle] < n)
            start = middle + 1;
        else
            end = middle - 1;
    }
    return "notfound"
}
console.log(binarysearch(bubbleSort(Rnumb),3))