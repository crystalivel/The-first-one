const readline = require('readline');
const users = require('./users.json');
const userclass = require('./UserClass');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//not mine 
function incrementID(accountID) {
    const match = accountID.match(/^([a-zA-Z]+)(\d+)$/);
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
function createpin(firstName, lastName, age) {
    // passworld creation 
    let rndkey = Math.floor(Math.random() * age)
    if (rndkey <= 9) {
        rndkey += '0'
    }
    const Frndkey = Math.floor(Math.random() * firstName.length)
    const Lrndkey = Math.floor(Math.random() * lastName.length)
    const pin = `${firstName.toUpperCase()[Frndkey]}${lastName.toUpperCase()[Lrndkey]}${rndkey}`
    return pin
}
function writeToJsonFile(filePath, obj) {
    let data = [];
    if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        try {
            data = JSON.parse(fileContents);
        } catch (err) {
            console.warn('Invalid JSON in file, starting fresh.');
            data = [];
        }
    }
    data.push(obj);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}
async function createAccount() {
        const firstName = await ask('input your First Name:')
        const lastName = await ask('input your Last Name:')
        name = firstName + ' ' + lastName
        let age;
        const Inputage = await ask('input your Age:')
        if (!isNaN(Inputage) && !Number(Inputage) >= 0) {
            age = parseInt(Inputage, 10);
        } else { console.log(`${Inputage} is not a valid age`) }
        const pin = createpin(firstName, lastName, age);
        const lastId = users.length > 0 ? users[users.length - 1].accountID : "aaa0000";
        const accountID = incrementID(lastId);
        const balance = 0;
        const transactionHistory = [];
        const newUser = new userclass(accountID, name, age, pin, balance, transactionHistory)
        writeToJsonFile('./users.json', newUser)
        console.log(`your new ID is ${accountID} and your new pin is ${pin}`)

}
module.exports = {ask, createAccount }
