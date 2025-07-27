// day 1 
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
    }}
// day 2 
// A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).
//Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.
function isPangram(string){
 const alphabet = Array.from({length:26}, (_,i) => String.fromCharCode(97 + i));
  const lowerCase = string.toLowerCase();
  if (string.length < 26){ 
    return false;
  }
  else return alphabet.every(letter => lowerCase.includes(letter)) ; } 