class User {
    #pin;
    constructor (accountID,name,age,pin,balance,transactions){
        this.accountID = accountID;
        this.name = name ;
        this.age = age;
        this.pin = pin;
        this.balance = balance;
        this.transactions = transactions
    }
}
module.exports = User;