const fs = require('fs');
const readline = require('readline')
const ask = require('./accountCreator')
async function readBalance(accountID) {

    try {
        const data = await readFileAsync('./users.json')
        const AccDetails = JSON.parse(data)
        let index = await AccDetails.find(acc => acc.accountID === accountID)
        if (!index) {
            throw new Error(`No Account with ${accountID}`);
        }
        return (`${index.balance}`)
    }
    catch (err) {
        return console.error(`ERROR ${err}`)
    }
}
async function readTrascations(accountID) {

    try {
        const data = await readFileAsync('./users.json')
        const AccDetails = JSON.parse(data)
        let index = await AccDetails.find(acc => acc.accountID === accountID)
        if (!index) {
            throw new Error(`No Account with ${accountID}`);
        }

    }
    catch (err) {
        return console.error(`ERROR ${err}`)
    }
}
readTrascations(accountID).then(balance => {
    console.log(`your ballance is $${JSON.stringify(balance)}`);
})
async function createTransaction(accountID, jsonFilePath) {
    const choice = await ask("Enter 1 to Withdraw or 2 to Deposit: ");

    switch (choice) {
        case '1': // Withdraw
            const withdrawAmount = parseFloat(await ask("How much do you wish to withdraw? \n"));

            if (isNaN(withdrawAmount) || withdrawAmount <= 0 || withdrawAmount > account.balance) {
                throw new Error("Incorrect withdrawal amount");
            } else {
                account.balance -= withdrawAmount; 
                account.addTransaction("withdraw", withdrawAmount); 
                console.log(`Withdrawal successful. New balance: ${account.balance}`);
            }
            break;

        case '2': // Deposit
            const depositAmount = parseFloat(await ask("How much do you wish to deposit? \n"));

            if (isNaN(depositAmount) || depositAmount <= 0) {
                throw new Error("Incorrect deposit amount");
            } else {
                account.balance += depositAmount; 
                account.addTransaction("deposit", depositAmount);
                console.log(`Deposit successful. New balance: ${account.balance}`);
            }
            break;

        default:
            console.log("Invalid choice. Please enter 1 or 2.");
            return;
    }

    fs.writeFileSync(jsonFilePath, JSON.stringify(account, null, 2));
}
module.exports = createTransaction