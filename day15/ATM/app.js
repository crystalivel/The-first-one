document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const loginScreen = document.getElementById('login-screen');
    const createAccountScreen = document.getElementById('create-account-screen');
    const mainMenuScreen = document.getElementById('main-menu-screen');

    // Buttons
    const loginBtn = document.getElementById('login-btn');
    const createAccountBtn = document.getElementById('create-account-btn');
    const submitCreateAccountBtn = document.getElementById('submit-create-account-btn');
    const backToLoginBtns = document.querySelectorAll('.back-to-login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const checkBalanceBtn = document.getElementById('check-balance-btn');
    const transactionHistoryBtn = document.getElementById('transaction-history-btn');
    const withdrawBtn = document.getElementById('withdraw-btn');
    const depositBtn = document.getElementById('deposit-btn');

    // Inputs
    const accountIdInput = document.getElementById('account-id');
    const pinInput = document.getElementById('pin');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const ageInput = document.getElementById('age');

    // Display
    const welcomeMessage = document.getElementById('welcome-message');
    const contentDisplay = document.getElementById('content-display');

    // Modal
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalInput = document.getElementById('modal-input');
    const modalSubmitBtn = document.getElementById('modal-submit-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    const modalMessage = document.getElementById('modal-message');

    let users = [];
    let currentUser = null;

    // Fetch user data
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            users = data.map(user => new User(
                user.accountID,
                user.name,
                user.age,
                user.pin,
                user.balance,
                user.transactions || []
            ));
            loginBtn.disabled = false; // Enable login button
        })
        .catch(error => {
            console.error('Error loading user data:', error);
            alert('Could not load user data. Please try refreshing the page.');
        });

    // Event Listeners
    createAccountBtn.addEventListener('click', () => {
        showScreen(createAccountScreen);
    });

    backToLoginBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showScreen(loginScreen);
        });
    });

    function showScreen(screen) {
        loginScreen.classList.add('hidden');
        createAccountScreen.classList.add('hidden');
        mainMenuScreen.classList.add('hidden');
        screen.classList.remove('hidden');
    }

    // Adapted User Class
    class User {
        constructor(accountID, name, age, pin, balance, transactions) {
            this.accountID = accountID;
            this.name = name;
            this.age = age;
            this.pin = pin;
            this.balance = balance;
            this.transactions = transactions;
        }
        addTransaction(type, amount, date = new Date().toISOString().split('T')[0]) {
            this.transactions.unshift({ type, amount, date });
        }
    }

    // Adapted Account Creator Functions
    function incrementID(accountID) {
        //This function now correctly handles the case where the input accountID might be undefined or not in the expected format.
        if (!accountID || typeof accountID !== 'string') {

            return "aaa0001";
        }
        const match = accountID.match(/^([a-zA-Z]+)(\d+)$/);
        if (!match) {

            return "aaa0001";
        }

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

    function createPin(firstName, lastName, age) {
        let rndkey = Math.floor(Math.random() * age);
        if (rndkey <= 9) {
            rndkey = '0' + rndkey;
        }
        const Frndkey = Math.floor(Math.random() * firstName.length);
        const Lrndkey = Math.floor(Math.random() * lastName.length);
        const pin = `${firstName.toUpperCase()[Frndkey]}${lastName.toUpperCase()[Lrndkey]}${rndkey}`;
        return pin;
    }

    // ATM Logic
    loginBtn.addEventListener('click', () => {
        const accountID = accountIdInput.value;
        const pin = pinInput.value;
        const user = users.find(u => u.accountID === accountID && u.pin === pin);
        if (user) {
            currentUser = user;
            welcomeMessage.textContent = `Welcome, ${currentUser.name}`;
            showScreen(mainMenuScreen);
        } else {
            alert('Invalid account ID or PIN.');
        }
    });

    submitCreateAccountBtn.addEventListener('click', () => {
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const age = parseInt(ageInput.value, 10);

        if (firstName && lastName && age) {
            const name = `${firstName} ${lastName}`;
            const lastUser = users[users.length - 1];
            const newAccountID = incrementID(lastUser ? lastUser.accountID : 'aaa0000');
            const newPin = createPin(firstName, lastName, age);
            const newUser = new User(newAccountID, name, age, newPin, 0, []);
            users.push(newUser);
            alert(`Account created!\nAccount ID: ${newAccountID}\nPIN: ${newPin}`);
            showScreen(loginScreen);
        } else {
            alert('Please fill in all fields.');
        }
    });

    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        accountIdInput.value = '';
        pinInput.value = '';
        contentDisplay.innerHTML = '';
        showScreen(loginScreen);
    });

    checkBalanceBtn.addEventListener('click', () => {
        contentDisplay.innerHTML = `<h2>Balance</h2><p>Your current balance is: $${currentUser.balance}</p>`;
    });

    transactionHistoryBtn.addEventListener('click', () => {
        let historyHtml = '<h2>Transaction History</h2>';
        if (currentUser.transactions.length > 0) {
            historyHtml += '<ul>';
            currentUser.transactions.forEach(tx => {
                historyHtml += `<li>${tx.date}: ${tx.type} - $${tx.amount}</li>`;
            });
            historyHtml += '</ul>';
        } else {
            historyHtml += '<p>No transactions found.</p>';
        }
        contentDisplay.innerHTML = historyHtml;
    });

    let currentTransactionType = null;

    function showModal(type) {
        currentTransactionType = type;
        modalTitle.textContent = type === 'deposit' ? 'Enter amount to deposit' : 'Enter amount to withdraw';
        modalInput.value = '';
        modalMessage.textContent = '';
        modal.classList.add('visible');
    }

    function hideModal() {
        modal.classList.remove('visible');
    }

    modalCancelBtn.addEventListener('click', hideModal);

    depositBtn.addEventListener('click', () => showModal('deposit'));
    withdrawBtn.addEventListener('click', () => showModal('withdraw'));

    modalSubmitBtn.addEventListener('click', () => {
        const amount = parseFloat(modalInput.value);

        if (isNaN(amount) || amount <= 0) {
            modalMessage.textContent = 'Invalid amount.';
            return;
        }

        if (currentTransactionType === 'deposit') {
            currentUser.balance += amount;
            currentUser.addTransaction('deposit', amount);
            hideModal();
            checkBalanceBtn.click();
        } else if (currentTransactionType === 'withdraw') {
            const today = new Date().toISOString().split('T')[0];
            const todaysWithdrawals = currentUser.transactions
                .filter(tx => tx.type === 'withdraw' && tx.date === today)
                .reduce((total, tx) => total + tx.amount, 0);

            if (todaysWithdrawals + amount > 5000) {
                modalMessage.textContent = `Daily withdrawal limit of $5000 exceeded.`;
                return;
            }

            if (amount > currentUser.balance) {
                modalMessage.textContent = 'Insufficient balance.';
                return;
            }

            currentUser.balance -= amount;
            currentUser.addTransaction('withdraw', amount);
            hideModal();
            checkBalanceBtn.click();
        }
    });
});
