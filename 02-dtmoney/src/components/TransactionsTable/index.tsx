import { useEffect } from "react";
import { Container } from "./styles";
import { api } from "../../services/api"

export function TransactionsTable() {
  useEffect(() => {
    api.get('transactions')
      .then(response => console.log(response.data))
  }, [])


  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$ 12.00</td>
            <td>Desenvolvimento</td>
            <td>2021-04-26</td>
          </tr>
          <tr>
            <td>Gasolina</td>
            <td className="withdraw">- R$ 500,00</td>
            <td>Carro</td>
            <td>2021-04-20</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}