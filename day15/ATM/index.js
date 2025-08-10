const fs = require('fs');
const readline = require('readline');
const path = require('path');
const UserClass = require('./UserClass');
const users = require('./users.json');
const { createAccount, ask } = require('./accountCreator');
const createTransaction = require ('./checkAccount')

function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(`Error reading file ${err.message}`);
            } else {
                // console.log(data)
                resolve(data);
                return data
            }
        });
    });
}
async function mainmenu() {
    choice = await ask(`=============ATM=========== \n 1.Login \n 2.Create an Account \n`)
    switch (choice) {
        case ('1'):
            const AccountID = await ask(`input your Account ID: `)
            const pin = await ask(`input your Account pin: `)
            Login(AccountID, pin)
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

        } else if (index.pin === pin) {
            console.log(`welcome ${index.name}`)
            actionMenu(index)
        } else {
            throw new Error(`Incorrect AccountID or Pin number`)
        }
    } catch (err) {
        console.log(err)

    }
}
async function actionMenu(index) {
    const choice = await ask(`1.check Balance
         2.show transaction History
         3.Withdraw Or deposite Money \n`)
    switch (choice) {
        case ('1'):
            console.log(`Your balance is ${index.balance}`)
            break
        case ('2'):
            console.log("Transaction History:");
            index.transactions.forEach(tx => {
                console.log(`Type: ${tx.type}, Amount: $${tx.amount}, Date: ${tx.date}`);
            });
            break;
        case ('3'):
            createTransaction ()
        default:
            console.log("Invalid choice.");
            mainmenu()
            break;
    }

}
mainmenu()