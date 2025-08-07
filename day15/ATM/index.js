const fs = require('fs');
const readline = require('readline');
const path = require('path');
const userClass = require('./UserClass');
const users = require('./users.json');
const { createAccount, ask } = require('./accountCreator');


async function mainmenu() {
    choice = await ask(`=============ATM=========== \n 1.Login \n 2.Create an Account`)
        switch (choice) {
            case ('1'):
                const AccountID =await ask(`input your Account ID: `)
                const pin =await ask(`input your Account pin: `)
                Login(AccountID,pin)
                break;
            case ('2'):
                createAccount()
                break;
        }

    }
async function Login(accountID, pin) {
    try {
        const data = await readFileAsync('./users.json')
        const AccDetails = JSON.parse(data)
        let index = await AccDetails.find(acc => acc.accountID === accountID)
        if (!index) {
            throw new Error(`No Account with ${accountID}`);

        } else if (index.pin === pin){
            console.log(`welcome ${index.name}`)
            actionMenu(index)
        } else {
            throw new Error (`Incorrect AccountID or Pin number`)
        }
    } catch (err){
        console.log(err)
        
    }
}
async function actionMenu(index) {
    const choice = await ask(`1.check Balance \n 2.show transaction History`)
    switch (choice){
        case ('1'):
            console.log(`Your balance is ${index.balance}`)
    }
    
}
mainmenu()