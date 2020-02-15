class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let b = 0;
    for (const obj of this.transactions) {
      b += obj.value;
    }
    return b;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

} // end of Account


class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if(this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }
} // end of Transaction


class Withdrawal extends Transaction{

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

} // end of Withdrawal


class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
} // end of Deposit




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
t1 = new Deposit(120.00, myAccount);
t1.commit();
// console.log(myAccount);

t2 = new Withdrawal(130, myAccount);
t2.commit();
console.log(myAccount);
console.log(myAccount.balance)

// t3 = new Withdrawal(50.25, myAccount);
// t3.commit();
// console.log('Transaction 3:', t3);

// console.log('Balance:', myAccount.balance);


