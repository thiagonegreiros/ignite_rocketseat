import React from 'react';
import incomeImg from "../../assets/Entradas.svg"
import outcomeImg from "../../assets/Saidas.svg"
import totalImg from "../../assets/Total.svg"
import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {

    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;

  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas"/>
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Entradas</p>
          <img src={outcomeImg} alt="Saidas"/>
        </header>
        <strong>-
          {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className="hightlight-color">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total"/>
        </header>
        <strong>
         {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
} 