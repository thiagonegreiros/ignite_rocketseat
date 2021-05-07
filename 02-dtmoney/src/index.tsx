import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({

  //? Criação de um banco de dados de
  models: {
    transaction: Model,
  },

  //? Montar uma lista ficticia para a tabela
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Carregando pedra',
          type: 'deposit',
          category: 'Dev',
          amount: 600,
          createdAt: new Date('2021-01-13 08:40:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Home',
          amount: 300,
          createdAt: new Date('2021-01-20 08:40:00'),
        },
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
