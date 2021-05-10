import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';

interface Transaction{
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

//? Aqui eu estou pegando todos os dados da minha interface
//? Porém estou omitindo o id e createdAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

//?Nesse caso eu estou pegando da minha interface os campos que estou querendo
// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'category' | 'type'>;

interface TransactionProviderProps {
  children: ReactNode; //? Aceita qualquer coisa que seja React
}

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => void;
}

export const TransactionContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  function createTransaction(transaction: TransactionInput) {

    api.post('transactions', transaction);
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction}}>
      { children }
    </TransactionContext.Provider>
  );

}
