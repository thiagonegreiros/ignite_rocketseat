import incomeImg from "../../assets/Entradas.svg"
import outcomeImg from "../../assets/Saidas.svg"
import totalImg from "../../assets/Total.svg"

import { Container } from "./styles";

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas"/>
        </header>
        <strong>R$1000,00</strong>
      </div>
      <div>
        <header>
          <p>Entradas</p>
          <img src={outcomeImg} alt="Saidas"/>
        </header>
        <strong>- R$500,00</strong>
      </div>
      <div className="hightlight-color">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total"/>
        </header>
        <strong>R$500,00</strong>
      </div>
    </Container>
  );
} 