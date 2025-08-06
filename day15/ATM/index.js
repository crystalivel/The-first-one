const fs = require('fs');
const readline = require('readline')
const path = require('path')
const userClass = require('./UserClass')
const users =require('./users.json')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function menu(){
    rl.question(`=======ATM======= \n `, (choice) => { 
        
        
    })
}
menu()