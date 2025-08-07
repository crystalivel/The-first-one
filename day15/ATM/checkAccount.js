const fs = require('fs');
const readline = require('readline')
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
    readTrascations('ACC1001').then(balance => {
        console.log(JSON.stringify(balance));
    })

    