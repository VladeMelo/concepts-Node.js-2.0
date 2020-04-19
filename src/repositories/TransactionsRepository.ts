import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[]
  private total: number

  constructor() {
    this.transactions = [];
    this.total = 0
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {

    let income = 0, outcome = 0
    this.transactions.map(transaction => {
      (transaction.type === 'income') ? income += transaction.value : outcome += transaction.value
    })

    const total = income - outcome
    const balance:Balance = {income, outcome, total}

    return balance
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, type, value})
    this.transactions.push(transaction)
    if (type === 'income') {
      this.total+=value
    } else {
      this.total-=value
    }
    return transaction
  }

  public getTotal(): number {
    return this.total
  }
}

export default TransactionsRepository;
