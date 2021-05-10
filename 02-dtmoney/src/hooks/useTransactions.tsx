import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

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
  createTransaction: (transaction: TransactionInput) => Promise<void>;
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

  async function createTransaction(transactioninput: TransactionInput) {
    const response = await api.post('transactions', {...transactioninput, createdAt: new Date()});
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction}}>
      { children }
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  return context;
}