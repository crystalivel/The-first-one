class User {
    #pin;
    constructor(accountID, name, age, pin, balance, transactions) {
        this.accountID = accountID;
        this.name = name;
        this.age = age;
        this.pin = pin;
        this.balance = balance;
        this.transactions = transactions
    }
    addTransaction(type, amount, date = new Date().toISOString().split('T')[0]) {
        this.transactions.unshift({ type, amount, date });
    }
}
module.exports = User;