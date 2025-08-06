const readline = require('readline');
const users = require('./users.json');
//not mine 
function incrementID(id) {
  const match = id.match(/^([a-zA-Z]+)(\d+)$/);
  let [, letters, numbers] = match;
  let num = parseInt(numbers, 10);
  const maxNum = Math.pow(10, numbers.length) - 1;

  if (num < maxNum) {
    num++;
  } else {
    num = 0;
    letters = generateIdLetters(letters);
  }

  const newNumStr = num.toString().padStart(numbers.length, '0');
  return letters + newNumStr;
}

//the letter part
function generateIdLetters(str) {
  const chars = str.toLowerCase().split('');
  let carry = 1;
  for (let i = chars.length - 1; i >= 0; i--) {
    if (carry === 0) break;
    let code = chars[i].charCodeAt(0) + carry;
    if (code > 'z'.charCodeAt(0)) {
      chars[i] = 'a';
      carry = 1;
    } else {
      chars[i] = String.fromCharCode(code);
      carry = 0;
    }
  }
  if (carry === 1) chars.unshift('a');
  return chars.join('');
}
function createAccount(firstName,lastName,age){
    // passworld creation 
        let rndkey = Math.floor(Math.random()*age)
    if (rndkey <= 9) {
        rndkey += '0'
    }
    const Frndkey = Math.floor(Math.random()*firstName.length)
    const Lrndkey = Math.floor(Math.random()*lastName.length)
    const pin = `${firstName.toUpperCase()[Frndkey]}${lastName.toUpperCase()[Lrndkey]}${rndkey}`
    const newUserId = incrementID(((users[users.length-1].accountID)))
    return pin
    }

