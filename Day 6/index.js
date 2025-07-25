//Usually when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct. However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it.function maskify, which changes all but the last four characters into '#'.
function maskify(cc) { 
    cc = cc.toString();
    let ccLength = cc.length 
    let cutlength = ccLength - 4 
    let hash = "#"
    
    if (ccLength < 4 ){
        return cc 
    } else {
        return hash.repeat(cutlength) + cc.slice(cutlength,ccLength )
    }

}               
const readline = require('readline');

// Create an interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});